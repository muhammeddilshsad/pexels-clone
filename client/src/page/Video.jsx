import React, { useState } from 'react';
import { Search, Play, ChevronDown, Heart, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Videos = () => {
  const [activeTab, setActiveTab] = useState('Videos');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate()

  const handleSubmit=()=>{
    navigate("/")
  }

 
  const trendingVideos = [
    {
      id: 1,
      thumbnail: 'https://images.pexels.com/videos/3045163/pexels-photo-3045163.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'City Architecture Building',
      duration: '15s',
      author: 'Pexels',
      likes: 234
    },
    {
      id: 2,
      thumbnail: 'https://images.pexels.com/videos/856325/pexels-photo-856325.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Abstract Black Smoke',
      duration: '30s',
      author: 'Pexels',
      likes: 156
    },
    {
      id: 3,
      thumbnail: 'https://images.pexels.com/videos/3571264/pexels-photo-3571264.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Automotive Technology',
      duration: '45s',
      author: 'Pexels',
      likes: 89
    }
  ];

  const VideoCard = ({ video, isLarge = false }) => (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${isLarge ? 'h-full' : ''}`}>
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className={`w-full object-cover ${isLarge ? 'h-80' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="text-gray-800 w-6 h-6 fill-current" />
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white bg-opacity-90 rounded-full p-2 mr-2 hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-700" />
          </button>
          <button className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-white transition-colors">
            <Download className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{video.author}</span>
          <span>{video.likes} likes</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white font-bold text-2xl mr-8">
                pexels
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-white hover:text-gray-200 cursor-pointer">
                <span>Explore</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <button className="text-white hover:text-gray-200 transition-colors">
                License
              </button>
              <button className="text-white hover:text-gray-200 transition-colors text-xl">
                ⋯
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Real Background Image */}
      <div 
        className="relative min-h-130 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-normal text-white mb-12 leading-tight">
            The best free stock videos shared by the
            <br />
            Pexels community.
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl">
              <div className="flex items-center px-6 py-4 border-r border-gray-200">
                <div className="w-5 h-5 mr-3 text-gray-600">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Videos</span>
               
                <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
              </div>
              <input
                type="text"
                placeholder="Search for free videos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-500 focus:outline-none text-lg"
              />
              <button className="p-4 text-gray-600 hover:text-gray-800 transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-0">
            <button onClick={handleSubmit}>HOME</button>
            {[, 'Videos', 'Leaderboard', 'Challenges'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-medium text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-black text-white rounded-full mx-1'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
             
            ))}
            
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-normal text-gray-900">
            Trending Free Stock Videos
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Trending</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Video Grid - matching original layout exactly */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Large video card - spans 2 columns */}
          <div className="col-span-2">
            <VideoCard video={trendingVideos[0]} isLarge={true} />
          </div>
          
          {/* Right column with 2 videos and Canva card */}
          <div className="space-y-6">
            <VideoCard video={trendingVideos[1]} />
            
            {/* Canva promotion card */}
            <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 rounded-lg p-6 text-white h-64 flex flex-col justify-between">
              <div>
                <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'cursive' }}>
                  Canva
                </div>
                <div className="text-3xl font-bold leading-tight">
                  Autogenerate
                </div>
              </div>
              <div>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors mb-3 w-full">
                  Try captions for free
                </button>
                <div className="bg-purple-600 bg-opacity-50 text-white px-3 py-1 rounded-full text-xs inline-block">
                  Kristian
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom video row */}
        <div className="grid grid-cols-3 gap-6">
          <VideoCard video={trendingVideos[2]} />
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500">Additional content area</span>
          </div>
          <div className="bg-gray-900 rounded-lg h-64 relative overflow-hidden">
            <img 
              src="https://images.pexels.com/videos/3571264/pexels-photo-3571264.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Video preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-medium">Featured Video</h3>
              <p className="text-sm opacity-75">Premium content</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Videos;