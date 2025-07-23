

  import React, { useEffect, useState } from "react";
  import { Edit3, ChevronDown } from "lucide-react";
  import PexelsNavbar from "./navbar";
  import { useDispatch, useSelector } from "react-redux";
  import { getFollowingUsers } from "../Slice/followSlice";
  import { getUserUploads } from "../Slice/ProfileSlice";
  import { useNavigate } from "react-router-dom";
  import Gallery from "./gallary"; 
  
  function UserProfile() {
    const [activeTab, setActiveTab] = useState("Gallery");
    const { followingList, loading } = useSelector((state) => state.follow);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
  
    useEffect(() => { 
      dispatch(getFollowingUsers());
    }, [dispatch]);
  
    useEffect(() => {
      if (activeTab === "Gallery") {
        dispatch(getUserUploads());
      }
    }, [activeTab, dispatch]);
  
    return (
      <div className="min-h-screen bg-gray-50 py-1">
        <PexelsNavbar/>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold mx-auto mb-4 overflow-hidden">
              {(user.user?.profilePhoto || user?.profilePhoto) ? <img className="w-full h-full" src={user.user?.profilePhoto || user.profilePhoto}/>:user?.user?.name?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              {user.user?.name || user.name} 
            </h1>
            <button className="bg-green-400 hover:bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors" onClick={()=>navigate("/Editprofile")}>
              <Edit3 size={16} />
              Edit profile
            </button>
          </div>
  
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 text-center">
            <div>
              <p className="text-gray-500 text-xs sm:text-sm mb-1">Total Views</p>
              <p className="text-xl sm:text-3xl font-light text-gray-900">0</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm mb-1">All-time rank</p>
              <p className="text-xl sm:text-3xl font-light text-gray-900">0</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm mb-1">30-day rank</p>
              <p className="text-xl sm:text-3xl font-light text-gray-900">0</p>
            </div>
          </div>
  
          <div className="border-b border-gray-200 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap gap-1 sm:gap-0 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab("Highlights")}
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "Highlights"
                      ? "bg-black text-white rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Highlights
                </button>
  
                <button
                  onClick={() => setActiveTab("Gallery")}
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "Gallery"
                      ? "bg-black text-white rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Gallery
                  <span
                    className={`ml-1 sm:ml-2 ${
                      activeTab === "Gallery" ? "text-white" : "text-gray-400"
                    }`}
                  >
                    0
                  </span>
                </button>
  
                <button
                  onClick={() =>navigate("/collection")}
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "Collections"
                      ? "bg-black text-white rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Collections
                </button>
  
                <button
                  onClick={() => setActiveTab("Statistics")}
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "Statistics"
                      ? "bg-black text-white rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Statistics
                </button>
  
                <button
                  onClick={() => setActiveTab("Followers")}
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "Followers"
                      ? "bg-black text-white rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Followers
                  <span
                    className={`ml-1 sm:ml-2 ${
                      activeTab === "Followers" ? "text-white" : "text-gray-400"
                    }`}
                  >
                    0
                  </span>
                </button>
  
                <button
                  onClick={() => setActiveTab("Following")}
                  className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "Following"
                      ? "bg-black text-white rounded-full"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Following
                  <span
                    className={`ml-1 sm:ml-2 ${
                      activeTab === "Following" ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {followingList?.length || 0}
                  </span>
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <button className="text-gray-400 hover:text-gray-600 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  Add to Highlights
                </button>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                    Photos and videos
                    <ChevronDown size={16} />
                  </button>
                  <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                    Recency
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <div className="min-h-[300px] sm:min-h-[400px]">
            {activeTab === "Gallery" && <Gallery />}
            
            {activeTab === "Following" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <p className="text-center col-span-full text-gray-500">
                    Loading...
                  </p>
                ) : followingList?.length > 0 ? (
                  followingList.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white rounded-lg shadow p-4 text-center"
                    >
                      <button className="w-14 h-14 sm:w-16 sm:h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-lg sm:text-xl mx-auto mb-2" onClick={()=>navigate(`/userDetails/${user._id}`)}>
                        {user?.name?.charAt(0).toUpperCase()}
                      </button>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        {user.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 break-all">{user.email}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-500">
                    You're not following anyone yet.
                  </p>
                )}
              </div>
            )}
  
            {activeTab === "Highlights" && (
              <div className="flex items-center justify-center h-full text-center text-gray-500 px-4">
                <div>
                  <p className="text-base sm:text-lg">No highlights yet</p>
                  <p className="text-xs sm:text-sm mt-2">
                    Add your best photos and videos to highlights
                  </p>
                </div>
              </div>
            )}
  
            {activeTab === "Collections" && (
              <div className="flex items-center justify-center h-full text-center text-gray-500 px-4">
                <div>
                  <p className="text-base sm:text-lg">No collections yet</p>
                  <p className="text-xs sm:text-sm mt-2">
                    Create collections to organize your content
                  </p>
                </div>
              </div>
            )}
  
            {activeTab === "Statistics" && (
              <div className="flex items-center justify-center h-full text-center text-gray-500 px-4">
                <div>
                  <p className="text-base sm:text-lg">No statistics available</p>
                  <p className="text-xs sm:text-sm mt-2">
                    Statistics will appear here once you have content
                  </p>
                </div>
              </div>
            )}
  
            {activeTab === "Followers" && (
              <div className="flex items-center justify-center h-full text-center text-gray-500 px-4">
                <div>
                  <p className="text-base sm:text-lg">No followers yet</p>
                  <p className="text-xs sm:text-sm mt-2">
                    Share your content to gain followers
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default UserProfile;