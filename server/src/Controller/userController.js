import User from "../Model/User.js"

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
    const user= await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:(user),
            isBlocked:user.isBlocked,
        });
    }else{
        res.status(401).json({message:"invalid password"})
    }

};


