import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

export const updateProfile = createAsyncThunk("profile/updateProfile",async (formData, thunkAPI) => {
    try {
        const res = await axiosInstance.put('/auth/profile', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        localStorage.setItem("user", JSON.stringify(res.data.user));

  
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  );

  export const sendEmail = createAsyncThunk(
    "profile/sendEmail",
    async ({ email, message }, { rejectWithValue }) => {
      try {
        console.log('Sending to:', email);
        console.log('Message:', message);
        const res = await axiosInstance.post("/auth/mail", { recipientEmail: email, message });
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to send email");
      }
    }
  );


  export const getUserUploads = createAsyncThunk(
    "profile/getUserUploads",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/auth/getuseruplaod");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch uploads");
      }
    }
  );



const profileSlice = createSlice({
  name: "profile",
  initialState: {
    images: [],
    videos: [],
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },

  extraReducers: (builder) => {
    builder

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.loading = false;
  
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;

      })

      .addCase(getUserUploads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserUploads.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.images;
        state.videos = action.payload.videos;
      })
      .addCase(getUserUploads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default profileSlice.reducer;
