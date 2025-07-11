
import React, { useState, useRef } from 'react';
import PexelsNavbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../Slice/ProfileSlice';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch =  useDispatch();

  const { user, loading, error, successMessage } = useSelector((state) => state.profile);
  
  const users= JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    paypalEmail: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
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
      fd.append("profileImage", profileImage);
    }

    await dispatch(updateProfile(fd));
    toast.success("Profile updated successfully");
    navigate('/profile');
  };

  const handlePasswordChange = () => {
    navigate('/password');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PexelsNavbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">Profile settings</h1>

        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 overflow-hidden border">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="Default"
                className="w-full h-full object-cover"
              />
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
            name="profileImage"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paypal email for donations
              </label>
              <input
                type="email"
                name="paypalEmail"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-2">Note that this email will be public.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
