import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Masonry = ({ children, breakpointCols, className }) => {
  const getColumns = () => {
    const cols =
      typeof breakpointCols === "object"
        ? breakpointCols.default || 3
        : breakpointCols || 3;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      const userdata = response.data;
      console.log("userdta", userdata);
      console.log("werghj", response);

      localStorage.setItem("user", JSON.stringify(userdata));

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const handlegoogle = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      console.log("decode", decoded);
      const response = await axiosInstance.post("/auth/login", {
        email: decoded.email,
        password: decoded.given_name,
      });
      const userdata = response.data;
      localStorage.setItem("user", JSON.stringify(userdata));
      navigate("/");
    } catch (error) {
      console.log("Google Login Failed:", error);
    }
  };

  const handleregister = () => {
    navigate("/register");
  };

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
            640: 2,
          }}
          className="p-2"
        >
          {[
            {
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
              height: "h-96",
            },
            {
              src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop",
              height: "h-80",
            },
            {
              src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop",
              height: "h-112",
            },
            {
              src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=650&fit=crop",
              height: "h-104",
            },
            {
              src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=450&fit=crop",
              height: "h-72",
            },
            {
              src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
              height: "h-96",
            },
            {
              src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop",
              height: "h-80",
            },
            {
              src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=700&fit=crop",
              height: "h-112",
            },
            {
              src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=550&fit=crop",
              height: "h-88",
            },
            {
              src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=600&fit=crop",
              height: "h-96",
            },
            {
              src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=480&fit=crop",
              height: "h-76",
            },
            {
              src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=650&fit=crop",
              height: "h-104",
            },
            {
              src: "https://images.unsplash.com/photo-1502780402662-acc01917949e?w=400&h=600&fit=crop",
              height: "h-96",
            },
            {
              src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=580&fit=crop",
              height: "h-92",
            },
            {
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=450&fit=crop",
              height: "h-72",
            },
            {
              src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop",
              height: "h-112",
            },
            {
              src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=550&fit=crop",
              height: "h-88",
            },
            {
              src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=620&fit=crop",
              height: "h-99",
            },
            {
              src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=480&fit=crop",
              height: "h-76",
            },
            {
              src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=650&fit=crop",
              height: "h-104",
            },
            {
              src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop",
              height: "h-80",
            },
            {
              src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=580&fit=crop",
              height: "h-92",
            },
            {
              src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=600&fit=crop",
              height: "h-96",
            },
            {
              src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=520&fit=crop",
              height: "h-83",
            },
          ].map((image, i) => (
            <div
              key={i}
              className="mb-4 opacity-75 hover:opacity-90 transition-opacity cursor-pointer"
            >
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

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">
          Welcome back.
        </h2>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center  h-1/2">
            <GoogleLogin
              onSuccess={handlegoogle}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>

          <div className="flex space-x-3"></div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">
            Or, log in with your email
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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

          <div className="text-left"></div>

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
