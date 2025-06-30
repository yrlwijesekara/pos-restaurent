import React from "react";
import Greetings from "../components/home/Greetings";

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
                
                {/* Feature Cards */}
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        🚀 Quick Actions
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Dashboard</h3>
                            <p className="text-gray-400 text-sm">View sales analytics and reports</p>
                        </div>
                        
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

            {/* Right Section - Quick Stats */}
            <div className="flex-1 bg-gray-900 rounded-2xl shadow-lg p-6 overflow-y-auto scrollbar-hide">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        📈 Today's Performance
                    </h2>
                    <p className="text-lg text-gray-300">
                        Real-time business metrics
                    </p>
                </div>
                
                <div className="space-y-4 pb-4">
                    <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-700 text-white p-6 rounded-xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold text-green-300">Total Sales</h4>
                                <p className="text-3xl font-bold">$2,845.50</p>
                                <p className="text-sm text-green-400">+12% from yesterday</p>
                            </div>
                            <div className="text-4xl">💰</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700 text-white p-6 rounded-xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold text-blue-300">Orders Completed</h4>
                                <p className="text-3xl font-bold">47</p>
                                <p className="text-sm text-blue-400">3 pending orders</p>
                            </div>
                            <div className="text-4xl">🛍️</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-700 text-white p-6 rounded-xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold text-purple-300">Active Tables</h4>
                                <p className="text-3xl font-bold">12/20</p>
                                <p className="text-sm text-purple-400">8 tables available</p>
                            </div>
                            <div className="text-4xl">🪑</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-900/50 to-orange-800/50 border border-orange-700 text-white p-6 rounded-xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold text-orange-300">Average Order</h4>
                                <p className="text-3xl font-bold">$60.50</p>
                                <p className="text-sm text-orange-400">+5% increase</p>
                            </div>
                            <div className="text-4xl">📊</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 border border-indigo-700 text-white p-6 rounded-xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold text-indigo-300">Customer Satisfaction</h4>
                                <p className="text-3xl font-bold">4.8★</p>
                                <p className="text-sm text-indigo-400">Based on 127 reviews</p>
                            </div>
                            <div className="text-4xl">⭐</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-700 text-white p-6 rounded-xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold text-red-300">Peak Hours</h4>
                                <p className="text-3xl font-bold">7-9 PM</p>
                                <p className="text-sm text-red-400">Busiest time today</p>
                            </div>
                            <div className="text-4xl">⏰</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
