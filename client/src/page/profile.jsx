
import React, { useEffect, useState } from 'react';
import { Edit3, ChevronDown } from 'lucide-react';
import PexelsNavbar from './navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingUsers } from '../Slice/followSlice';


function UserProfile() {
  const [activeTab, setActiveTab] = useState('Gallery');
  const { followingList, loading } = useSelector((state) => state.follow);
  console.log(followingList)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getFollowingUsers());
   }, [dispatch]);

  return (

    <div className="min-h-screen bg-gray-50 py-1">
      <PexelsNavbar/>
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-8">
        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4">
  {user?.user?.name?.charAt(0).toUpperCase()}
           </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">{user.user.name}</h1>
          <button className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
            <Edit3 size={16} />
            Edit profile
          </button>
        </div>


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

     
        <div className="border-b border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-0">
              {['Highlights', 'Gallery', 'Collections', 'Statistics', 'Followers', 'Following'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'bg-black text-white rounded-full'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {(tab === 'Following' || tab === 'Followers') && (
                    <span className={`ml-2 ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                      {tab === 'Following' ? followingList?.length || 0 : 0}
                    </span>
                  )}
                  {tab === 'Gallery' && (
                    <span className={`ml-2 ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                      0
                    </span>
                  )}
                </button>
              ))}
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

     
        <div className="min-h-[400px]">
          {activeTab === 'Following' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <p className="text-center col-span-full text-gray-500">Loading...</p>
              ) : followingList?.length > 0 ? (
                followingList.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-lg shadow p-4 text-center"
                  >
                    <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  You're not following anyone yet.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              <div>
                <p className="text-lg">No content in {activeTab} yet</p>
                <p className="text-sm mt-2">Start by uploading your first photo or video</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
