import React, { useState } from 'react';
import { Edit3, ChevronDown } from 'lucide-react';
import PexelsNavbar from './navbar';

 function UserProfile() {
  const [activeTab, setActiveTab] = useState('Gallery');



  return (
      <div className="min-h-screen bg-gray-50 py-8">
        
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4">
            d
          </div>
          
          {/* Name */}
          <h1 className="text-3xl font-light text-gray-900 mb-4">dilshazz dilu</h1>
          
          {/* Edit Profile Button */}
          <button className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
            <Edit3 size={16} />
            Edit profile
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mb-12 text-center">
          <div>
            <p className="text-gray-500 text-sm mb-1">Total Views</p>
            <p className="text-3xl font-light text-gray-900">0</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">All-time rank</p>
            <p className="text-3xl font-light text-gray-900">0</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">30-day rank</p>
            <p className="text-3xl font-light text-gray-900">0</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-0">
              <button
                onClick={() => setActiveTab('Highlights')}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'Highlights'
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Highlights
                <span className={`ml-2 ${
                  activeTab === 'Highlights' ? 'text-white' : 'text-gray-400'
                }`}>
                  0
                </span>
              </button>

              <button
                onClick={() => setActiveTab('Gallery')}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'Gallery'
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Gallery
                <span className={`ml-2 ${
                  activeTab === 'Gallery' ? 'text-white' : 'text-gray-400'
                }`}>
                  0
                </span>
              </button>

              <button
                onClick={() => setActiveTab('Collections')}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'Collections'
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Collections
              </button>

              <button
                onClick={() => setActiveTab('Statistics')}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'Statistics'
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Statistics
              </button>

              <button
                onClick={() => setActiveTab('Followers')}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'Followers'
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Followers
                <span className={`ml-2 ${
                  activeTab === 'Followers' ? 'text-white' : 'text-gray-400'
                }`}>
                  0
                </span>
              </button>

              <button
                onClick={() => setActiveTab('Following')}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'Following'
                    ? 'bg-black text-white rounded-full'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Following
                <span className={`ml-2 ${
                  activeTab === 'Following' ? 'text-white' : 'text-gray-400'
                }`}>
                  0
                </span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600 px-4 py-2 text-sm">
                Add to Highlights
              </button>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm">
                  Photos and videos
                  <ChevronDown size={16} />
                </button>
                
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm">
                  Recency
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg">No content in {activeTab} yet</p>
            <p className="text-sm mt-2">Start by uploading your first photo or video</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile