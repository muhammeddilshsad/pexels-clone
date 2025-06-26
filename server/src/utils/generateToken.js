import jwt from "jsonwebtoken"


export const generateToken = (user) => {
    return jwt.sign({ id:user._id,role:user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
  };
  


  export const generateRefreshToken = (user) => {
    return jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '90d' }
    );
  };
  
  