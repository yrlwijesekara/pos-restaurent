import React from 'react';
import { BiDollar, BiUser, BiTable } from 'react-icons/bi';

const OrderList = ({ orders, getStatusColor, getStatusIcon }) => {
  const handleOrderClick = (orderId) => {
    console.log('View order details:', orderId);
    // In a real app, this would navigate to order details or open a modal
  };

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleOrderClick(order.id)}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 hover:bg-gray-750 transition-all duration-200 cursor-pointer"
        >
          {/* Order Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">{order.id}</span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            <span className="text-xl font-bold text-green-400">${order.total}</span>
          </div>

          {/* Customer and Table Info */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <BiUser className="text-gray-400" />
              <span className="text-sm text-gray-300">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <BiTable className="text-gray-400" />
              <span className="text-sm text-gray-300">{order.tableNumber}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {order.items.map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Order Time */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{order.time}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOrderClick(order.id);
              }}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              View Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
