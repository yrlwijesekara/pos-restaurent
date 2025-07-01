import React, { useState } from 'react';
import { FiClock, FiUser, FiDollarSign, FiPackage, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const OrderCard = ({ order, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'bg-green-900 text-green-100 border-green-700';
      case 'in progress':
        return 'bg-yellow-900 text-yellow-100 border-yellow-700';
      case 'completed':
        return 'bg-blue-900 text-blue-100 border-blue-700';
      default:
        return 'bg-gray-700 text-gray-100 border-gray-600';
    }
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) {
      onClick(order);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-4 overflow-hidden">
      {/* Main Card Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <FiPackage className="text-white text-xl" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-300 flex items-center mt-1">
                <FiUser className="mr-1" />
                {order.customerName || 'Table ' + order.tableNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
            <div className="text-right">
              <p className="text-xl font-bold text-white flex items-center">
                <FiDollarSign className="text-sm" />
                {order.total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 flex items-center mt-1">
                <FiClock className="mr-1" />
                {formatTime(order.timestamp)}
              </p>
            </div>
            {isExpanded ? (
              <FiChevronUp className="text-gray-400 text-lg" />
            ) : (
              <FiChevronDown className="text-gray-400 text-lg" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-600 bg-gray-900">
          <div className="p-6">
            <h4 className="font-medium text-white mb-4 text-lg">Order Details</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-100 text-lg">{item.name}</p>
                    {item.customizations && (
                      <p className="text-sm text-gray-400 mt-1">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-gray-300 text-lg">x{item.quantity}</span>
                    <span className="font-medium text-white text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-300 text-lg">Subtotal:</span>
                <span className="text-white text-lg">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 text-lg">Tax:</span>
                  <span className="text-white text-lg">${order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-xl border-t border-gray-600 pt-3">
                <span className="text-white">Total:</span>
                <span className="text-white">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm">Order Time:</p>
                <p className="font-medium text-gray-200 text-lg">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>
              {order.estimatedTime && (
                <div>
                  <p className="text-gray-400 text-sm">Estimated Ready:</p>
                  <p className="font-medium text-gray-200 text-lg">{order.estimatedTime}</p>
                </div>
              )}
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="mt-6">
                <p className="text-gray-400 text-sm mb-2">Special Instructions:</p>
                <p className="text-gray-100 bg-yellow-900 bg-opacity-30 p-3 rounded border border-yellow-700 text-lg">
                  {order.specialInstructions}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;