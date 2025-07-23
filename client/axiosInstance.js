

import axios from "axios";

const storedUser = localStorage.getItem("user");
const token = localStorage.getItem("token");

const user = storedUser ? JSON.parse(storedUser) : null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PIXEL_URL,
  withCredentials: true,
  headers: {
    Authorization: user?.token ? `Bearer ${user.token}` : `Bearer ${token}`,
  },
});

export default user;
