import express, { Router } from "express"
import {  getTopUploaders, toggleFollow } from "../Controller/followersController.js"
import { protect } from "../Middleware/auth.js"




const FollowRoute=express.Router()

FollowRoute


.post("/followr",protect,toggleFollow)
.get("/top-uploaders",getTopUploaders)










export default FollowRoute