import React from 'react';
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import { BiDollar, BiTime, BiStats } from 'react-icons/bi';
import { MdPendingActions } from 'react-icons/md';

const MiniCard = () => {
  // Sample data - in a real app, this would come from props or state management
  const todayEarnings = 2845.50;
  const yesterdayEarnings = 2540.25;
  const earningsChange = todayEarnings - yesterdayEarnings;
  const earningsPercentage = ((earningsChange / yesterdayEarnings) * 100).toFixed(1);
  const inProgressOrders = 8;
  const completedToday = 47;

  const isPositiveChange = earningsChange > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Today's Earnings Card */}
      <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-700/50 rounded-xl p-4 hover:border-green-600/70 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600/30 rounded-lg">
              <BiDollar className="text-2xl text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-300">Today's Earnings</h3>
              <p className="text-2xl font-bold text-white">${todayEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {/* Comparison with yesterday */}
        <div className="mt-3 flex items-center gap-2">
          {isPositiveChange ? (
            <IoTrendingUp className="text-green-400 text-lg" />
          ) : (
            <IoTrendingDown className="text-red-400 text-lg" />
          )}
          <span className={`text-sm font-medium ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
            {isPositiveChange ? '+' : ''}{earningsPercentage}% vs yesterday
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Yesterday: ${yesterdayEarnings.toLocaleString()}
        </p>
      </div>

      {/* In Progress Orders Card */}
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-xl p-4 hover:border-blue-600/70 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/30 rounded-lg">
              <MdPendingActions className="text-2xl text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-300">In Progress</h3>
              <p className="text-2xl font-bold text-white">{inProgressOrders}</p>
            </div>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-blue-300">Active orders</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Completed today: {completedToday}
        </p>
      </div>

      {/* Average Order Value Card */}
      <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-700/50 rounded-xl p-4 hover:border-purple-600/70 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/30 rounded-lg">
              <BiStats className="text-2xl text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-purple-300">Avg Order</h3>
              <p className="text-2xl font-bold text-white">$60.50</p>
            </div>
          </div>
        </div>
        
        {/* Trend */}
        <div className="mt-3 flex items-center gap-2">
          <IoTrendingUp className="text-green-400 text-lg" />
          <span className="text-sm font-medium text-green-400">+5.2% increase</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          From last week
        </p>
      </div>

      {/* Peak Time Card */}
      <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border border-orange-700/50 rounded-xl p-4 hover:border-orange-600/70 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600/30 rounded-lg">
              <BiTime className="text-2xl text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-orange-300">Peak Time</h3>
              <p className="text-2xl font-bold text-white">7-9 PM</p>
            </div>
          </div>
        </div>
        
        {/* Current status */}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          <span className="text-sm text-orange-300">Current: Moderate</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Next peak in 3 hours
        </p>
      </div>
    </div>
  );
};

export default MiniCard;
