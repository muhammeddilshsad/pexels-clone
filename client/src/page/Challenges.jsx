import React from "react";
import PexelsNavbar from "./navbar";
import { useNavigate } from "react-router-dom";

function PexelsChallengesPage() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-white">
      <PexelsNavbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
       
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6">Challenges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Photo and video competitions designed to inspire you to get out
            there, shoot, and share your work with the world. You might even win
            prizes while you do.
          </p>
        </div>

        {/* Challenge Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-2 p-4 h-full">
                {/* Top Left - Restaurant */}
                <div className="relative overflow-hidden rounded-lg h-48">
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Le Consulat Restaurant"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Top Right - Food */}
                <div className="relative overflow-hidden rounded-lg h-48">
                  <img
                    src="https://images.pexels.com/photos/32645213/pexels-photo-32645213.jpeg"
                    alt="French Cuisine"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg h-48">
                  <img
                    src="https://images.pexels.com/photos/32603582/pexels-photo-32603582.jpeg"
                    alt="French Street Scene"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bottom Right - Architecture */}
                <div className="relative overflow-hidden rounded-lg h-48">
                  <img
                    src="https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="French Architecture"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Days Left Badge */}
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>9
                  days left
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Destination France
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Share your best photos and videos of France for a chance to win!
              </p>

              {/* Prize Section */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <path
                        d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M7 10L12 7L17 10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    Prize
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  $750 USD in cash prizes
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium" onClick={()=>navigate("/upload/image")}>
                  Join the Challenge
                </button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Attribution */}
      <div className="text-center py-8 text-sm text-gray-400">
        <p>https://www.pexels.com/challenges/</p>
      </div>
    </div>
  );
}

export default PexelsChallengesPage;
