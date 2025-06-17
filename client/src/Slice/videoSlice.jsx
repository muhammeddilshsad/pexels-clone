import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";


export const Videos=createAsyncThunk("",async()=>{
    try {
        const respo= await axiosInstance.post("/image/addVideo");
        console.log(respo.data)
        
    } catch (error) {
        
    }
    

})


