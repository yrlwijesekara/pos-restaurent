import React from "react";

const Home = () => {
    return (
        <div 
            className="flex gap-1 bg-black overflow-hidden"
            style={{ height: 'calc(100vh - 5rem)' }}
        >
            {/* Left Section */}
            <div className="flex-1 bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🏠 Welcome to Chucky Restaurant
                    </h1>
                    <p className="text-xl text-gray-300">
                        Your modern Point of Sale system
                    </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Dashboard</h3>
                        <p className="text-gray-400">View sales analytics and reports</p>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700">
                        <div className="text-4xl mb-4">🍽️</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Menu Management</h3>
                        <p className="text-gray-400">Manage your restaurant menu items</p>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700">
                        <div className="text-4xl mb-4">📱</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Orders</h3>
                        <p className="text-gray-400">Process and track customer orders</p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        📈 Quick Stats
                    </h2>
                    <p className="text-lg text-gray-300">
                        Today's overview
                    </p>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-gray-800 border border-gray-600 text-white p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">Total Sales</h4>
                                <p className="text-3xl font-bold">$2,845</p>
                            </div>
                            <div className="text-4xl">💰</div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-600 text-white p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">Orders Today</h4>
                                <p className="text-3xl font-bold">47</p>
                            </div>
                            <div className="text-4xl">🛍️</div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-600 text-white p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">Active Tables</h4>
                                <p className="text-3xl font-bold">12</p>
                            </div>
                            <div className="text-4xl">🪑</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
