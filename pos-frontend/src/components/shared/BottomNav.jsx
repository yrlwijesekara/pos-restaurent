import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHome, IoRestaurant } from 'react-icons/io5';
import { MdTableRestaurant, MdMenuBook } from 'react-icons/md';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiSolidDish, BiPlus } from 'react-icons/bi';
import OrderCreateModal from '../orders/OrderCreateModal';

const BottomNav = () => {
  const location = useLocation();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
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
      label: 'Create Order',
      isCenter: true,
      isOrderCreate: true
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
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
        <div className="flex justify-around items-center py-2 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            // Handle order creation button (center button)
            if (item.isOrderCreate) {
              return (
                <button
                  key={item.path}
                  onClick={() => setIsOrderModalOpen(true)}
                  className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg rounded-full justify-center flex items-center transition-all duration-200 hover:scale-110 group`}
                  title="Create New Order"
                >
                  <Icon className="text-3xl text-white group-hover:rotate-12 transition-transform duration-200" />
                </button>
              );
            }
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
                  active 
                    ? 'text-blue-400 bg-gray-800' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="text-2xl mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Order Creation Modal */}
      <OrderCreateModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
};

export default BottomNav;