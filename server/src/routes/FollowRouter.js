import express, { Router } from "express"
import {  getFollowing, getFollowingImages, getFollowingImagesByUser, getFollowStatus, getTopUploaders, toggleFollow } from "../Controller/followersController.js"
import { protect } from "../Middleware/auth.js"




const FollowRoute=express.Router()

FollowRoute


.post("/followr",protect,toggleFollow)
.get("/top-uploaders",protect,getTopUploaders)
.get("/status/:id",protect,getFollowStatus)
.get("/followingg",protect,getFollowing)
.get("/followingimages",protect,getFollowingImages)










export default FollowRoute