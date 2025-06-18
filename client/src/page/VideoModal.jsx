import { Download, Heart } from 'lucide-react';
import React from 'react';

function VideoModal({ video, onClose }) {
  console.log(video);
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          ✖
        </button>

        {/* Video */}
        <video
          src={video.url}
          controls
          className="rounded-lg w-full mb-4 h-96"
        />

        {/* Info */}
        <h2 className="text-xl font-semibold mb-1">{video.title}</h2>
        <p className="text-gray-700 mb-1">{video.description}</p>
        <p className="text-sm text-gray-500 mb-2">By: {video.uploadedBy}</p>

        {/* Actions */}
        <div className="flex space-x-4 mt-4">
          <a
            href={video.url}
            download
            className="flex items-center space-x-1 text-sm text-white bg-black px-4 py-2 rounded hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
          <button className="flex items-center space-x-1 text-sm text-black border border-black px-4 py-2 rounded hover:bg-gray-100">
            <Heart className="w-4 h-4" />
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
