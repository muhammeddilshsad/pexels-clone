import { Download, Heart } from "lucide-react";
import React, { useState } from "react";

function MasnoryModal({ image, onClose }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  
  const handleDownload = async (image) => {
    try {
      const response = await fetch(image.imageUrl, {
        mode: "cors",
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${image.title || "pexels-image"}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  console.log(image);
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex  items-center justify-center">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 h- relative">
  
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          ✖
        </button>

        <img
          src={image.imageUrl}
          alt={image.title}
          className="rounded-lg w-full mb-4 h-96"
        />

        <h2 className="text-xl font-semibold mb-1">{image.title}</h2>
        <p className="text-gray-700 mb-1">{image.description}</p>
        <p className="text-sm text-gray-500 mb-2">By:{image.photographer}</p>
       
       
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => handleDownload(image)}
            className="flex items-center space-x-1 text-sm text-white bg-black px-4 py-2 rounded hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleLikeToggle}
            className={`flex items-center space-x-1 text-sm px-4 py-2 rounded border ${
              liked
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-black text-black hover:bg-gray-100"
            }`}
          >
             <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            <span>{liked ? "Liked" : "Like"}</span>
            <span>({likesCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MasnoryModal;
