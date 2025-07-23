import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PexelsNavbar from "./navbar";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePasswordModal() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in");
        return;
      }

      const response = await axiosInstance.put(
        "/auth/changepassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      navigate("/Editprofile");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error.response?.data?.message || "❌ Failed to change password"
      );
    }
  };

  return (
    <>
      <PexelsNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-md w-full max-w-xl shadow-lg ">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Change your password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Current password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/Editprofile")}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-200 text-green-800 font-medium px-5 py-2 rounded-md hover:bg-green-300"
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordModal;
