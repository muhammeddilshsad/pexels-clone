
import React from "react";
import PexelsNavbar from "./navbar";
import { useNavigate } from "react-router-dom";



function PexelsChallengesPage() {
  const navigate=useNavigate();
  const handleJoinChallenge = () => {
    navigate('/upload/image');

  
  };
  
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

      
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      
            <div className="relative">
              <div className="grid grid-cols-2 gap-2 p-4 h-full">
           
                <div className="relative overflow-hidden rounded-lg h-48">
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Le Consulat Restaurant"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

         
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

                <div className="relative overflow-hidden rounded-lg h-48">
                  <img
                    src="https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="French Architecture"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

          
            <div className="p-8 lg:p-12 flex flex-col justify-center">
           
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>9
                  days left
                </div>
              </div>

           
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Destination France
              </h2>

          
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Share your best photos and videos of France for a chance to win!
              </p>

            
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

 
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium" 
                  onClick={handleJoinChallenge}
                >
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

      
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
      
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6">Past Challenges</h2>
          </div>

     
          <div className="space-y-16">
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
     
                  <div className="relative overflow-hidden rounded-lg h-40">
                    <img
                      src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                      alt="French Bakery"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

          
                  <div className="relative overflow-hidden rounded-lg h-40">
                    <img
                      src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                      alt="Aerial Pool View"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="relative overflow-hidden rounded-lg h-40 col-span-2">
                    <img
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="European Street Tram"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:pl-8">
        
                <div className="flex items-center mb-6">
                  <div className="flex items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Ended
                  </div>
                </div>

           
                <h3 className="text-4xl font-light mb-4">
                  Video Challenge: In Motion
                </h3>

           
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Submit your best in motion videos!
                </p>

            
                <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors font-medium">
                  Learn more
                </button>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
               
                  <div className="relative overflow-hidden rounded-lg h-64">
                    <img
                      src="https://images.pexels.com/photos/31773527/pexels-photo-31773527/free-photo-of-man-in-traditional-attire-in-front-of-intricate-wall.jpeg?auto=compress&cs=tinysrgb&w=1440&h=398&dpr=2"
                      alt="Pink Architecture"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

               
                  <div className="relative overflow-hidden rounded-lg h-64">
                    <img
                      src="https://images.pexels.com/photos/31854805/pexels-photo-31854805/free-photo-of-hand-reaching-for-cherry-blossom-flowers-in-spring.jpeg?auto=compress&cs=tinysrgb&w=1440&h=398&dpr=2"
                      alt="Pink Flamingos"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                 
                  <div className="relative overflow-hidden rounded-lg h-40 col-span-2">
                    <img
                      src="https://images.pexels.com/photos/31464235/pexels-photo-31464235/free-photo-of-romantic-flamingos-displaying-heart-shaped-pose.jpeg?auto=compress&cs=tinysrgb&w=1440&h=398&dpr=2"
                      alt="Pink Decorative Pattern"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

        
              <div className="lg:pl-8">
             
                <div className="flex items-center mb-6">
                  <div className="flex items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Ended
                  </div>
                </div>

                
                <h3 className="text-4xl font-light mb-4">
                  Pink: Homepage Challenge
                </h3>

        
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Submit your best photos and videos featuring the color pink!
                </p>

           
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="flex -space-x-2 mr-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-black"></div>
                      <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-black"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Winners</p>
                      <p className="text-white font-medium">Mary Rose Relente and 14 more</p>
                    </div>
                  </div>
                </div>
                <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors font-medium">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

  
    </div>
  );
}

export default PexelsChallengesPage;
