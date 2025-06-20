import React, { useState } from "react";
import { Upload, Trash2, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleVideoSubmit } from "../Slice/videoSlice";


const VideoUpload = () => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    challenges: ""
  });
  const [showChallengesDropdown, setShowChallengesDropdown] = useState(false);

  const challengeOptions = [
    "Documentary",
    "Lifestyle",
    "Nature",
    "Travel",
    "Creative Video"
  ];

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChallengeSelect = (challenge) => {
    setFormData((prev) => ({
      ...prev,
      challenges: challenge,
    }));
    setShowChallengesDropdown(false);
  };


  

  const handleSubmit = async () => {
    if (!videoFile) {
      toast.error("Please upload a video before submitting.");
      return;
    }
    const payload = new FormData();
    payload.append("video", videoFile);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    payload.append("challenges", formData.challenges);

    try {
      await dispatch(handleVideoSubmit(payload));
      toast.success("Video uploaded successfully!");
      navigate("/videos");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-8">
       
        <div className="w-full">
          {videoPreview ? (
            <div className="relative">
              <video
                src={videoPreview}
                controls
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
              <button
                onClick={removeVideo}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Upload size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">
                Click to upload a video
                <br />
                <span className="text-sm">MP4, MOV, etc. up to 100MB</span>
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              placeholder="Enter video description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Challenges</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowChallengesDropdown(!showChallengesDropdown)}
                className="w-full px-4 py-3 border rounded-lg bg-white flex justify-between items-center"
              >
                <span className={formData.challenges ? "text-gray-900" : "text-gray-500"}>
                  {formData.challenges || "Select challenges"}
                </span>
                <ChevronDown size={16} />
              </button>

              {showChallengesDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
                  {challengeOptions.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleChallengeSelect(item)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
