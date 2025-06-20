import React, { useEffect, useState, useRef } from "react";
import { Search, ChevronDown, MoreHorizontal, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, serchVideo } from "../Slice/videoSlice";
import VideoModal from "./VideoModal";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectVideo, setselectVideo] = useState(null);
  const [isLicenseDropdownOpen, setIsLicenseDropdownOpen] = useState(false);
  const { videos, loading } = useSelector((state) => state.videos);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLicenseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVideo = (Video) => {
    setselectVideo(Video);
  };

  const home = () => {
    navigate("/");
  };

  const handleUpload = () => {
    navigate("/Videoupload");
  };

  const handleCloseModal = () => {
    setselectVideo(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-white text-3xl font-light italic tracking-wide">
            pexels
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-white">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="mr-1 font-medium">Explore</span>
              <ChevronDown size={18} />
            </div>
            <div className="hover:text-gray-200 cursor-pointer font-medium transition-colors">
              License
            </div>

            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsLicenseDropdownOpen(!isLicenseDropdownOpen)}
                className="hover:text-gray-200 cursor-pointer font-medium transition-colors"
              >
                ...
              </div>

              {isLicenseDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="py-4">
                    <button
                      onClick={() => {
                        console.log("Clicked: Image & Video API");
                        setIsLicenseDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Image & Video API
                    </button>

                    <button
                      onClick={() => {
                        console.log("Clicked: Apps & Plugins");
                        setIsLicenseDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Apps & Plugins
                    </button>

                    <button
                      onClick={() => {
                        console.log("Clicked: Help Center");
                        setIsLicenseDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Help Center
                    </button>

                    <button
                      onClick={() => {
                        console.log("Clicked: Report Content");
                        setIsLicenseDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Report Content
                    </button>

                    <button
                      onClick={() => {
                        console.log("Clicked: Partnerships");
                        setIsLicenseDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Partnerships
                    </button>

                    <button
                      onClick={() => {
                        console.log("Clicked: Imprint & Terms");
                        setIsLicenseDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Imprint & Terms
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm">
              Join
            </button>

            <button
              className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm"
              onClick={handleUpload}
            >
              upload
            </button>
          </nav>
        </div>
      </header>

      <div
        className="relative min-h-[550px] flex flex-col justify-center items-center px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/17631065/pexels-photo-17631065/free-photo-of-ruins-of-abandoned-house-in-vast-grassland-flow-country-scotland.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-16 max-w-5xl">
            <h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
              The best free stock videos shared by the
              <br />
              Pexels community.
            </h1>
          </div>

          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex">
              <div className="flex items-center px-6 py-5 border-r border-gray-100">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                  <Play size={12} className="text-gray-500 ml-0.5" />
                </div>
                <span className="text-gray-800 font-medium mr-3 text-lg">
                  Videos
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search for free videos"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-5 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                />
                <button
                  className="p-5 hover:bg-gray-50 transition-colors"
                  onClick={() => dispatch(serchVideo(searchTerm))}
                >
                  <Search className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex justify-center space-x-12 py-2">
          <button className="text-black px-6 py-2 rounded-full " onClick={home}>
            Home
          </button>
          <button className="text-black px-6 py-2 rounded-full">Videos</button>
          <button className="text-black  px-6 py-2 rounded-full">
            Leaderboard
          </button>
          <button className="text-black px-6 py-2 rounded-full">
            Challenges
          </button>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Trending Free Stock Videos
          </h2>
          <div className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
            <span className="mr-2 font-medium">Trending</span>
            <ChevronDown size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-3">Loading...</p>
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="rounded-lg shadow-md overflow-hidden bg-white"
                onClick={() => handleVideo(video)}
              >
                <video
                  src={video.url}
                  controls
                  preload="metadata"
                  crossOrigin="anonymous"
                  className="w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Duration: {video.duration || "Unknown"} | Category:{" "}
                    {video.category || "Uncategorized"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No videos found.</p>
          )}
        </div>
      </div>
      {selectVideo && (
        <VideoModal video={selectVideo} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Videos;
