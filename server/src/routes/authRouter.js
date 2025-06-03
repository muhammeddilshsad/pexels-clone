import express from "express"
import { login, register } from "../Controller/userController.js"




const authRouter=express.Router()

 .post("/register",register)
 .post("/login",login)






export default authRouter