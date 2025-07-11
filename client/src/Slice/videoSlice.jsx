import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
 

export const getVideos = createAsyncThunk("/image/getallvideo", async () => {
  try {
    const res = await axiosInstance.get("/image/getallvideo");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});



export const serchVideo = createAsyncThunk("video/serchVideo", async (searchQuery) => {
  try {
    const response = await axiosInstance.get(`/image/serchVideo?query=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
});

export const handleVideoSubmit = createAsyncThunk("videos/upload", async (payload) => {
  console.log('nihal',payload);

  const response = await axiosInstance.post("/image/addVideo", payload);
  
  return response.data;
  
});


const videoSlice = createSlice({
  name: "videos",
  initialState: {
    serchVideos:[],
    videos: [],
    error: false,
    loading: false,
  },
  reducers: {},

  extraReducers: (Builder) => {
    Builder.addCase(getVideos.pending, (state, action) => {
      state.loading = true;
    });
    Builder.addCase(getVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    });
    Builder.addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
    });
    Builder.addCase(serchVideo.pending,(state,action)=>{
        state.loading=true;
    })
    Builder.addCase(serchVideo.fulfilled,(state,action)=>{
        state.loading=false;
        state.videos=action.payload
    })
    Builder.addCase(serchVideo.rejected,(state,action)=>{
        state.loading=false,
        state.error=true
    })
    Builder.addCase(handleVideoSubmit.pending, (state) => {
      state.loading = true;
    });
    
    Builder.addCase(handleVideoSubmit.fulfilled, (state, action) => {
      state.loading = false;
      state.videos.unshift(action.payload); 
      state.error = false;
    });
    
    Builder.addCase(handleVideoSubmit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    

  },
});

export default videoSlice.reducer;


