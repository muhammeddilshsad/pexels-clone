// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getFollowingUsers } from "../Slice/followSlice";

// function Following() {
//   const dispatch = useDispatch();
//   const { followingList, loading } = useSelector((state) => state.follow);

//   useEffect(() => {
//     dispatch(getFollowingUsers());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-semibold text-gray-800 mb-6">Following</h2>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : followingList?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {followingList.map((user) => (
//             <div
//               key={user._id}
//               className="bg-white rounded-lg shadow p-4 text-center"
//             >
//               <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
//                 {user?.name?.charAt(0).toUpperCase()}
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
//               <p className="text-sm text-gray-500">{user.email}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">You’re not following anyone yet.</p>
//       )}
//     </div>
//   );
// }

// export default Following;


import React from "react";
import { useSelector } from "react-redux";

function Following() {
  const { followingList, loading } = useSelector((state) => state.follow);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-center text-gray-500">Loading following...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">Following</h2>

      {followingList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {followingList.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3 shadow-md">
                {user?.profilePhoto ? (
                  <img 
                    src={user.profilePhoto} 
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{user.email}</p>
              
              
              <div className="flex gap-2 justify-center">
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
                  View Profile
                </button>
                <button className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors">
                  Unfollow
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-center text-gray-500">
          <div>
            <svg 
              className="w-16 h-16 mx-auto mb-4 text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <p className="text-lg font-medium">Not following anyone yet</p>
            <p className="text-sm mt-2">
              Discover and follow users to see their content here
            </p>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {followingList?.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-center text-sm text-gray-600">
            <span>Following {followingList.length} user{followingList.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Following