import { configureStore } from "@reduxjs/toolkit";
import imageSlice from '../Slice/ImageSlice'


export const store = configureStore({
  reducer: {
    images: imageSlice
  },
});
