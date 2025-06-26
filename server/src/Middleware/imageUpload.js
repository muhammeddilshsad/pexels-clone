import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const dynamicStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    console.log(isVideo);
    
    return {
      folder: isVideo ? "videos" : "images",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo ? ["mp4", "mov", "avi", "mkv"] : ["jpg", "png", "jpeg"],
    };
  },
});

export const upload = multer({ storage: dynamicStorage });
