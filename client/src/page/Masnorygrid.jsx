import { Download, Heart } from "lucide-react";
import React, { useState } from "react";

function MasnoryGrid({ images, onclick }) {
  const [ setImageHeights] = useState({});

  const handleImageLoad = (imageId, height) => {
    setImageHeights((prev) => ({ ...prev, [imageId]: height }));
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 sl:columns-4 gap-6 space-y-6">
      {images.map((image) => (
        <div key={image._id} className="break-inside-avoid mb-6">
          <div
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-sl transition-all duration-300"
            onClick={() => onclick(image)}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={(e) => handleImageLoad(image._id, e.target.naturalHeight)}
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-md transition-colors">
                <Heart className="w-4 h-4 text-gray-700" />
              </button>
              <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-md transition-colors">
                <Download className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white font-semibold text-sm mb-1">
                {image.title}
              </h3>
              <p className="text-white/80 text-xs mb-2">{image.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/90 text-xs">
                  by {image.uploadedBy?.name}
                </span>
                <div className="flex items-center space-x-3 text-white/80 text-xs">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {image.likes}
                  </span>
                  <span className="flex items-center">
                    <Download className="w-3 h-3 mr-1" />
                    {image.downloads}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MasnoryGrid;
