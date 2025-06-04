import Image from "../Model/Image.js";

export const addImage = async (req, res) => {
  try {
    const { title, description, imageUrl ,photographer} = req.body;
    const newImage = new Image({ title, description, imageUrl ,photographer});
    await newImage.save();
    res.status(201).json({ message: "Image added successfully", image: newImage });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Failed to add image", error: error.message });
  }
};

