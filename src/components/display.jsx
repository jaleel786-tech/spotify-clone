import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Displayhome from './displayhome'
import Displayalbum from './displayalbum'
import { albumsData } from '../assets/assets'

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();

  // Corrected: Check if the pathname includes "album"
  const isAlbum = location.pathname.includes("album");

  // Corrected: More reliable ID extraction from URL
  const albumId = isAlbum ? location.pathname.split('/').pop() : null;

  // Safe lookup of background color
  const bgColor = albumId && albumsData[Number(albumId)]?.bgColor;

  useEffect(() => {
    if (isAlbum && bgColor && displayRef.current) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else if (displayRef.current) {
      displayRef.current.style.background = '#121212';
    }
  }, [location.pathname, bgColor, isAlbum]);

  return (
    <div
      ref={displayRef}
      className='w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0'
    >
      <Routes>
        <Route path='/' element={<Displayhome />} />
        <Route path='/album/:id' element={<Displayalbum />} />
      </Routes>
    </div>
  );
};

export default Display;
