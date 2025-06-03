import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axiosInstance';
import { toast } from 'react-hot-toast'; 


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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axiosInstance.post("/auth/login",{
        email:email,
        password:password,
      })
         const userdata=response.data;
         console.log("userdta",userdata)
      console.log("werghj",response)
      localStorage.setItem("user",JSON.stringify(userdata))
      toast.success("LOGIN SUCCESFULY")
      
      navigate("/")
    } catch (error) {
      console.log(error)
      
    }finally{
      setEmail('')
      setPassword('')
    }



  };



  const handleregister=()=>{
   navigate("/register")
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
     
      <div className="absolute inset-0 overflow-hidden">
        <Masonry
          breakpointCols={{
            default: 6,
            1280: 5,
            1024: 4,
            768: 3,
            640: 2
          }}
          className="p-2"
        >
          {[
            { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop", height: "h-96" },
            { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop", height: "h-80" },
            { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop", height: "h-112" },
            { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=650&fit=crop", height: "h-104" },
            { src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=450&fit=crop", height: "h-72" },
            { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop", height: "h-96" },
            { src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop", height: "h-80" },
            { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=700&fit=crop", height: "h-112" },
            { src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=550&fit=crop", height: "h-88" },
            { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=600&fit=crop", height: "h-96" },
            { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=480&fit=crop", height: "h-76" },
            { src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=650&fit=crop", height: "h-104" },
            { src: "https://images.unsplash.com/photo-1502780402662-acc01917949e?w=400&h=600&fit=crop", height: "h-96" },
            { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=580&fit=crop", height: "h-92" },
            { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=450&fit=crop", height: "h-72" },
            { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop", height: "h-112" },
            { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=550&fit=crop", height: "h-88" },
            { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=620&fit=crop", height: "h-99" },
            { src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=480&fit=crop", height: "h-76" },
            { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=650&fit=crop", height: "h-104" },
            { src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop", height: "h-80" },
            { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=580&fit=crop", height: "h-92" },
            { src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=600&fit=crop", height: "h-96" },
            { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=520&fit=crop", height: "h-83" }
          ].map((image, i) => (
            <div key={i} className="mb-4 opacity-75 hover:opacity-90 transition-opacity cursor-pointer">
              <img
                src={image.src}
                alt={`Background image ${i + 1}`}
                className={`w-full ${image.height} object-cover rounded-lg shadow-sm`}
                loading="lazy"
              />
            </div>
          ))}
        </Masonry>
        
        
      
      </div>

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-20">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black">pexels</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff0000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" 
              alt="US Flag" 
              className="w-5 h-5"
            />
            <span className="text-black font-medium">English</span>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Join
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
          Welcome back.
        </h2>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700 font-medium">Log in with Google</span>
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42C11.81 5.46 12.26 4.3 13 3.5z"/>
              </svg>
            </button>
            
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or, log in with your email</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-left">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Log in
          </button>

                   <button onClick={handleregister}>Register</button>
        </div>
      </div>
    </div>
  );
}