import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Headers = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-gray-800 text-white border-b-2 border-gray-600">
      <div className="max-w-full px-6 flex justify-between items-center h-20">
        
        {/* Left Side - Logo and Restaurant Name */}
        <div className="flex items-center gap-4">
          {/* Modern Logo */}
          <Link to="/" className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-400 via-teal-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg relative overflow-hidden hover:scale-105 transition-transform duration-200">
              🥘
            </div>
            
            {/* Restaurant Name */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent m-0">
                CHUCKY
              </h1>
              <p className="text-xs text-gray-400 font-medium tracking-widest m-0">
                RESTAURANT
              </p>
            </div>
          </Link>
        </div>

        {/* Middle - Search Bar */}
        <div className="flex-1 max-w-md mx-10">
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full py-2 px-4 pl-10 text-gray-900 bg-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Right Side - Bell Icon, Profile Icon, Admin Name */}
        <div className="flex items-center gap-5">
          
          {/* Bell Icon - Notifications */}
          <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200">
            <span className="text-2xl">🔔</span>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            {/* Profile Icon */}
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-xl">
              👤
            </div>
            
            {/* Admin Name */}
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">
                Admin User
              </span>
              <span className="text-gray-400 text-xs">
                Manager
              </span>
            </div>

            {/* Dropdown Arrow */}
            <button className="text-gray-300 hover:text-white transition-colors duration-200 p-1">
              <span className="text-base">⌄</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Headers;
