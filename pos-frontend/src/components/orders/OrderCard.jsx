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
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-4 overflow-hidden">
      {/* Main Card Header */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FiPackage className="text-white text-lg" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-300 flex items-center">
                <FiUser className="mr-1" />
                {order.customerName || 'Table ' + order.tableNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
            <div className="text-right">
              <p className="text-lg font-bold text-white flex items-center">
                <FiDollarSign className="text-sm" />
                {order.total.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 flex items-center">
                <FiClock className="mr-1" />
                {formatTime(order.timestamp)}
              </p>
            </div>
            {isExpanded ? (
              <FiChevronUp className="text-gray-400" />
            ) : (
              <FiChevronDown className="text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-600 bg-gray-900">
          <div className="p-4">
            <h4 className="font-medium text-white mb-3">Order Details</h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-100">{item.name}</p>
                    {item.customizations && (
                      <p className="text-sm text-gray-400">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300">x{item.quantity}</span>
                    <span className="font-medium text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="mt-4 pt-4 border-t border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Tax:</span>
                  <span className="text-white">${order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-lg border-t border-gray-600 pt-2">
                <span className="text-white">Total:</span>
                <span className="text-white">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Order Time:</p>
                <p className="font-medium text-gray-200">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>
              {order.estimatedTime && (
                <div>
                  <p className="text-gray-400">Estimated Ready:</p>
                  <p className="font-medium text-gray-200">{order.estimatedTime}</p>
                </div>
              )}
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm">Special Instructions:</p>
                <p className="text-gray-100 bg-yellow-900 bg-opacity-30 p-2 rounded border border-yellow-700 mt-1">
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