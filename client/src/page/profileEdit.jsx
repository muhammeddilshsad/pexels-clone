import React, { useState, useRef, useEffect } from "react";
import PexelsNavbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Slice/ProfileSlice";
import toast from "react-hot-toast";


const ProfileSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    profilePhoto: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { loading, error, successMessage } = useSelector(
    (state) => state.profile
  );
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log('ff', storedUser);
  


  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser) {
  //     const userData = storedUser;
  //     const { name, email, profilePhoto } = userData;
      
  //     setFormData({
  //       firstName: name || "",
  //       email: email || "",
  //       profilePhoto: profilePhoto || "",
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.user) {
      const { name, email, profilePhoto } = storedUser.user;
  
      setFormData({
        firstName: name || "",
        email: email || "",
        profilePhoto: profilePhoto || "",
      });
    }
  }, []);
  
 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("firstName", formData.firstName);
    fd.append("email", formData.email);
    if (profileImage) {
      fd.append("profilePhoto", profileImage);
    }
    
    try {
      const result = await dispatch(updateProfile(fd));
      if (result.payload) {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...currentUser,
          user: {
            ...(currentUser?.user || {}),
            name: formData.firstName,
            email: formData.email,
            profilePhoto: result.payload.profilePhoto || formData.profilePhoto,
          }
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
      }
      
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = () => {
    navigate("/password");
  };
  console.log("Profile Photo:", formData.profilePhoto);


  return (
    <div className="min-h-screen bg-gray-50">
      <PexelsNavbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Profile settings
        </h1>

        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 overflow-hidden border">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Current Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>


          <button
            onClick={handleUploadClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Change image
          </button>

          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-8 flex flex-col justify-center items-center">
          <div className="gap-6 flex flex-col justify-center items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="gap-6 flex flex-col justify-center items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <button
              onClick={handlePasswordChange}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors"
            >
              Change password
            </button>
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About you</h2>
          </div>

          <div className="pt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;