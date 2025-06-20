import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./project/Register";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";
import Videos from "./page/Video";
import MasnoryModal from "./page/ImageModal";
import Login from "./project/Login";
import ImageUpload from "./page/upload";
import VideoModal from "./page/VideoModal";
import VideoUpload from "./page/VideoUpload";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/ImageModal" element={<MasnoryModal />} />
        <Route path="/videoModal" element={<VideoModal/>}/>
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/Videoupload" element={<VideoUpload/>}/>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
