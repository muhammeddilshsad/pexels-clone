import bcrypt from "bcryptjs";
import User from "../Model/User.js";
import Image from "../Model/Image.js";
import Video from "../Model/Videos.js";
import { upload } from "../Middleware/imageUpload.js";


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, email } = req.body;
    
    const updatedFields = {
      name: firstName,
      email,
    };
    console.log(updatedFields)

    if (req.file) {
      updatedFields.profilePhoto = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );
    console.log(updatedUser)

    res.status(200).json({
      profilePhoto: updatedUser.profilePhoto,
      message: "Profile updated successfully",
      user: updatedUser,
    });
    
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
};




export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    user.password = newPassword
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Failed to change password", error });
  }
};



export const getUserUploads = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId)
  
      const [images, videos] = await Promise.all([
        Image.find({ uploadedBy:userId }).sort({ createdAt: -1 }),
        Video.find({ uploadedBy:userId }).sort({ createdAt: -1 }),
      ]);
  
      res.status(200).json({
        images,
        videos,
      });
    } catch (error) {
      console.error("Error fetching uploads:", error);
      res.status(500).json({ message: "Failed to fetch uploads", error });
    }

  };



export const getUserDetailsById = async (req, res) => {
  try {
    const userId = req.params.id;


    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getUploadsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const uploads = await upload.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(uploads);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
};






