import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Menu,
  MoreHorizontal,
  Download,
  Heart,
} from "lucide-react";
import MasnoryGrid from "./Masnorygrid";
import { Navigate, useNavigate } from "react-router-dom";
import MasnoryModal from "./ImageModal";
import { fetch, serchImage } from "../Slice/ImageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function PexelsHomepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const upload = () => {
    navigate("/upload");
  };

  useEffect(() => {
    dispatch(fetch());
  }, []);

  const { loading, image, error, serchedImage } = useSelector(
    (state) => state.images
  );

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const onclick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-white">pexels</div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Explore</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="cursor-pointer">License</span>
          <button onClick={onclick}>Login</button>
          {/* <MoreHorizontal className="w-5 h-5 cursor-pointer"  /> */}
          <button className="w-5 h-5 cursor-pointer">...</button>
          <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Join
          </button>
          <button
            onClick={upload}
            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Upload
          </button>
        </div>
      </header>

      <div
        className="relative min-h-[500px] flex flex-col justify-center items-center px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            The best free stock photos, royalty free images & videos shared by
            creators.
          </h1>
        </div>

        <div className="w-full max-w-2xl relative">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="flex">
              <div className="flex items-center px-4 py-3 border-r border-gray-200">
                <span className="text-gray-600 text-sm font-medium">
                  Photos
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for free photos"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                />

                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => dispatch(serchImage(searchQuery))}
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Credit */}
        <div className="absolute bottom-4 right-6 text-sm text-white/70">
          PHOTO BY DILSHAD
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white">
        <div className="flex justify-center space-x-8 py-4">
          <button
            onClick={() => setActiveTab("Home")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Home"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/videos")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Videos"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Videos
          </button>

          <button
            onClick={() => setActiveTab("Leaderboard")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Leaderboard"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Leaderboard
          </button>

          <button
            onClick={() => setActiveTab("Challenges")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Challenges"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Challenges
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Free Stock Photos</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Trending</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            /* Masonry Image Grid */
            <MasnoryGrid
              images={serchedImage.length > 0 ? serchedImage : image}
              onclick={handleImageClick}
            />
          )}
        </div>
      </div>
      {selectedImage && (
        <MasnoryModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
