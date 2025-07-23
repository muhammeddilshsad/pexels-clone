import jwt from "jsonwebtoken"


export const generateToken = (user) => {
  
  console.log("user role",user);
  
    return jwt.sign({ 
      id:user._id,
      role:user.role,
      name:user.name,
      email:user.email}, process.env.JWT_SECRET, {
      expiresIn: '90d'

    });

  };
  


  export const generateRefreshToken = (user) => {
    return jwt.sign(
      { id:user._id,role:user.role ,name:user.name,email:user.email},
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '90d' }
    );
  };
  
  