import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";





export const gettopUploader=createAsyncThunk("/gettop",async()=>{
    try {
        const topupload=await axiosInstance.get("/follow/top-uploaders");
        console.log(topupload.data)

        return topupload.data
        
    } catch (error) {
        console.log(error)
        
    }

})

export const toggleFollow=createAsyncThunk("/follow",async(userId)=>{
    try {
        const res = await axiosInstance.post("/follow/followr", userId );
        console.log(res.data)
    } catch (error) {
        console.log(error)
        
    }
})

export const checkFollowStatus = createAsyncThunk ("/check",async (userId) => {
    try {
      const res = await axiosInstance.get(`/follow/status/${userId}`);
      return res.data.isFollowing;
    } catch (err) {
      console.error("Failed to check follow status:", err);
      return false;
    }
})




const followSlice = createSlice({
  name: "follow",
  initialState: {
    topUploaders: [],
    loading: false,
    error: null,
    folowstatus:false
  },
  extraReducers: (builder) => {
    builder
      .addCase(gettopUploader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gettopUploader.fulfilled, (state, action) => {
        state.loading = false;
        state.topUploaders = action.payload;
      })
      .addCase(gettopUploader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFollow.pending,(state,action)=>{
        state.loading = true;
        state.error = null;  
      })
      .addCase(toggleFollow.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=action.payload

      })
      .addCase(toggleFollow.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
      })
      .addCase(checkFollowStatus.pending,(state,action)=>{
        state.loading=false;
        state.error = null;

      })
      .addCase(checkFollowStatus.fulfilled,(state,action)=>{
        state.loading = false;
        state.checkFollowStatus= action.payload;
      })
      .addCase(checkFollowStatus.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      
  },
});

export default followSlice.reducer;
