import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserUploads } from "../Slice/ProfileSlice";

const Gallery = () => {
  const { images = [], videos = [], loading, error } = useSelector((state) => state.profile);
  console.log(images)
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getUserUploads());
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-center text-gray-500">Loading uploads...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[400px]">
      <h2 className="text-xl font-bold mb-4">My Gallery</h2>

  
      {images.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img._id} className="group relative">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-48 object-cover rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
                />
                <div className="absolute inset-0 group-hover:bg-opacity-20 transition-opacity rounded flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    
      {videos.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Videos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((vid) => (
              <div key={vid._id} className="group relative">
                <video
                  controls
                  src={vid.url}
                  className="w-full h-48 object-cover rounded shadow hover:shadow-lg transition-shadow"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  Video
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      

      {images.length === 0 && videos.length === 0 && !loading && (
        <div className="flex items-center justify-center h-64 text-center text-gray-500">
          <div>
            <svg 
              className="w-16 h-16 mx-auto mb-4 text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-lg font-medium">No uploads yet</p>
            <p className="text-sm mt-2">
              Start by uploading your first photo or video
            </p>
          </div>
        </div>
      )}


      {(images.length > 0 || videos.length > 0) && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <span>{images.length} Image{images.length !== 1 ? 's' : ''}</span>
            <span>{videos.length} Video{videos.length !== 1 ? 's' : ''}</span>
            <span>{images.length + videos.length} Total</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;