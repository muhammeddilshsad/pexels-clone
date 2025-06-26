import Image from "../Model/Image.js";

export const addImage = async (req, res) => {
  
  
  try {
    const image= req.file.path
    const { title, description} = req.body;
    console.log(description);
    
    console.log(req.user);
    
    const newImage = new Image({ title, description, imageUrl:image,uploadedBy:req.user.id });
    await newImage.save();
    res.status(201).json({ message: "Image added successfully", image: newImage });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Failed to add image", error: error.message });
  }
};



