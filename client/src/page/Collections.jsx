import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetch } from '../Slice/ImageSlice';
import MasnoryGrid from './Masnorygrid';
import { ChevronDown } from 'lucide-react';
import PexelsNavbar from './navbar';

function Collections() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(()=>{
        dispatch(fetch())
    },[])

     const {loading, error, image,serchedImage} = useSelector((state) => state.images);

     const handleImageClick = (img) => {
        setSelectedImage(img);
      };


  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>


<div className="bg-white text-black">

        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <MasnoryGrid
              images={serchedImage.length > 0 ? serchedImage : image}
              onclick={handleImageClick}
            />
          )}
        </div>
      </div>
      {selectedImage && (
        <MasnoryModal image={selectedImage} onClose={handleCloseModal} />
      )}
        
        
      
    </div>
  )
}

export default Collections
