

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Image,
  Instagram,
  Youtube,
  User, // Assuming a User icon from lucide-react
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PexelsNavbar = () => {
  const [photosDropdown, setPhotosDropdown] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false); // New state for profile dropdown
  const [activeTab, setActiveTab] = useState("Leaderboard");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogged, setIsLogged] = useState(!!user);

  return (
    <div className="w-full bg-white shadow-sm">
      <nav className="border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold italic text-black">pexels</h1>

              <div className="relative">
                <button
                  onClick={() => setPhotosDropdown(!photosDropdown)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  <Image className="w-4 h-4" />
                  <span>Photos</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {photosDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Free Stock Photos
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Trending
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        New
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="flex-1 w-180">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for free photos"
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-0 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Links, Dropdowns, Buttons */}
            <div className="flex items-center space-x-6 relative">
              {/* Explore */}
              <div className="relative">
                <button
                  onClick={() => setExploreDropdown(!exploreDropdown)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  <span>Explore</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {exploreDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Discover Photos
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Popular Searches
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Collections
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                License
              </a>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <User className="w-5 h-5" /> {/* User icon for profile */}
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <button
                        type="button"
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => navigate("/profile")}
                      >
                        Your Profile
                      </button>
                      <button
                        type="button"
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Your Collections
                      </button>
                      <button
                        type="button"
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Settings
                      </button>

                      <button
                        onClick={() => {
                          localStorage.clear();
                          setIsLogged(false);
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

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreDropdown(!moreDropdown)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {moreDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-lg z-50 overflow-hidden">
                    <div className="py-4">
                      {user ? (
                        <button
                          onClick={() => {
                            localStorage.clear();
                            setIsLogged(false);
                            navigate("/login");
                          }}
                          className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 text-base font-medium"
                        >
                          Log Out
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/login")}
                          className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 text-base font-medium"
                        >
                          Log In
                        </button>
                      )}
                      <button className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-50">
                        Image & Video API
                      </button>
                      <button className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-50">
                        Apps & Plugins
                      </button>
                      <button className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-50">
                        Help Center
                      </button>
                      <button className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-50">
                        Report Content
                      </button>
                      <button className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-50">
                        Partnerships
                      </button>
                      <button className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-50">
                        Imprint & Terms
                      </button>
                    </div>

                    {/* Social Icons */}
                    <div className="px-6 py-4 border-t border-gray-100 flex gap-4">
                      <Instagram className="w-5 h-5 text-gray-600" />
                      <Youtube className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Join */}
              <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-0 py-4">
            <button
              onClick={() => {
                setActiveTab("Home");
                navigate("/");
              }}
              className={`px-6 py-2 mx-1 rounded-full font-medium text-sm transition-all ${
                activeTab === "Home"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                setActiveTab("Videos");
                navigate("/videos");
              }}
              className={`px-6 py-2 mx-1 rounded-full font-medium text-sm transition-all ${
                activeTab === "Videos"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Videos
            </button>

            <button
              onClick={() => {
                setActiveTab("Leaderboard");
                navigate("/leaderboard");
              }}
              className={`px-6 py-2 mx-1 rounded-full font-medium text-sm transition-all ${
                activeTab === "Leaderboard"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Leaderboard
            </button>

            <button
              onClick={() => {
                setActiveTab("Challenges");
                navigate("/challenges");
              }}
              className={`px-6 py-2 mx-1 rounded-full font-medium text-sm transition-all ${
                activeTab === "Challenges"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Challenges
            </button>
          </div>
        </div>
      </div>

      {(photosDropdown ||
        exploreDropdown ||
        moreDropdown ||
        profileDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setPhotosDropdown(false);
            setExploreDropdown(false);
            setMoreDropdown(false);
            setProfileDropdown(false); // Close profile dropdown
          }}
        />
      )}
    </div>
  );
};

export default PexelsNavbar;
