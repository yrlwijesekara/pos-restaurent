import React, { useState, useEffect } from 'react';
import { IoSunny, IoMoon, IoPartlySunny } from 'react-icons/io5';
import { BiTime } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md';

const Greetings = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour < 12) {
      return {
        greeting: "Good Morning",
        message: "Start your day with excellent service!",
        icon: IoSunny,
        color: "text-yellow-400"
      };
    } else if (hour < 17) {
      return {
        greeting: "Good Afternoon",
        message: "Keep up the great work today!",
        icon: IoPartlySunny,
        color: "text-orange-400"
      };
    } else {
      return {
        greeting: "Good Evening",
        message: "Finish strong and serve with pride!",
        icon: IoMoon,
        color: "text-blue-400"
      };
    }
  };

  // Format date
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const { greeting, message, icon: GreetingIcon, color } = getGreeting();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
      {/* Greeting Header */}
      <div className="flex items-center gap-3 mb-4">
        <GreetingIcon className={`text-3xl ${color}`} />
        <div>
          <h2 className="text-2xl font-bold text-white">{greeting}!</h2>
          <p className="text-sm text-gray-400">Welcome back to Chucky Restaurant</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mb-6">
        <p className="text-lg text-gray-200 font-medium leading-relaxed">
          {message}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          "Excellence in service creates memorable experiences"
        </p>
      </div>

      {/* Date and Time Display */}
      <div className="space-y-3">
        {/* Date */}
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
          <MdDateRange className="text-xl text-green-400" />
          <div>
            <p className="text-sm text-gray-400">Today's Date</p>
            <p className="text-white font-semibold">{formatDate(currentTime)}</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
          <BiTime className="text-xl text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Current Time</p>
            <p className="text-white font-semibold text-lg">{formatTime(currentTime)}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats or Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-700/50">
        <h3 className="text-sm font-semibold text-blue-300 mb-2">💡 Today's Focus</h3>
        <p className="text-sm text-gray-300">
          Deliver exceptional customer service and maintain quality standards in every order.
        </p>
      </div>
    </div>
  );
};

export default Greetings;
