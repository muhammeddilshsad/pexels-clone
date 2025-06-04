import Image from "../Model/Image.js";


export const getAllimage = async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json(images);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  