import { Upload, Trash2, ChevronDown, Image, Video } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleVideoSubmit } from "../Slice/videoSlice";
import { handleImagesubmit } from "../Slice/ImageSlice";
import toast from "react-hot-toast";
import Mynavbar from "./mynavbar";

const MediaUpload = ({ type = "image" }) => {
  const isVideo = type === "video";
  
  
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    challenges: "",
    photographer: "",
  });
  const [showChallengesDropdown, setShowChallengesDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const challengeOptions = [
    "Documentary",
    "Lifestyle",
    "Nature",
    "Travel",
    "Creative Challenge",
  ];

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile));
      setUploadCount((prev) => prev + 1);
    }
  };

  const handleFileSelect = (event) => {
    const uploadedFile = event.target.files[0];
    handleFileUpload(uploadedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (isVideo
        ? droppedFile.type.startsWith("video/")
        : droppedFile.type.startsWith("image/"))
    ) {
      handleFileUpload(droppedFile);
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
    if (!file) {
      toast.error(
        `Please upload a ${
          isVideo ? "video" : "file (image)"
        } before submitting.`
      );
      return;
    }

    const payload = new FormData();
    payload.append(isVideo ? "url" : "imageUrl", file);
    payload.append("title", formData.title);
    payload.append("category", formData.category);
    payload.append("challenges", formData.challenges);
    if (!isVideo) {
      payload.append("photographer", formData.photographer);
    }

    try {
      await dispatch(
        isVideo ? handleVideoSubmit(payload) : handleImagesubmit(payload)
      );
      toast.success(`${isVideo ? "Video" : "Image"} uploaded successfully!`);
      navigate(isVideo ? "/videos" : "/");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  return (
    <>
      <Mynavbar />
      <div className="min-h-full bg-gray-50 flex justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8">
          
          <div className="text-center mb-12">
            <h1 className="text-3xl font-medium text-gray-900 mb-4">
              Share your {isVideo ? "videos" : "photos"} and videos, and let the
              world love them.
            </h1>
            <p className="text-gray-600 text-lg">
              Share your first 50 {isVideo ? "videos" : "photos"} or videos to
              introduce yourself to millions of users.
            </p>
            <div className="text-right mt-4">
              <span className="text-gray-400 text-sm">({uploadCount}/50)</span>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-8">
            {filePreview ? (
              <div className="relative mb-6">
                {isVideo ? (
                  <video
                    src={filePreview}
                    controls
                    className="w-full h-64 object-cover rounded-xl shadow-sm"
                  />
                ) : (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl shadow-sm"
                  />
                )}
                <button
                  onClick={removeFile}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center mb-6">
                {/* Icon Display */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <Image className="text-green-500" size={24} />
                    </div>
                    <div className="w-20 h-16 bg-green-200 rounded-xl flex items-center justify-center">
                      <Image className="text-green-600" size={28} />
                    </div>
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <Video className="text-green-500" size={24} />
                    </div>
                  </div>
                </div>

                {/* Upload Text */}
                <h2 className="text-2xl font-medium text-gray-900 mb-2">
                  Drag and drop
                </h2>
                <p className="text-xl text-gray-900 mb-6">to upload, or</p>

                {/* Browse Button and Upload Area */}
                <label
                  className={`relative block w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                    isDragOver
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                    >
                      Browse
                    </button>
                    <p className="text-gray-500 text-sm mt-2">
                      {isVideo
                        ? "MP4, MOV up to 100MB"
                        : "JPG, PNG, GIF up to 10MB"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept={isVideo ? "video/*" : "image/*"}
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Form Fields */}
          {(filePreview || file) && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
              />

              <input
                type="text"
                placeholder="Tags"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
              />

              <input
                type="text"
                placeholder="Loaction"
                value={formData.photographer}
                onChange={(e) =>
                  handleInputChange("photographer", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setShowChallengesDropdown(!showChallengesDropdown)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white flex justify-between items-center focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                >
                  <span
                    className={
                      formData.challenges ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {formData.challenges || "Select challenges"}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {showChallengesDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    {challengeOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleChallengeSelect(item)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-medium transition-colors text-lg"
              >
                Submit {isVideo ? "Video" : "Image"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaUpload;


