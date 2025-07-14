import mongoose from "mongoose";
import Follow from "../Model/Following.js";
import Image from "../Model/Image.js";
import User from "../Model/User.js";
import Notification from "../Model/Notification.js";

export const getTopUploaders = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const topUsers = await Image.aggregate([
      {
        $group: {
          _id: "$uploadedBy",
          uploadCount: { $sum: 1 },
        },
      },
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(loggedInUserId) },
        },
      },
      {
        $sort: { uploadCount: -1 },
      },
      {
        $limit: 30,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "uploadedBy",
          as: "userImages",
        },
      },
      {
        $project: {
          _id: "$userDetails._id",
          name: "$userDetails.name",
          email: "$userDetails.email",
          uploadCount: 1,
          images: {
            $map: {
              input: "$userImages",
              as: "img",
              in: "$$img.imageUrl",
            },
          },
          totalMedia: { $size: "$userImages" },
        },
      },
    ]);

    res.status(200).json(topUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching top uploaders", error });
  }
};

// export const toggleFollow = async (req, res, next) => {
//   console.log("Toggle Follow Request Body:", req.body);

//   try {
//     const { targetUserId } = req.body;
//     const followerId = req.user.id;

//     if (followerId === targetUserId) {
//       return next(new CustomError("You cannot follow yourself", 400));
//     }

//     const existingFollow = await Follow.findOne({
//       follower: followerId,
//       following: targetUserId,
//     });

//     if (existingFollow) {
//       await Follow.deleteOne({ follower: followerId, following: targetUserId });
//       return res.status(200).json({ message: "Unfollowed successfully" });
//     }

//     const newFollow = new Follow({
//       follower: followerId,
//       following: targetUserId,
//     });
//     await newFollow.save();

//     res.status(200).json({ message: "Followed successfully" });
//   } catch (err) {
//     next(err);
//   }
// };


export const toggleFollow = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const followerId = req.user.id;
    const io = req.app.get("io");

    console.log("Follower ID:", followerId, "Target User ID:", targetUserId);

    if (!mongoose.Types.ObjectId.isValid(targetUserId) || !mongoose.Types.ObjectId.isValid(followerId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (followerId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const follower = await User.findOne({ _id: followerId });
    if (!follower) {
      return res.status(404).json({ message: "Follower not found" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      console.error(`Target user not found for ID: ${targetUserId}`);
      return res.status(404).json({ message: "Target user not found" });
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: targetUserId,
    });

    if (existingFollow) {
      await Follow.deleteOne({ follower: followerId, following: targetUserId });
      const notification = new Notification({
        recipient: targetUserId,
        sender: followerId,
        type: "unfollow",
        message: `${follower.name} has unfollowed you.`,
      });
      await notification.save();
      io.to(targetUserId).emit("newNotification", {
        ...notification.toObject(),
        sender: { name: follower.name, email: follower.email },
      });
      return res.status(200).json({ message: "Unfollowed successfully" });
    }

    const newFollow = new Follow({
      follower: followerId,
      following: targetUserId,
    });
    await newFollow.save();
    const notification = new Notification({
      recipient: targetUserId,
      sender: followerId,
      type: "follow",
      message: `${follower.name} has followed you.`,
    });
    await notification.save();
    io.to(targetUserId).emit("newNotification", {
      ...notification.toObject(),
      sender: { name: follower.name, email: follower.email },
    });
    res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    console.error("Error in toggleFollow:", err);
    res.status(500).json({ message: "Error toggling follow", error: err.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({ following: userId }).populate(
      "follower",
      "username"
    );

    res.status(200).json(followers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting followers", error: error.message });
  }
};
export const getFollowingImages = async (req, res) => {
  try {
    const userId = req.body.follower;

    const following = await Follow.find({ follower: userId }).select(
      "following"
    );

    const followingIds = following.map((f) => f.following);

    const images = await Image.find({ uploadedBy: { $in: followingIds } });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch images from followed users",
      error: error.message,
    });
  }
};

export const getFollowingImagesByUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const targetUserId = req.params.userId;

    const isFollowing = await Follow.findOne({
      follower: loggedInUserId,
      following: targetUserId,
    });

    if (!isFollowing) {
      return res
        .status(403)
        .json({ message: "You are not following this user." });
    }

    const images = await Image.find({ uploadedBy: targetUserId }).sort({
      createdAt: -1,
    });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch following user's images",
      error: error.message,
    });
  }
};



 export const getFollowing = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log();

    const followingData = await Follow.find({ follower: userId }).populate(
      "following",
      "name email"
    );

    const followingUsers = followingData.map((follow) => follow.following);
    console.log(followingUsers);

    res.status(200).json(followingUsers);
  } catch (error) {
    res.status(500).json({
      message: "Error getting following list",
      error: error.message,
    });
  }
};


export const getFollowStatus = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;
    console.log("follow check", followerId, followingId);
    const follow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });
    res.status(200).json({ isFollowing: !!follow });
  } catch (err) {
    next(err);
  }
};


export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "name email")
      .sort({ createdAt: -1 })
      .limit(20); 

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};


