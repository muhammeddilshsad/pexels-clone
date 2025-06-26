import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    
  },
  
  imageUrl: {
    type: String,
    required: true,
  },
  
  tags: [String],
  category: {
    type: String,
    enum: ['Nature', 'Technology', 'People', 'Animals', 'Architecture', 'Other'],
    default: 'Other',
  },
  likes: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Image = mongoose.model('Image', imageSchema);
export default Image;
