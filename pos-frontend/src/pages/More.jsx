import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSettings, IoPersonCircle, IoLogOut, IoStatsChart, IoHelpCircle, IoNotifications } from 'react-icons/io5';
import { MdInventory, MdPayments, MdRestaurant } from 'react-icons/md';
import { BiSolidDish } from 'react-icons/bi';

const More = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon: BiSolidDish,
      title: 'View Menu',
      description: 'Browse food and beverage menu',
      action: () => navigate('/menu')
    },
    {
      icon: IoPersonCircle,
      title: 'Profile',
      description: 'Manage your account settings',
      action: () => console.log('Profile clicked')
    },
    {
      icon: IoSettings,
      title: 'Settings',
      description: 'App preferences and configuration',
      action: () => console.log('Settings clicked')
    },
    {
      icon: IoStatsChart,
      title: 'Analytics',
      description: 'View sales reports and statistics',
      action: () => console.log('Analytics clicked')
    },
    {
      icon: MdInventory,
      title: 'Inventory',
      description: 'Manage stock and ingredients',
      action: () => console.log('Inventory clicked')
    },
    {
      icon: MdPayments,
      title: 'Payments',
      description: 'Payment methods and history',
      action: () => console.log('Payments clicked')
    },
    {
      icon: MdRestaurant,
      title: 'Menu Management',
      description: 'Edit menu items and categories',
      action: () => console.log('Menu Management clicked')
    },
    {
      icon: IoNotifications,
      title: 'Notifications',
      description: 'Manage notification preferences',
      action: () => console.log('Notifications clicked')
    },
    {
      icon: IoHelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      action: () => console.log('Help clicked')
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">More</h1>
        <p className="text-gray-400">Additional features and settings</p>
      </div>

      {/* Menu Items Grid */}
      <div className="grid gap-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className="flex items-start p-4 bg-gray-900 rounded-xl border border-gray-800 hover:bg-gray-800 hover:border-gray-700 transition-all duration-200 text-left"
            >
              <div className="flex-shrink-0 mr-4">
                <Icon className="text-2xl text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <svg 
                  className="w-5 h-5 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <button
          onClick={() => console.log('Logout clicked')}
          className="flex items-center justify-center w-full p-4 bg-red-900 hover:bg-red-800 rounded-xl border border-red-700 transition-all duration-200"
        >
          <IoLogOut className="text-xl text-red-400 mr-3" />
          <span className="text-lg font-semibold text-red-400">Logout</span>
        </button>
      </div>

      {/* App Version */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Restaurant POS v1.0.0
        </p>
      </div>
    </div>
  );
};

export default More;
