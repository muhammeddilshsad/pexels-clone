import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

export const gettopUploader = createAsyncThunk("/gettop", async () => {
  const res = await axiosInstance.get("/follow/top-uploaders");
  return res.data;
});

export const toggleFollow = createAsyncThunk("/follow", async (userData) => {
  const res = await axiosInstance.post("/follow/followr", userData);
  return res.data;
});

export const  checkFollowStatus = createAsyncThunk("/check", async (userId) => {
  const res = await axiosInstance.get(`/follow/status/${userId}`);
  return { userId, isFollowing: res.data.isFollowing };

});

export const getFollowingUsers = createAsyncThunk("/getFollowingUsers", async () => {
    try {
      const res = await axiosInstance.get(`/follow/followingg`);
      console.log(res.data)
      
      return res.data;

    } catch (error) {
      console.log(error)
    }
  }
);


const followSlice = createSlice({
  name: "follow",
  initialState: {
    topUploaders: [],
    loading: false,
    error: null,
    folowstatus: {},
    followingList: [], 
  },
  extraReducers: (builder) => {
    builder
      .addCase(gettopUploader.pending, (state) => {
        state.loading = true;
      })
      .addCase(gettopUploader.fulfilled, (state, action) => {
        state.loading = false;
        state.topUploaders = action.payload;
      })
      .addCase(gettopUploader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      .addCase(toggleFollow.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFollow.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      .addCase(checkFollowStatus.fulfilled, (state, action) => {
        const { userId, isFollowing } = action.payload;
        state.folowstatus[userId] = isFollowing;
      })

      .addCase(getFollowingUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getFollowingUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.followingList = action.payload; 
      })
      .addCase(getFollowingUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default followSlice.reducer;
