import axios from "axios";

const user=JSON.parse(localStorage.getItem("user"))


export const axiosInstance=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
    headers:{
        
    }
})