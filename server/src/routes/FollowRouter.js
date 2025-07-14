import express, { Router } from "express"
import {  getFollowing, getFollowingImages, getFollowingImagesByUser, getFollowStatus, getNotifications, getTopUploaders, toggleFollow } from "../Controller/followersController.js"
import { protect } from "../Middleware/auth.js"




const FollowRoute=express.Router()

FollowRoute


.post("/followr",protect,toggleFollow)
.get("/top-uploaders",protect,getTopUploaders)
.get("/status/:id",protect,getFollowStatus)
.get("/followingg",protect,getFollowing)
.get("/followingimages",protect,getFollowingImages)
.get("/notification",protect,getNotifications)










export default FollowRoute