import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";

export const fetch = createAsyncThunk("image", async () => {
  try {
    const res = await axiosInstance.get("/image/getAllimage");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const handleImagesubmit = createAsyncThunk(
  "image/upload",
  async (payload, { rejectWithValue }) => {
    try {
      console.log('nihal',payload);

      const response = await axiosInstance.post("/image/upload", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; 
    } catch (error) {
      toast.error("Failed to submit content.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const serchImage = createAsyncThunk(
  "serch/image",
  async (searchQuery) => {
    console.log("qqqqqqqqqq", searchQuery);

    try {
      const response = await axiosInstance.get( `/image/serchImage?query=${searchQuery}`
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const imageSlice = createSlice({
  name: "pexals",
  initialState: {
    serchedImage: [],
    image: [],
    error: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(fetch.pending, (state, action) => {
      state.loading = true;
    });
    Builder.addCase(fetch.fulfilled, (state, action) => {
      (state.loading = false), (state.image = action.payload);
    });
    Builder.addCase(fetch.rejected, (state, action) => {
      (state.error = true), (state.loading = false);
    });

    Builder.addCase(handleImagesubmit.pending, (state, action) => {
      state.loading = true;
    });
    Builder.addCase(handleImagesubmit.fulfilled, (state, action) => {
      state.loading = false;
    });
    Builder.addCase(handleImagesubmit.rejected, (state, action) => {
      (state.loading = false), (state.error = true);
    });

    Builder.addCase(serchImage.pending, (state, action) => {
      state.loading = true;
    });
    Builder.addCase(serchImage.fulfilled, (state, action) => {
      state.loading = false;
      state.serchedImage = action.payload;
    });
    Builder.addCase(serchImage.rejected, (state, action) => {
      (state.loading = false), (state.error = true);
    });
  },
});
export default imageSlice.reducer;
