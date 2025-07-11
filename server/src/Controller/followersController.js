import mongoose from "mongoose";
import Follow from "../Model/Following.js";
import Image from "../Model/Image.js";
import User from "../Model/Image.js";

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

export const toggleFollow = async (req, res, next) => {
  console.log("Toggle Follow Request Body:", req.body);

  try {
    const { targetUserId } = req.body;
    const followerId = req.user.id;

    if (followerId === targetUserId) {
      return next(new CustomError("You cannot follow yourself", 400));
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: targetUserId,
    });

    if (existingFollow) {
      await Follow.deleteOne({ follower: followerId, following: targetUserId });
      return res.status(200).json({ message: "Unfollowed successfully" });
    }

    const newFollow = new Follow({
      follower: followerId,
      following: targetUserId,
    });
    await newFollow.save();

    res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    next(err);
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
