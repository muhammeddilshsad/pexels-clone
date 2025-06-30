import { configureStore } from "@reduxjs/toolkit";
import imageSlice from '../Slice/ImageSlice'
import videoSlice from '../Slice/videoSlice'
import followSlice from "../Slice/followSlice"


export const store = configureStore({
  reducer: {
    images: imageSlice,
    videos:videoSlice,
    follow:followSlice,
  
    
  },
});
