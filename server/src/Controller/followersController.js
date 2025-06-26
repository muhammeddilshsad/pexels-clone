import Follow from "../Model/Following.js";
import Image from "../Model/Image.js";
import User from "../Model/Image.js";

export const getTopUploaders = async (req, res) => {
  try {
    const topUsers = await Image.aggregate([
      {
        $group: {
          _id: "$uploadedBy",
          uploadCount: { $sum: 1 },
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

    const existingFollow = await Follow.findOne({ follower: followerId, following: targetUserId });

    if (existingFollow) {
      await Follow.deleteOne({ follower: followerId, following: targetUserId });
      return res.status(200).json({ message: "Unfollowed successfully" });
    }

    const newFollow = new Follow({ follower: followerId, following: targetUserId });
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

export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({ follower: userId }).populate(
      "following",
      "username"
    );

    res.status(200).json(following);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting following list", error: error.message });
  }
};

export const getFollowStatus = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;
    console.log("follow check",followerId,followingId)
    const follow = await Follow.findOne({ follower: followerId, following: followingId });
    res.status(200).json({ isFollowing: !!follow });
  } catch (err) {
    next(err);
  }
};
