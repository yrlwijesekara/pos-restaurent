import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Tables = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-full mx-auto">
                {/* Stylish Header with Back Button */}
                <div className="mb-8 relative">
                    {/* Back Button - Eye-catching */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute left-0 top-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group transform hover:scale-105"
                    >
                        <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    {/* Header Content */}
                    <div className="text-center pt-4">
                        <div className="relative inline-block">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                                Tables
                            </h1>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                        </div>
                        <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                            Manage and monitor table reservations and availability
                        </p>
                    </div>
                </div>

                {/* Tables Content */}
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Tables Management</h2>
                    <p className="text-gray-400">Table management functionality coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default Tables;
