import Image from "../Model/Image.js";

export const getAllimage = async (req, res) => {
  try {
    const images = await Image.find()
    .populate(({
      path: 'uploadedBy',
      select: 'name email', 
    }))
    console.log(images);
    
    
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const serchImage = async (req, res) => {

  try {
    const query = req.query.query;
    console.log("User Search:", query);

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const images = await Image.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(images);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



