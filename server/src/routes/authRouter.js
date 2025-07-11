import express from "express"
import { login, register } from "../Controller/userController.js"
import { protect } from "../Middleware/auth.js"
import { getUploadsByUser, getUserDetailsById, getUserUploads, updateProfile } from "../Controller/ProfileController.js"
import { upload } from "../Middleware/imageUpload.js"
import { sendEmailFromUser } from "../Controller/mailController.js"




const authRouter=express.Router()


 .post("/register",register)
 .post("/login",login)
 .put("/profile",protect,upload.single("profileImage"),updateProfile)
 .post("/mail",protect,sendEmailFromUser)
 .get("/getuseruplaod",protect,getUserUploads)
 .get("/getUserDetailsBy/:id",protect,getUserDetailsById)
 .get("/getUploadByuser/:id",protect,getUploadsByUser)




export default authRouter