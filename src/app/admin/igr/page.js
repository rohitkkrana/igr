"use client";
import React, { useState, useEffect } from 'react';
import Header from '../modules/Header';
import SearchContext from './context/SearchContext';
import SearchCom from './components/search';
import MainArea from './components/Main';

export default function Igr() {
  // State management for each property in the context
  const [city, setCity] = useState([]);
  const [productType, setProductType] = useState([]);
  const [micromarket, setMicromarket] = useState([]);
  const [pincode, setPincode] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [buildingName, setBuildingName] = useState([]);

  const [registrationdate, setRegistrationdate] = useState({
    min: '',
    max: '',
  });

  const [area, setArea] = useState({ min: '', max: '' });

  const [price, setPrice] = useState({ min: '', max: '' });

  const [agreementValue, setAgreementValue] = useState({
    min: '',
    max: '',
  });

  // Context value
  const contextValue = {
    city,
    setCity,
    productType,
    setProductType,
    micromarket,
    setMicromarket,
    pincode,
    setPincode,
    projectName,
    setProjectName,
    buildingName,
    setBuildingName,
    registrationdate,
    setRegistrationdate,
    area,
    setArea,
    price,
    setPrice,
    agreementValue,
    setAgreementValue,
  };

  const [isOpen, setIsOpen] = useState(true); // Drawer closed by default

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle drawer open/close
  };

  // Use useEffect to handle body scroll locking when the drawer is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll when the drawer is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Clean up on component unmount
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <SearchContext.Provider value={contextValue}>
      <Header />
      <div className="relative w-full h-[94vh] flex">
        {/* Main Content */}
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? 'ml-72 w-10/12' : 'ml-0 w-full' // Shift the content when the drawer is open
          }`}
        >
          <button
            className="p-2 bg-blue-500/[.33] text-white absolute"
            onClick={toggleDrawer}
            aria-label={isOpen ? 'Close Drawer' : 'Open Drawer'} // Added aria-label for better accessibility
          >
            {isOpen ? (
              <svg height="16" viewBox="0 0 8 8" width="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="white"
                  d="m4 0-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5z"
                  transform="translate(1)"
                />
              </svg>
            ) : (
              <svg height="16" viewBox="0 0 8 8" width="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="white"
                  d="m1.5 0-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4z"
                  transform="translate(1)"
                />
              </svg>
            )}
          </button>

          <div className="p-8">
            {/* Add more content */}
            <MainArea></MainArea>
          </div>
        </div>

        {/* Drawer */}
        <div
          className={`${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } absolute top-0 left-0 w-72 h-full bg-netural overflow-auto transition-transform duration-300 ease-in-out z-20`}
        >
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4">
              <SearchCom />
            </div>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}
