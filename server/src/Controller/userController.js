import User from "../Model/User.js"
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
import {OAuth2Client} from "google-auth-library"


const client=new OAuth2Client(process.env.CLIENT_ID)

export const  register=async(req,res)=>{
    
const {name,email,password}=req.body;
console.log(req.body)
    const user=await User.create({
        name,
        email,
        password,
        role: 'user'
    });
    await user.save();
    res.status(200).json(user)
}

export const login=async (req,res)=>{

    const {email,password}=req.body
    const user= await User.findOne({email:email})
    console.log(user)
    
    if(user && (await user.matchPassword(password))){
        const token=generateToken(user)
       
    res.json({
        message: "login success",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isBlocked: user.isBlocked,
          profilePhoto: user.profilePhoto,
          googleId: user.googleId || null
        }
      });
        
    }else{
        res.status(401).json({message:"invalid password"})
    }

};



export const googleauth=async(req,res)=>{
    const {credential}=req.body
    const ticket=await client.verifyIdToken({
        idToken:credential,
        audience:process.env.CLIENT_ID})

    const payload=ticket.getPayload()
    const {sub:googleId,email,name, picture}=payload;

    let user=await User.findOne({email})


    if(!user){
        user=await User.create({
            name,
            email,
            googleId,
            role:"user",
            isBlocked:false,
            profilePhoto:picture,
        })
    }

    const token=generateToken(user)
   
    res.json({
        message: "googlelogin success",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isBlocked: user.isBlocked,
          profilePhoto: user.profilePhoto,
          googleId: user.googleId || null
        }
      });

}



