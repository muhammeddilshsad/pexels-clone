import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  url: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,

  },

});


const Video = mongoose.model("Video", videoSchema);
export default Video;
