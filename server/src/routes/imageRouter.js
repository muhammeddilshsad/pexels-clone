import express from "express"
import { getAllimage } from "../Controller/imageController.js"
import { addImage } from "../Controller/addImage.js"

const imageRoute=express.Router()
   .post("/addImage",addImage)
  .get("/getAllimage",getAllimage)





export default imageRoute