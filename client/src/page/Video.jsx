// import React, { useEffect, useState, useRef } from "react";
// import { Search, ChevronDown, MoreHorizontal, Play } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getVideos, serchVideo } from "../Slice/videoSlice";
// import VideoModal from "./VideoModal";

// const Videos = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [selectVideo, setselectVideo] = useState(null);
//   const [isLicenseDropdownOpen, setIsLicenseDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const { videos, loading } = useSelector((state) => state.videos);

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     dispatch(getVideos());
//   }, [dispatch]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsLicenseDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleVideo = (Video) => {
//     setselectVideo(Video);
//   };

//   const home = () => {
//     navigate("/");
//   };

//   const handleUpload = () => {
//     navigate("/upload/video");
//   };

//   const handleCloseModal = () => {
//     setselectVideo(null);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <div className="text-white text-3xl font-light italic tracking-wide">
//             pexels
//           </div>

//           <nav className="hidden md:flex items-center space-x-8 text-white">
//             <div className="flex items-center space-x-1 cursor-pointer">
//               <span className="mr-1 font-medium">Explore</span>
//               <ChevronDown size={18} />
//             </div>
//             <div className="hover:text-gray-200 cursor-pointer font-medium transition-colors">
//               License
//             </div>

//             <div className="relative" ref={dropdownRef}>
//               <div
//                 onClick={() => setIsLicenseDropdownOpen(!isLicenseDropdownOpen)}
//                 className="hover:text-gray-200 cursor-pointer font-medium transition-colors"
//               >
//                 ...
//               </div>

//               {isLicenseDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg z-50 overflow-hidden">
//                   <div className="py-4">
//                     <button
//                       onClick={() => {
//                         console.log("Clicked: Image & Video API");
//                         setIsLicenseDropdownOpen(false);
//                       }}
//                       className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
//                     >
//                       Image & Video API
//                     </button>

//                     <button
//                       onClick={() => {
//                         console.log("Clicked: Apps & Plugins");
//                         setIsLicenseDropdownOpen(false);
//                       }}
//                       className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
//                     >
//                       Apps & Plugins
//                     </button>

//                     <button
//                       onClick={() => {
//                         console.log("Clicked: Help Center");
//                         setIsLicenseDropdownOpen(false);
//                       }}
//                       className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
//                     >
//                       Help Center
//                     </button>

//                     <button
//                       onClick={() => {
//                         console.log("Clicked: Report Content");
//                         setIsLicenseDropdownOpen(false);
//                       }}
//                       className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
//                     >
//                       Report Content
//                     </button>

//                     <button
//                       onClick={() => {
//                         console.log("Clicked: Partnerships");
//                         setIsLicenseDropdownOpen(false);
//                       }}
//                       className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
//                     >
//                       Partnerships
//                     </button>

//                     <button
//                       onClick={() => {
//                         console.log("Clicked: Imprint & Terms");
//                         setIsLicenseDropdownOpen(false);
//                       }}
//                       className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
//                     >
//                       Imprint & Terms
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm">
//               Join
//             </button>

//             <button
//               className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm"
//               onClick={handleUpload}
//             >
//               Upload
//             </button>
//           </nav>
//         </div>
//       </header>

//       <div
//         className="relative min-h-[550px] flex flex-col justify-center items-center px-6"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/17631065/pexels-photo-17631065/free-photo-of-ruins-of-abandoned-house-in-vast-grassland-flow-country-scotland.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
//           <div className="text-center mb-16 max-w-5xl">
//             <h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
//               The best free stock videos shared by the
//               <br />
//               Pexels community.
//             </h1>
//           </div>

//           <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
//             <div className="flex">
//               <div className="flex items-center px-6 py-5 border-r border-gray-100">
//                 <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
//                   <Play size={12} className="text-gray-500 ml-0.5" />
//                 </div>
//                 <span className="text-gray-800 font-medium mr-3 text-lg">
//                   Videos
//                 </span>
//                 <ChevronDown size={18} className="text-gray-400" />
//               </div>
//               <div className="flex-1 flex items-center relative">
//                 {" "}
//                 {/* Add relative for dropdown positioning */}
//                 <input
//                   type="text"
//                   placeholder="Search for free videos"
//                   value={searchQuery}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setSearchQuery(value);

//                     if (value.trim() === "") {
//                       dispatch(getVideos());
//                       setSuggestions([]);
//                     } else {
//                       const filtered = videos.filter((video) =>
//                         video.title.toLowerCase().includes(value.toLowerCase())
//                       );
//                       setSuggestions(filtered.slice(0, 5));
//                     }
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       dispatch(serchVideo(searchQuery));
//                       setSuggestions([]);
//                     }
//                   }}
//                   className="flex-1 px-6 py-5 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
//                 />
//                 <button
//                   className="p-5 hover:bg-gray-50 transition-colors"
//                   onClick={() => {
//                     dispatch(serchVideo(searchQuery));
//                     setSuggestions([]);
//                   }}
//                 >
//                   <Search className="text-gray-400" />
//                 </button>
//                 {suggestions.length > 0 && (
//                   <div className="absolute mt-2 left-0 right-0 bg-white z-10 text-black shadow-md max-h-60 overflow-y-auto rounded-b-md">
//                     {suggestions.map((item) => (
//                       <div
//                         key={item._id}
//                         className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
//                         onClick={() => {
//                           setSearchQuery(item.title);
//                           dispatch(serchVideo(item.title));
//                           setSuggestions([]);
//                         }}
//                       >
//                         {item.title} —{" "}
//                         <span className="text-gray-500">{item.category}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6">
//         <nav className="flex justify-center space-x-12 py-2">
//           <button className="text-black px-6 py-2 rounded-full" onClick={home}>
//             Home
//           </button>
//           <button className="text-black px-6 py-2 rounded-full">Videos</button>
//           <button
//             className="text-black  px-6 py-2 rounded-full"
//             onClick={() => navigate("/leaderboard")}
//           >
//             Leaderboard
//           </button>

//           <button
//             className="text-black px-6 py-2 rounded-full"
//             onClick={() => navigate("/Challenges")}
//           >
//             Challenges
//           </button>
//         </nav>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="flex items-center justify-between mb-12">
//           <h2 className="text-3xl font-bold text-gray-900">
//             Trending Free Stock Videos
//           </h2>
//           <div className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
//             <span className="mr-2 font-medium">Trending</span>
//             <ChevronDown size={18} />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {loading ? (
//             <p className="text-center col-span-3">Loading...</p>
//           ) : videos.length > 0 ? (
//             videos.map((video) => (
//               <div
//                 key={video._id}
//                 className="rounded-lg shadow-md overflow-hidden bg-white"
//                 onClick={() => handleVideo(video)}
//               >
//                 <video
//                   src={video.url}
//                   controls
//                   preload="metadata"
//                   crossOrigin="anonymous"
//                   className="w-full h-[300px] object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     {video.title}
//                   </h3>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-3">No videos found.</p>
//           )}
//         </div>
//       </div>
//       {selectVideo && (
//         <VideoModal video={selectVideo} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default Videos;



import React, { useEffect, useState, useRef } from "react";
import { Search, ChevronDown, MoreHorizontal, Play, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, serchVideo } from "../Slice/videoSlice";
import VideoModal from "./VideoModal";

const Videos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectVideo, setselectVideo] = useState(null);
  const [isLicenseDropdownOpen, setIsLicenseDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { videos, loading } = useSelector((state) => state.videos);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
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
    navigate("/upload/video");
  };

  const handleCloseModal = () => {
    setselectVideo(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-white text-2xl sm:text-3xl font-light italic tracking-wide">
            pexels
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-white">
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

            <button className="bg-white text-gray-900 px-4 xl:px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm text-sm xl:text-base">
              Join
            </button>
            <button
              className="bg-white text-gray-900 px-4 xl:px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm text-sm xl:text-base"
              onClick={handleUpload}
            >
              Upload
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden relative" ref={mobileMenuRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg z-50 overflow-hidden">
                <div className="py-4">
                  <button className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    Explore
                  </button>
                  <button className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    License
                  </button>
                  <button className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    Image & Video API
                  </button>
                  <button className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    Apps & Plugins
                  </button>
                  <button className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    Help Center
                  </button>
                  <hr className="my-2" />
                  <button className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    Join
                  </button>
                  <button
                    onClick={handleUpload}
                    className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative min-h-[450px] sm:min-h-[550px] lg:min-h-[600px] flex flex-col justify-center items-center px-4 sm:px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/17631065/pexels-photo-17631065/free-photo-of-ruins-of-abandoned-house-in-vast-grassland-flow-country-scotland.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
          {/* Hero Text */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 max-w-5xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight">
              The best free stock videos shared by the
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Pexels community.
            </h1>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Video Type Selector */}
              <div className="flex items-center px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-100">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                  <Play size={12} className="text-gray-500 ml-0.5" />
                </div>
                <span className="text-gray-800 font-medium mr-3 text-base sm:text-lg">
                  Videos
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
              
              {/* Search Input */}
              <div className="flex-1 flex items-center relative">
                <input
                  type="text"
                  placeholder="Search for free videos"
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);

                    if (value.trim() === "") {
                      dispatch(getVideos());
                      setSuggestions([]);
                    } else {
                      const filtered = videos.filter((video) =>
                        video.title.toLowerCase().includes(value.toLowerCase())
                      );
                      setSuggestions(filtered.slice(0, 5));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(serchVideo(searchQuery));
                      setSuggestions([]);
                    }
                  }}
                  className="flex-1 px-4 sm:px-6 py-4 sm:py-5 text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg"
                />
                <button
                  className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    dispatch(serchVideo(searchQuery));
                    setSuggestions([]);
                  }}
                >
                  <Search className="text-gray-400" size={20} />
                </button>
                
                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white z-10 text-black shadow-md max-h-60 overflow-y-auto rounded-b-md">
                    {suggestions.map((item) => (
                      <div
                        key={item._id}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setSearchQuery(item.title);
                          dispatch(serchVideo(item.title));
                          setSuggestions([]);
                        }}
                      >
                        <div className="font-medium">{item.title}</div>
                        <div className="text-gray-500 text-xs mt-1">{item.category}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-center space-x-4 sm:space-x-8 lg:space-x-12 py-2 overflow-x-auto">
          <button 
            className="text-black px-4 sm:px-6 py-2 rounded-full whitespace-nowrap text-sm sm:text-base" 
            onClick={home}
          >
            Home
          </button>
          <button className="text-black px-4 sm:px-6 py-2 rounded-full whitespace-nowrap text-sm sm:text-base">
            Videos
          </button>
          <button
            className="text-black px-4 sm:px-6 py-2 rounded-full whitespace-nowrap text-sm sm:text-base"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </button>
          <button
            className="text-black px-4 sm:px-6 py-2 rounded-full whitespace-nowrap text-sm sm:text-base"
            onClick={() => navigate("/Challenges")}
          >
            Challenges
          </button>
        </nav>
      </div>

      {/* Videos Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Trending Free Stock Videos
          </h2>
          <div className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
            <span className="mr-2 font-medium">Trending</span>
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading videos...</p>
              </div>
            </div>
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleVideo(video)}
              >
                <div className="relative">
                  <video
                    src={video.url}
                    controls
                    preload="metadata" 
                    crossOrigin="anonymous"
                    className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <Play className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300" size={48} />
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.category && (
                    <p className="text-sm text-gray-500 mt-1">{video.category}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-500">
                <Play size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium">No videos found</p>
                <p className="text-sm mt-2">Try adjusting your search terms</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectVideo && (
        <VideoModal video={selectVideo} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Videos;