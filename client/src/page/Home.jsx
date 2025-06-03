
import React, { useState } from 'react';
import { Search, ChevronDown, Menu, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PexelsHomepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const navigate=useNavigate()

  const tabs = ['Home', 'Videos', 'Leaderboard', 'Challenges'];
  
  const trendingImages = [
    'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=400',

  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-white">
            pexels
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Explore</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="cursor-pointer">License</span>
          <button onClick={()=>navigate("/register")}>login</button>
          <MoreHorizontal className="w-5 h-5 cursor-pointer" />
          <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Join
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="relative min-h-130  flex flex-col justify-center items-center px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'

        }}
      >
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-2xl md:text-2xl lg:text-5xl font-bold mb-6 leading-tigh" >
          The best free stock photos, royalty free images & videos shared by creators.
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="flex">
              <div className="flex items-center px-4 py-3 border-r border-gray-200">
                <span className="text-gray-600 text-sm font-medium">Photos</span>
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
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
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
          <button>Videos</button>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              
              {tab}
            </button>

            
          ))}
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

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Featured Image */}
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] bg-gray-100">
                <img
                  src="https://images.pexels.com/photos/30307367/pexels-photo-30307367/free-photo-of-groom-in-tuxedo-sitting-on-luxury-car-in-baghdad.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Elegant black and white wedding ceremony"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>

            {/* Smaller Images */}
            <div className="space-y-6">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-gray-100">
                <img
                  src="https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
                  alt="Urban architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              
              <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-gray-100">
                <img
                  src="https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
                  alt="City street view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>



              <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-gray-100">
                <img
                  src="https://images.pexels.com/photos/16811826/pexels-photo-16811826/free-photo-of-russell-square-tube-station-in-london.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                  alt="City street view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}
