  import React, { useState } from 'react';
  import { Eye, EyeOff, X } from 'lucide-react';
  import {axiosInstance} from "../../axiosInstance"
  import { useNavigate } from 'react-router-dom';
  import toast from 'react-hot-toast';
  import { GoogleLogin } from '@react-oauth/google';


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
    const handleSuccess = (credentialResponse) => {
      console.log("Credential:", credentialResponse);
      navigate("/")
      toast.success("LOGIN SUCCESSFULY")
   
    };
  
    const handleError = () => {
      console.log("Login Failed");
    };
  
    
    
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
           
 <div className="flex items-center justify-center  h-1/2">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
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
