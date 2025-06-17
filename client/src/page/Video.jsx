import React, { useState } from "react";
import { Search, ChevronDown, MoreHorizontal, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
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
            <div className="hover:text-gray-200 cursor-pointer transition-colors">
              <MoreHorizontal size={20} />
            </div>
            <button className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm">
              Join
            </button>
          </nav>

      
        </div>
      </header>

  
      <div
        className="relative min-h-[500px] flex flex-col justify-center items-center px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.pexels.com/photos/17631065/pexels-photo-17631065/free-photo-of-ruins-of-abandoned-house-in-vast-grassland-flow-country-scotland.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        
          <div className="text-center mb-16 max-w-5xl">
            <h1 className="text-5xl md:text-5xl font-bold text-white leading-tight tracking-tight">
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
                <button className="p-5 hover:bg-gray-50 transition-colors">
                  <Search size={22} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

 
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex justify-center space-x-12 py-2">
            <button
              className="text-white bg-black px-6 py-2 rounded-full"
              onClick={home}
            >
              Home
            </button>
            <button className="text-white bg-black px-6 py-2 rounded-full">
              Videos
            </button>
            <button className="text-white bg-black px-6 py-2 rounded-full">
              Leaderboard
            </button>
            <button className="text-white bg-black px-6 py-2 rounded-full">
              Challenges
            </button>
          </nav>
        </div>
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
         
          <div className="group cursor-pointer">
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-20">
                  CITY
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <Play size={24} className="text-gray-800 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                0:30
              </div>
            </div>
          </div>

          {/* Video 2 - Nature */}
          <div className="group cursor-pointer">
            <div className="relative aspect-video bg-green-600 rounded-xl overflow-hidden mb-4 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <div className="text-white text-4xl font-bold opacity-20">
                  NATURE
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <Play size={24} className="text-gray-800 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                1:15
              </div>
            </div>
          </div>

          {/* Video 3 - Art */}
          <div className="group cursor-pointer">
            <div className="relative aspect-video bg-purple-500 rounded-xl overflow-hidden mb-4 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <div className="text-white text-5xl font-bold opacity-20">
                  ART
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <Play size={24} className="text-gray-800 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                0:45
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
