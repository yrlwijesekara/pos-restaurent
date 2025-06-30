import React, { useState } from 'react';
import { POPULAR_DISHES } from '../../constants/index1';

const PopularDishes = () => {
  const [selectedDish, setSelectedDish] = useState(null);
  
  console.log('PopularDishes component loaded');
  console.log('POPULAR_DISHES:', POPULAR_DISHES);

  const handleAddToOrder = (dish) => {
    console.log('Added to order:', dish);
  };

  const handleViewDetails = (dish) => {
    setSelectedDish(selectedDish?.id === dish.id ? null : dish);
  };

  // Fallback if POPULAR_DISHES is not available
  if (!POPULAR_DISHES || POPULAR_DISHES.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🔥</div>
        <p className="text-yellow-400 text-xl mb-2">No popular dishes found</p>
        <p className="text-gray-400">Check constants/index1.js</p>
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-white text-sm">Debug Info:</p>
          <p className="text-gray-300 text-xs">
            POPULAR_DISHES exists: {POPULAR_DISHES ? 'Yes' : 'No'}
          </p>
          <p className="text-gray-300 text-xs">
            Length: {POPULAR_DISHES ? POPULAR_DISHES.length : 'N/A'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">🔥</span>
          <h2 className="text-3xl font-bold text-white">Popular Dishes</h2>
        </div>
        <p className="text-lg text-gray-300">
          Customer favorites ({POPULAR_DISHES.length} items)
        </p>
      </div>

      {/* Popular Dishes List */}
      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide">
        {POPULAR_DISHES.map((dish, index) => (
          <div
            key={dish.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Rank Badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === 0 ? 'bg-yellow-600 text-yellow-100' :
                index === 1 ? 'bg-gray-400 text-gray-900' :
                index === 2 ? 'bg-orange-600 text-orange-100' :
                'bg-blue-600 text-blue-100'
              }`}>
                #{index + 1}
              </div>

              {/* Dish Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dish.image}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{dish.name}</h3>
                      <p className="text-sm text-gray-400">{dish.category}</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-green-400">${dish.price}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-green-400">
                    📈 {dish.numberOfOrders} orders
                  </span>
                  <span className="text-sm text-blue-400">
                    ⏱️ {dish.preparationTime}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    dish.isAvailable 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {dish.isAvailable ? '✅ Available' : '❌ Out of Stock'}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(dish)}
                    className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                  >
                    {selectedDish?.id === dish.id ? 'Hide Details' : 'View Details'}
                  </button>
                  {dish.isAvailable && (
                    <button
                      onClick={() => handleAddToOrder(dish)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                      ➕ Add
                    </button>
                  )}
                </div>

                {/* Expandable Details */}
                {selectedDish?.id === dish.id && (
                  <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-600">
                    <p className="text-sm text-gray-300 mb-2">{dish.description}</p>
                    <div className="text-xs text-gray-400">
                      <span>⏱️ {dish.preparationTime} • 📂 {dish.category}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-orange-900/30 border border-orange-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🔥</div>
          <p className="text-lg font-bold text-white">
            {POPULAR_DISHES.reduce((total, dish) => total + dish.numberOfOrders, 0)}
          </p>
          <p className="text-xs text-orange-300">Total Orders</p>
        </div>
        
        <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💰</div>
          <p className="text-lg font-bold text-white">
            ${POPULAR_DISHES.reduce((total, dish) => total + (dish.price * dish.numberOfOrders), 0).toLocaleString()}
          </p>
          <p className="text-xs text-green-300">Revenue Generated</p>
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
