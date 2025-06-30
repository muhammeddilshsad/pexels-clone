import React, { useEffect, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import PexelsNavbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  checkFollowStatus,
  gettopUploader,
  toggleFollow,
} from "../Slice/followSlice";

const PexelsLeaderboard = () => {
  const [activeTab, setActiveTab] = useState("Most Viewed");
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));


  const { topUploaders, loading, error, folowstatus } = useSelector(
    (state) => state.follow);

  useEffect(() => {
    dispatch(gettopUploader());
    
  }, [dispatch]);

  useEffect(() => {
    if (topUploaders && topUploaders.length > 0) {
      topUploaders.forEach((uploader) => {
        dispatch(checkFollowStatus(uploader._id));
      });
    }
  }, [topUploaders, dispatch]);
 
  const handleFollow = async (usertofollow) => {
    try {
      const toBackend = { targetUserId: usertofollow };
      await dispatch(toggleFollow(toBackend));
      await dispatch(checkFollowStatus(usertofollow));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PexelsNavbar />
     

      <main className="max-w-7xl mx-auto px-4 py-8 mt-4">
     
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Favorites
          </h1>
          <p className="text-gray-600 text-lg">
            Members with the most uploads in the last 4 weeks
          </p>
        </div>

 
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            {["Most Viewed", "Most Active"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Recent</span>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>

  
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        
        <div className="space-y-8">
          {(topUploaders || []).map((user, index) => {
            const avatar = `https://i.pravatar.cc/150?u=${user.email}`;
            const images = user.images || [];
            const totalMedia = user.uploadCount || 0;

            return (
              <div key={user._id} className="flex items-center space-x-6">
           
                <div className="text-4xl font-bold text-gray-900 w-8">
                  {index + 1}
                </div>

           
                <div className="flex items-center space-x-4 flex-1 min-w-0">
               
                  <img
                    src={avatar}
                    alt={`${user.name}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-gray-600 text-sm">
                      <span>{totalMedia} uploads</span>
                    </div>
                    <div className="flex space-x-2 ml-auto mt-2">
                      <button
                        className={`px-4 py-1 rounded-lg font-medium ${
                          folowstatus[user._id]
                            ? "bg-gray-300 text-black"
                            : "bg-black text-white hover:bg-gray-800"
                        }`}
                        onClick={() => handleFollow(user._id)}
                      >
                        {folowstatus[user._id] ? "Following" : "Follow"}
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Mail size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {images.slice(0, 3).map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`media-${idx}`}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  ))}

            
                  <div className="w-32 h-24 bg-black rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">+{totalMedia}</span>
                    <span className="text-xs opacity-80">See All Media →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PexelsLeaderboard;
