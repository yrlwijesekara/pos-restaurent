import React from "react";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
    return (
        <div 
            className="flex gap-6 bg-black p-6 min-h-screen overflow-auto scrollbar-hide"
            style={{ height: 'calc(100vh - 5rem)' }}
        >
            {/* Left Section - Greetings and Feature Cards */}
            <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide">
                {/* Greetings Component */}
                <Greetings />
                
                {/* Mini Cards for Key Metrics */}
                <MiniCard />
                
                {/* Recent Orders */}
                <RecentOrders />
                
                {/* Feature Cards */}
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        🚀 Quick Actions
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                        
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                            <div className="text-3xl mb-3">🍽️</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Menu Management</h3>
                            <p className="text-gray-400 text-sm">Manage your restaurant menu items</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                            <div className="text-3xl mb-3">📱</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Process Orders</h3>
                            <p className="text-gray-400 text-sm">Handle customer orders efficiently</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                            <div className="text-3xl mb-3">🍷</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Inventory</h3>
                            <p className="text-gray-400 text-sm">Track stock and manage supplies</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                            <div className="text-3xl mb-3">👥</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Staff Management</h3>
                            <p className="text-gray-400 text-sm">Manage employees and schedules</p>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Customer Feedback</h3>
                            <p className="text-gray-400 text-sm">View reviews and ratings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Popular Dishes */}
            <div className="flex-1 bg-gray-900 rounded-2xl shadow-lg p-6 overflow-y-auto scrollbar-hide">
                <PopularDishes />
            </div>
        </div>
    );
};

export default Home;
