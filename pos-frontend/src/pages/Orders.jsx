import React from "react";

const Orders = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        📱 Orders Management
                    </h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        + New Order
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sample Order Cards */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                Completed
                            </span>
                            <span className="text-gray-500 text-sm">#001</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Table 5</h3>
                        <p className="text-gray-600 text-sm mb-3">2x Burger, 1x Fries, 2x Coke</p>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">$24.99</span>
                            <span className="text-gray-500 text-xs">12:30 PM</span>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                                Pending
                            </span>
                            <span className="text-gray-500 text-sm">#002</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Table 12</h3>
                        <p className="text-gray-600 text-sm mb-3">1x Pizza, 1x Salad, 1x Water</p>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">$18.50</span>
                            <span className="text-gray-500 text-xs">1:15 PM</span>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                Preparing
                            </span>
                            <span className="text-gray-500 text-sm">#003</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Table 8</h3>
                        <p className="text-gray-600 text-sm mb-3">3x Pasta, 2x Wine, 1x Dessert</p>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">$45.75</span>
                            <span className="text-gray-500 text-xs">1:45 PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
