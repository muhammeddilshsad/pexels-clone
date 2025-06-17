import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

export const Videos = createAsyncThunk("/image/addVideo", async () => {
  try {
    const respo = await axiosInstance.post("/image/addVideo");
    console.log(respo.data);
  } catch (error) {}
});

export const getVideos = createAsyncThunk("image/getallvideo", async () => {
  try {
    const res = await axiosInstance.get("/image/getallvideo");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});


export const serchVideo=createAsyncThunk("mage/serchVideo",async(serchQuery)=>{
    console.log(serchQuery)
    try {
        const respon= await axiosInstance.get(`image/serchVideo?query=${serchQuery}`)
        console.log(respon.data)
        
        return respon.data;
    } catch (error) {
        console.log(error)
        
    }
})

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
        state.serchVideos=action.payload
    })
    Builder.addCase(serchVideo.rejected,(state,action)=>{
        state.loading=false,
        state.error=true
    })
  },
});

export default videoSlice.reducer;
