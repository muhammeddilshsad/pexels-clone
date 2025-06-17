import express from "express";
import { getAllimage, serchImage } from "../Controller/imageController.js";
import { addImage } from "../Controller/addImage.js";
import { upload } from "../Middleware/imageUpload.js";
import { addVideo, getAllVideos, searchVideos } from "../Controller/videoController.js";


const imageRoute = express
  .Router()
  .post("/addImage", addImage)
  .get("/getAllimage", getAllimage)
  .post("/upload", upload.single("imageUrl"), addImage)
  .get("/serchImage",serchImage)
  .post('/addVideo',addVideo)
  .get("/getallvideo",getAllVideos)
  .get("/serchVideo",searchVideos)
  

export default imageRoute;
