import React, { useEffect, useState } from "react";
import {Search,ChevronDown,Menu,MoreHorizontal,Download,
  Heart,
  Bell,
  Instagram,
  Youtube,
  User,
} from "lucide-react";
import MasnoryGrid from "./Masnorygrid";
import { useNavigate } from "react-router-dom";
import MasnoryModal from "./ImageModal";
import { fetch, serchImage } from "../Slice/ImageSlice";
import { getNotifications } from "../Slice/followSlice";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { toast } from "react-toastify";

const socket = io("http://localhost:5000", { withCredentials: true });

export default function PexelsHomepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isLicenseDropdownOpen, setIsLicenseDropdownOpen] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    loading: imageLoading,
    image,
    error: imageError,
    serchedImage,
  } = useSelector((state) => state.images);
  const {
    notifications,
    loading: notificationLoading,
    error: notificationError,
  } = useSelector((state) => state.follow);
  console.log(notifications);

  useEffect(() => {
    dispatch(fetch());
    if (user?.id && user?.token) {
      socket.emit("join", user.id);
      socket.on(
        "newNotification",
        (notification) => {
          console.log("New notification received:", notification);
          dispatch(addNotification(notification));
          toast.info(notification.message);
        },
        [dispatch]
      );
      return () => socket.off("newNotification");
    }
  }, [user?.id, user?.token, dispatch]);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const upload = () => {
    navigate("/upload/image");
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <header className="relative z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-white">pexels</div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Explore</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="relative">
            <button
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsLicenseDropdownOpen(!isLicenseDropdownOpen)}
            >
              License
            </button>
            {isLicenseDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg z-50 overflow-hidden">
                <div className="py-4">
                  {user ? (
                    <button
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Log Out
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    >
                      Log in
                    </button>
                  )}
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLicenseDropdownOpen(false)}
                  >
                    Image & Video API
                  </button>
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLicenseDropdownOpen(false)}
                  >
                    Apps & Plugins
                  </button>
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLicenseDropdownOpen(false)}
                  >
                    Help Center
                  </button>
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLicenseDropdownOpen(false)}
                  >
                    Report Content
                  </button>
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLicenseDropdownOpen(false)}
                  >
                    Partnerships
                  </button>
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
                    onClick={() => setIsLicenseDropdownOpen(false)}
                  >
                    Imprint & Terms
                  </button>
                </div>
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Instagram className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Youtube className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <div className="w-5 h-5 text-gray-600 font-bold italic text-xs"></div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsLicenseDropdownOpen(!isLicenseDropdownOpen)}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button
            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            onClick={() => navigate("/register")}
          >
            Join
          </button>
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="text-gray-600 hover:text-gray-800"
            >
              <User className="w-5 h-5" />
            </button>
            {profileDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => navigate("/profile")}
                  >
                    Your Profile
                  </button>
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => navigate("/following")}
                  >
                    Following
                  </button>
                  <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Your Collections
                  </button>
                  <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setNotificationDropdown(!notificationDropdown)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
              aria-expanded={notificationDropdown}
              aria-label="Toggle notifications"
            >
              <Bell className="w-5 h-5 text-white" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </button>
            {notificationDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    <span className="font-medium">Notifications</span>
                  </div>
                  {notificationLoading ? (
                    <div className="px-4 py-3 text-sm text-gray-700">
                      <p>Loading notifications...</p>
                    </div>
                  ) : notificationError ? (
                    <div className="px-4 py-3 text-sm text-red-500">
                      <p>{notificationError}</p>
                    </div>
                  ) : notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-700">
                      <p>No notifications yet</p>
                    </div>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                    onClick={() => {
                      navigate("/notifications");
                      setNotificationDropdown(false);
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {user && (
            <button
              onClick={upload}
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Upload
            </button>
          )}
        </div>
      </header>

      {(isLicenseDropdownOpen || notificationDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsLicenseDropdownOpen(false);
            setNotificationDropdown(false);
          }}
        ></div>
      )}

      <div
        className="relative min-h-[500px] flex flex-col justify-center items-center px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-white text-4xl md:text-5xl font-semibold leading-snug text-center">
            The best free stock photos, royalty free images & videos shared by
            creators.
          </h1>
        </div>

        <div className="w-full max-w-2xl relative">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="flex">
              <div className="flex items-center px-4 py-3 border-r border-gray-200">
                <span className="text-gray-600 text-sm font-medium">
                  Photos
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for free photos"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => dispatch(serchImage(searchQuery))}
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-6 text-sm text-white/70">
          PHOTO BY DILSHAD
        </div>
      </div>

      <div className="bg-white">
        <div className="flex justify-center space-x-8 py-4">
          <button
            onClick={() => setActiveTab("Home")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Home"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/videos")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Videos"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Leaderboard"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => navigate("/Challenges")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "Challenges"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            Challenges
          </button>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Free Stock Photos</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Trending</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {imageLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <MasnoryGrid
              images={serchedImage.length > 0 ? serchedImage : image}
              onclick={handleImageClick}
            />
          )}
        </div>
      </div>
      {selectedImage && (
        <MasnoryModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
