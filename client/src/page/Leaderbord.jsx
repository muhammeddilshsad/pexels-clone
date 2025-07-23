
// import React, { useEffect, useState } from "react";
// import { ChevronDown, Mail } from "lucide-react";
// import PexelsNavbar from "./navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { checkFollowStatus, gettopUploader, toggleFollow } from "../Slice/followSlice";
// import MessageModal from "../page/messageModal"; 
// import { sendEmail } from "../Slice/ProfileSlice";

// const PexelsLeaderboard = () => {
//   const [activeTab, setActiveTab] = useState("Most Viewed");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRecipient, setSelectedRecipient] = useState(null);
//   const dispatch = useDispatch();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const { topUploaders, loading, error, folowstatus } = useSelector(
//     (state) => state.follow
//   );

//   useEffect(() => {
//     dispatch(gettopUploader());
//   }, [dispatch]);

//   useEffect(() => {
//     if (topUploaders && topUploaders.length > 0) {
//       topUploaders.forEach((uploader) => {
//         dispatch(checkFollowStatus(uploader._id));
//       });
//     }
//   }, [topUploaders, dispatch]);

//   const handleFollow = async (usertofollow) => {
//     try {
//       const toBackend = { targetUserId: usertofollow };
//       await dispatch(toggleFollow(toBackend));
//       await dispatch(checkFollowStatus(usertofollow));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(()=>{
    
//   })

//   const handleOpenModal = (recipient) => {
//     setSelectedRecipient(recipient);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedRecipient(null);
//   };
  

//   return (
//     <div className="min-h-screen bg-white">
//       <PexelsNavbar />

//       <main className="max-w-7xl mx-auto px-4 py-8 mt-4">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Community Favorites
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Members with the most uploads in the last 4 weeks
//           </p>
//         </div>

//         <div className="flex justify-between items-center mb-8">
//           <div className="flex space-x-4">
//             {["Most Viewed", "Most Active"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-2 rounded-full font-medium ${
//                   activeTab === tab
//                     ? "bg-black text-white"
//                     : "text-gray-600 hover:text-black"
//                 }`}
//               > 
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600">Recent</span>
//             <ChevronDown size={16} className="text-gray-600" />
//           </div>
//         </div>

//         {error && <p className="text-center text-red-500">Error: {error}</p>}

//         <div className="space-y-8">
//           {(topUploaders || []).map((user, index) => {
//             const avatar = `https://i.pravatar.cc/150?u=${user.email}`;
//             const images = user.images || [];
//             const totalMedia = user.uploadCount || 0;


//             return (
//               <div key={user._id} className="flex items-center space-x-6">
//                 <div className="text-4xl font-bold text-gray-900 w-8">
//                   {index + 1}
//                 </div>

//                 <div className="flex items-center space-x-4 flex-1 min-w-0">
//                   <img
//                     src={avatar}
//                     alt={`${user.name}'s avatar`}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />

//                   <div className="min-w-0">
//                     <h3 className="text-xl font-semibold text-gray-900">
//                       {user.name}
//                     </h3>
//                     <div className="flex items-center space-x-1 text-gray-600 text-sm">
//                       <span>{totalMedia} uploads</span>
//                     </div>
//                     <div className="flex space-x-2 ml-auto mt-2">
//                       <button
//                         className={`px-4 py-1 rounded-lg font-medium ${
//                           folowstatus[user._id]
//                             ? "bg-gray-300 text-black"
//                             : "bg-black text-white hover:bg-gray-800"
//                         }`}
//                         onClick={() => handleFollow(user._id)}
//                       >
//                         {folowstatus[user._id] ? "Following" : "Follow"}
//                       </button>
//                       <button
//                         onClick={() => handleOpenModal(user)}
//                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                       >
//                         <Mail size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex space-x-2">
//                   {images.slice(0, 3).map((image, idx) => (
//                     <img
//                       key={idx}
//                       src={image}
//                       alt={`media-${idx}`}
//                       className="w-32 h-24 object-cover rounded-lg"
//                     />
//                   ))}
//                   <div className="w-32 h-24 bg-black rounded-lg flex flex-col items-center justify-center text-white">
//                     <span className="text-2xl font-bold">+{totalMedia}</span>
//                     <span className="text-xs opacity-80">See All Media →</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       <MessageModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         recipient={selectedRecipient}
//       />
//     </div>
//   );
// };

// export default PexelsLeaderboard;



import React, { useEffect, useState } from "react";
import { ChevronDown, Mail, MoreVertical } from "lucide-react";
import PexelsNavbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { checkFollowStatus, gettopUploader, toggleFollow } from "../Slice/followSlice";
import MessageModal from "../page/messageModal"; 
import { sendEmail } from "../Slice/ProfileSlice";

const PexelsLeaderboard = () => {
  const [activeTab, setActiveTab] = useState("Most Viewed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const { topUploaders, loading, error, folowstatus } = useSelector(
    (state) => state.follow
  );

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

  const handleOpenModal = (recipient) => {
    setSelectedRecipient(recipient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipient(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <PexelsNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-4">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Community Favorites
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
            Members with the most uploads in the last 4 weeks
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          {/* Tabs */}
          <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto overflow-x-auto">
            {["Most Viewed", "Most Active"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              > 
                {tab}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <span className="text-gray-600 text-sm sm:text-base">Recent</span>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mb-6 p-4 bg-red-50 rounded-lg">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {(topUploaders || []).map((user, index) => {
            const avatar = `https://i.pravatar.cc/150?u=${user.email}`;
            const images = user.images || [];
            const totalMedia = user.uploadCount || 0;

            return (
              <div key={user._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  {/* Rank and User Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 w-8 flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start space-x-3">
                        <img
                          src={avatar}
                          alt={`${user.name}'s avatar`}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                            {user.name}
                          </h3>
                          <div className="flex items-center space-x-1 text-gray-600 text-sm">
                            <span>{totalMedia} uploads</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2 mt-3">
                        <button
                          className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm ${
                            folowstatus[user._id]
                              ? "bg-gray-300 text-black"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                          onClick={() => handleFollow(user._id)}
                        >
                          {folowstatus[user._id] ? "Following" : "Follow"}
                        </button>
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex-shrink-0"
                        >
                          <Mail size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Media Grid - Mobile */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {images.slice(0, 3).map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`media-${idx}`}
                        className="w-full h-20 sm:h-24 object-cover rounded-lg"
                      />
                    ))}
                    <div className="w-full h-20 sm:h-24 bg-black rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-lg sm:text-xl font-bold">+{totalMedia}</span>
                      <span className="text-xs opacity-80 text-center px-1">See All →</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  <div className="text-3xl xl:text-4xl font-bold text-gray-900 w-8 xl:w-12 flex-shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <img
                      src={avatar}
                      alt={`${user.name}'s avatar`}
                      className="w-16 h-16 xl:w-20 xl:h-20 rounded-full object-cover flex-shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl xl:text-2xl font-semibold text-gray-900 truncate">
                        {user.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-gray-600 text-sm xl:text-base">
                        <span>{totalMedia} uploads</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button
                          className={`px-4 xl:px-6 py-2 rounded-lg font-medium text-sm xl:text-base ${
                            folowstatus[user._id]
                              ? "bg-gray-300 text-black"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                          onClick={() => handleFollow(user._id)}
                        >
                          {folowstatus[user._id] ? "Following" : "Follow"}
                        </button>
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="p-2 xl:p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Mail size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Media Grid - Desktop */}
                  <div className="flex space-x-2 xl:space-x-3 flex-shrink-0">
                    {images.slice(0, 3).map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`media-${idx}`}
                        className="w-24 h-18 xl:w-32 xl:h-24 object-cover rounded-lg"
                      />
                    ))}
                    <div className="w-24 h-18 xl:w-32 xl:h-24 bg-black rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-lg xl:text-2xl font-bold">+{totalMedia}</span>
                      <span className="text-xs opacity-80 text-center">See All →</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {!loading && (!topUploaders || topUploaders.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MoreVertical size={48} className="mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Check back later for community favorites.</p>
          </div>
        )}
      </main>

      <MessageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipient={selectedRecipient}
      />
    </div>
  );
};

export default PexelsLeaderboard;
