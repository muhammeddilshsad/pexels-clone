
import React, { useState } from 'react';
import { Upload, Copy, Trash2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleImagesubmit } from '../Slice/ImageSlice';
const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    location: '',
    challenges: ''
  });
  const [showChallengesDropdown, setShowChallengesDropdown] = useState(false);

  const challengeOptions = [
    'Photography Challenge',
    'Travel Challenge',
    'Adventure Challenge',
    'Lifestyle Challenge',
    'Creative Challenge'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChallengeSelect = (challenge) => {
    setFormData(prev => ({
      ...prev,
      challenges: challenge
    }));
    setShowChallengesDropdown(false);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error('Please upload an image before submitting.');
      return;
    }

    const payload = new FormData();
    payload.append('imageUrl', imageFile);
    payload.append('title', formData.title);
    payload.append('tags', formData.tags);
    payload.append('category', formData.category);
 
    payload.append('photographer',formData)

    try {
     await dispatch(handleImagesubmit(payload))
     navigate('/')

    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-25">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Upload Section */}
            <div className="lg:w-1/2 p-6">
              <div className="relative">
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded content" 
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label
                    className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload size={48} className="text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center">
                      Click to upload an image
                      <br />
                      <span className="text-sm">JPG, PNG, GIF up to 10MB</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {selectedImage && (
                <div className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  ✓ Image uploaded successfully
                </div>
              )}
            </div>

           
            <div className="lg:w-1/2 p-6 space-y-6">
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-gray-400"></span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <Copy size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

       
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                description <span className="text-gray-400"></span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <Copy size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  category <span className="text-gray-400"></span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter a location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <Copy size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenges <span className="text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowChallengesDropdown(!showChallengesDropdown)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left bg-white flex items-center justify-between"
                  >
                    <span className={formData.challenges ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.challenges || 'Select challenges'}
                    </span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showChallengesDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showChallengesDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {challengeOptions.map((challenge, index) => (
                        <button
                          key={index}
                          onClick={() => handleChallengeSelect(challenge)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {challenge}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

             
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 outline-none"
              >
                Submit your content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
