import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHome, IoRestaurant } from 'react-icons/io5';
import { MdTableRestaurant } from 'react-icons/md';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiSolidDish } from 'react-icons/bi';

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    {
      path: '/',
      icon: IoHome,
      label: 'Home'
    },
    {
      path: '/orders',
      icon: IoRestaurant,
      label: 'Orders'
    },
    {
      path: '/menu',
      icon: BiSolidDish,
      label: 'Menu',
      isCenter: true
    },
    {
      path: '/tables',
      icon: MdTableRestaurant,
      label: 'Tables'
    },
    {
      path: '/more',
      icon: HiDotsHorizontal,
      label: 'More'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
      <div className="flex justify-around items-center py-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
                item.isCenter 
                  ? `absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full justify-center ${
                      active ? 'bg-blue-700' : ''
                    }`
                  : active 
                    ? 'text-blue-400 bg-gray-800' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className={`${item.isCenter ? 'text-3xl text-white' : 'text-2xl mb-1'}`} />
              {!item.isCenter && <span className="text-xs font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;