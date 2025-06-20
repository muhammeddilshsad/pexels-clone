import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
  },
  category: {
    type: String,
  },
  videoGrapher: {
 type:String,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
