// import axios from "axios";

// const user=JSON.parse(localStorage.getItem("user"))


// export const axiosInstance=axios.create({
//     baseURL:"http://localhost:3000/api",
//     withCredentials:true,
//     headers:{
//     Authorization:`Bearer ${user.token}`
//     }
// })

// export default user


import axios from "axios";

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    Authorization: user?.token ? `Bearer ${user.token}` : "",
  },
});

export default user;
