  import React, { useState } from 'react';
  import { Eye, EyeOff, X } from 'lucide-react';
  import {axiosInstance} from "../../axiosInstance"
  import { useNavigate } from 'react-router-dom';
  import toast from 'react-hot-toast';


  const Masonry = ({ children, breakpointCols, className }) => {
    const getColumns = () => {
      const cols = typeof breakpointCols === 'object' ? breakpointCols.default || 3 : breakpointCols || 3;
      return Array.from({ length: cols }, () => []);
    };

    const [columns] = useState(() => {
      const cols = getColumns();
      React.Children.forEach(children, (child, index) => {
        cols[index % cols.length].push(child);
      });
      return cols;
    });

    return (
      <div className={className}>
        <div className="flex gap-4">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-4">
              {column}
            </div>
          ))}
        </div>
      </div>
    );
  };

  function Register() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    
    
  const navigate=useNavigate()

  
    const handleSubmit = async(e) => {
      e.preventDefault()

      
      try {
        const response= await axiosInstance.post("/auth/register",{
          name:firstName,
          email:email,
          password:password
          
        })
        console.log(response)
        
      } catch (error) {
        console.log(error)
        
      }finally{
        setFirstName('')
        setEmail('')
        setPassword('')
      }
        toast.success("REGISTER SUCCESFULY")
      navigate("/login")

      
  
      
    }

    if (!isModalOpen) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Open Sign Up Modal
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
      
        <div className="absolute inset-0 overflow-hidden">
          <Masonry
            breakpointCols={{ default: 6, 1280: 5, 1024: 4, 768: 3, 640: 2 }}
            className="p-2"
          >
            {[
              
              { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop", height: "h-96" },
              { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop", height: "h-80" },
              { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop", height: "h-112" },
          
            ].map((image, i) => (
              <div key={i} className="mb-4 opacity-60 hover:opacity-75 transition-opacity cursor-pointer">
                <img
                  src={image.src}
                  alt={`Image ${i + 1}`}
                  className={`w-full ${image.height} object-cover rounded-lg shadow-sm`}
                  loading="lazy"
                />
              </div>
            ))}
          </Masonry>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

      
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-20">
          <h1 className="text-2xl font-bold text-white">pexels</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">English</span>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Join
            </button>
          </div>
        </div>

      
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-900">
            Sign Up to Pexels
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm leading-relaxed">
            More than 3 million free photos and videos to bring your ideas to life.
          </p>

          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignUp('Google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Sign up with Google</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => handleSocialSignUp('Apple')}
                className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                
              </button>
              <button
                onClick={() => handleSocialSignUp('Facebook')}
                className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>

        
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Or, sign up with your email</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default Register;
