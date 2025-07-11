import User from "../Model/User.js"
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";

export const  register=async(req,res)=>{
    
const {name,email,password}=req.body;
console.log(req.body)
    const user=await User.create({
        name,
        email,
        password,
        
    });
    await user.save();
    res.status(200).json(user)
}

export const login=async (req,res)=>{

    const {email,password}=req.body
    const user= await User.findOne({email:email})
    const token=generateToken(user)
    console.log(user)

    if(user && (await user.matchPassword(password))){
        
        res.json({
            user:user,
            token:token,
            isBlocked:user.isBlocked,
        });
        

    }else{
        res.status(401).json({message:"invalid password"})
    }

};


