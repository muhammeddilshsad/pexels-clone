import express from "express";
import { getAllimage, serchImage } from "../Controller/imageController.js";
import { addImage } from "../Controller/addImage.js";
import { upload } from "../Middleware/imageUpload.js";
import {
  addVideo,
  getAllVideos,
  searchVideos,
} from "../Controller/videoController.js";
import { protect } from "../Middleware/auth.js";

const imageRoute = express
  .Router()
  .post("/addImage", addImage)
  .get("/getAllimage", getAllimage)
  .post("/upload",protect, upload.single("imageUrl"), addImage)
  .get("/serchImage", serchImage)

  // videoRoute

  .get("/getallvideo", getAllVideos)
  .get("/serchVideo", searchVideos)
  .post("/addVideo", protect, upload.single("url"), addVideo);

export default imageRoute;
