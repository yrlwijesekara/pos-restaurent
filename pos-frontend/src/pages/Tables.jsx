import React from "react";

const Tables = () => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">
                        🪑 Table Management
                    </h1>
                    <p className="text-lg text-gray-300">
                        Manage restaurant tables and reservations
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((table) => (
                        <div key={table} className="bg-gray-800 border border-gray-600 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">🪑</div>
                            <h3 className="text-white font-semibold mb-1">Table {table}</h3>
                            <span className={`px-2 py-1 rounded text-xs ${
                                table % 3 === 0 
                                    ? 'bg-red-500 text-white' 
                                    : table % 2 === 0 
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-green-500 text-white'
                            }`}>
                                {table % 3 === 0 ? 'Occupied' : table % 2 === 0 ? 'Reserved' : 'Available'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tables;
