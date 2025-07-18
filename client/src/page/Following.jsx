



import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

function Following() {
  const dispatch = useDispatch();
  const { followingList, loading } = useSelector((state) => state.follow);
  const { user } = useSelector((state) => state.auth);

  const handleToggleFollow = async (targetUserId) => {
    try {
      const res = await axios.post(
        "/api/follow/toggle",
        { targetUserId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(res.data.message);
      dispatch({ type: "follow/fetchFollowing" }); // Implement this action
    } catch (error) {
      toast.error(error.response?.data?.message || "Error toggling follow");
    }
  };

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
                <button
                  className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                  onClick={() => handleToggleFollow(user._id)}
                >
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
      {followingList?.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-center text-sm text-gray-600">
            <span>
              Following {followingList.length}{" "}
              {followingList.length !== 1 ? "users" : "user"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Following;