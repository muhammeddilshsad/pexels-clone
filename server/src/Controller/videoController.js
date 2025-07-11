import Video from "../Model/Videos.js";



export const addVideo = async (req, res) => {
  
  try {
   
    
    const video = req.file?.path;
    const { title, description, category, tags } = req.body;

    if (!title || !video) {
      return res.status(400).json({ message: 'Title and video file are required' });
    }
console.log('sdfysuyjw',req.user);

    const newVideo = new Video({
      title,
      description,
      url: video,
      uploadedBy:req.user.id,
      category,
      tags,
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: 'Failed to upload video', error: error.message });
  }
};


export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).populate("uploadedBy","_id name email") 
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};


export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(query, 'i');

    const videos = await Video.find({
      $or: [
        { title: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { tags: { $elemMatch: { $regex: searchRegex } } },
      ],
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
