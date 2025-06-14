import Image from "../Model/Image.js";

export const addImage = async (req, res) => {
  console.log(req);
  
  try {
    const image= req.file.path
    const { title, description,photographer} = req.body;
    const newImage = new Image({ title, description, imageUrl:image ,photographer});
    await newImage.save();
    res.status(201).json({ message: "Image added successfully", image: newImage });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Failed to add image", error: error.message });
  }
};

