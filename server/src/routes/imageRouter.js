import express from "express";
import { getAllimage, serchImage } from "../Controller/imageController.js";
import { addImage } from "../Controller/addImage.js";
import { upload } from "../Middleware/imageUpload.js";

const imageRoute = express
  .Router()
  .post("/addImage", addImage)
  .get("/getAllimage", getAllimage)
  .post("/upload", upload.single("imageUrl"), addImage)
  .get("/serchImage",serchImage)
  

export default imageRoute;
