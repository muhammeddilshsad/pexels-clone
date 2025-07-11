import { configureStore } from "@reduxjs/toolkit";
import imageSlice from '../Slice/ImageSlice'
import videoSlice from '../Slice/videoSlice'
import followSlice from "../Slice/followSlice"
import profileSlice from "../Slice/ProfileSlice";


export const store = configureStore({
  reducer: {
    images: imageSlice,
    videos:videoSlice,
    follow:followSlice,
    profile:profileSlice,
  
    
  },
});
