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
