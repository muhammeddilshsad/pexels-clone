import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./project/Register";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";
import Videos from "./page/Video";
import MasnoryModal from "./page/ImageModal";
import Login from "./project/Login";
import VideoModal from "./page/VideoModal";
import PexelsLeaderboard from "./page/Leaderbord";
import PexelsNavbar from "./page/navbar";
import PexelsChallengesPage from "./page/Challenges";
import MediaUpload from "./page/upload";
import UserProfile from "./page/profile";
import MessageModal from "./page/messageModal";
import ProfileEdit from "./page/profileEdit";
import ChangePasswordModal from "./page/currentPassword";
import Collections from "./page/Collections";
import Following from "./page/Following";
import Gallery from "./page/gallary";
import UserDetails from "./page/userDetails";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/ImageModal" element={<MasnoryModal />} />
        <Route path="/videoModal" element={<VideoModal />} />
        <Route path="/messgemodal" element={<MessageModal/>}/>
        <Route path="/upload/image" element={<MediaUpload type="image" />} />
        <Route path="/upload/video" element={<MediaUpload type="video" />} />
        <Route path="/leaderboard" element={<PexelsLeaderboard />} />
        <Route path="/navabr" element={<PexelsNavbar />} />
        <Route path="/Challenges" element={<PexelsChallengesPage />} />
        <Route path="/profile" element={<UserProfile/>}/>
        <Route  path="/Editprofile" element={<ProfileEdit/>}/>
        <Route path="/password" element={<ChangePasswordModal/>}/>
        <Route path="/collection" element={<Collections/>}/>
        <Route path="/following" element={<Following/>}/>
        <Route path="/gallaery" element={<Gallery/>}/>
        <Route path="/userdetails/:id" element={<UserDetails/>}/>
       
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
