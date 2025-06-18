import Video from "../Model/Videos.js";

export const addVideo = async (req, res) => {
  try {
    const { title, description, url, category, tags, videoGrapher } = req.body;
    console.log(videoGrapher);
    

    if (!title || !url) {
      return res.status(400).json({ message: 'Title and URL are required' });
    }

    const newVideo = new Video({
      title,
      description,
      url,
      videoGrapher,
      category,
      tags,
    
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload video', error: error.message });
  }
};



export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};



// export const searchVideos = async (req, res) => {
//   try {
//     const { query } = req.query;
    

//     if (!query) {
//       return res.status(400).json({ message: "Search query is required" });
//     }

//     const searchRegex = new RegExp(query, 'i'); 

//     const videos = await Video.find({
//       $or: [
//         { title: { $regex: searchRegex } },
//         { category: { $regex: searchRegex } },
//         { tags: { $in: [searchRegex] } },
//       ],
//     });

//     res.status(200).json(videos);
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
