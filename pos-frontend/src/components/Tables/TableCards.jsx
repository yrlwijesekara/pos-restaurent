import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClock, FiMapPin, FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import { BiSolidDish } from 'react-icons/bi';

const TableCards = ({ table, onBook, onCancel, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookingData, setBookingData] = useState({
    customerName: '',
    phone: '',
    guests: 1,
    time: '',
    date: '',
    notes: ''
  });
  const [editData, setEditData] = useState({
    number: table.number,
    capacity: table.capacity,
    location: table.location,
    type: table.type,
    features: table.features || []
  });

  // Auto-check for booking time arrival
  useEffect(() => {
    const checkBookingTime = () => {
      if (table.bookings && table.bookings.length > 0) {
        const now = new Date();
        const currentTime = now.getTime();
        
        table.bookings.forEach((booking, index) => {
          const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
          const bookingTime = bookingDateTime.getTime();
          const timeDiff = Math.abs(currentTime - bookingTime) / (1000 * 60); // difference in minutes
          
          // If booking time is within 15 minutes (before or after)
          if (timeDiff <= 15 && booking.status === 'confirmed') {
            // Show notification or auto-navigate
            const shouldAutoNavigate = window.confirm(
              `Table ${table.number}: ${booking.customerName}'s booking time has arrived (${formatTime(booking.time)}). Go to menu now?`
            );
            
            if (shouldAutoNavigate) {
              handleCustomerArrival(booking);
            }
          }
        });
      }
    };

    // Check immediately and then every minute
    checkBookingTime();
    const interval = setInterval(checkBookingTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [table.bookings]);

  // Helper function to get current active booking
  const getCurrentActiveBooking = () => {
    if (!table.bookings || table.bookings.length === 0) return null;
    
    const now = new Date();
    const currentTime = now.getTime();
    
    return table.bookings.find(booking => {
      const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
      const bookingTime = bookingDateTime.getTime();
      const timeDiff = Math.abs(currentTime - bookingTime) / (1000 * 60);
      
      return timeDiff <= 15; // Within 15 minutes
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-900 text-green-100 border-green-700';
      case 'booked':
        return 'bg-red-900 text-red-100 border-red-700';
      case 'occupied':
        return 'bg-yellow-900 text-yellow-100 border-yellow-700';
      default:
        return 'bg-gray-700 text-gray-100 border-gray-600';
    }
  };

  const handleBooking = () => {
    if (table.status === 'available' || (table.status === 'booked' && table.bookings)) {
      setShowBookingForm(true);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Check for time conflicts with existing bookings
    if (table.bookings && table.bookings.length > 0) {
      const selectedTime = new Date(`${bookingData.date}T${bookingData.time}`);
      const conflictExists = table.bookings.some(booking => {
        const bookingTime = new Date(`${booking.date}T${booking.time}`);
        const timeDiff = Math.abs(selectedTime - bookingTime) / (1000 * 60); // difference in minutes
        return timeDiff < 120; // 2-hour minimum gap between bookings
      });
      
      if (conflictExists) {
        alert('Time conflict! Please choose a time at least 2 hours apart from existing bookings.');
        return;
      }
    }

    // Add booking ID and status for multiple bookings
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onBook(table.id, newBooking);
    setShowBookingForm(false);
    setBookingData({
      customerName: '',
      phone: '',
      guests: 1,
      time: '',
      date: '',
      notes: ''
    });
  };

  const handleEditTable = () => {
    setShowEditForm(true);
    setEditData({
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      type: table.type,
      features: table.features || []
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(table.id, editData);
    setShowEditForm(false);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setEditData({
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      type: table.type,
      features: table.features || []
    });
  };

  const handleDeleteTable = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(table.id);
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // Navigation functions for menu access
  const handleGoToMenu = () => {
    const tableInfo = {
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      status: table.status
    };

    navigate('/menu', {
      state: {
        tableInfo: tableInfo,
        customerInfo: null
      }
    });
  };

  const handleCustomerArrival = (booking) => {
    const tableInfo = {
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      status: 'occupied'
    };

    const customerInfo = {
      name: booking.customerName,
      mobile: booking.phone,
      guests: booking.guests,
      bookingTime: booking.time,
      bookingDate: booking.date
    };

    navigate('/menu', {
      state: {
        tableInfo: tableInfo,
        customerInfo: customerInfo,
        isCustomerArrival: true
      }
    });
  };

  const handleWalkInOrder = () => {
    const tableInfo = {
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      status: 'occupied'
    };

    navigate('/menu', {
      state: {
        tableInfo: tableInfo,
        customerInfo: null,
        isWalkIn: true
      }
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
      {/* Main Card */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              getCurrentActiveBooking() ? 'bg-green-600 animate-pulse' : 'bg-blue-600'
            }`}>
              <FiMapPin className="text-white text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-white">
                  Table {table.number}
                </h3>
                {getCurrentActiveBooking() && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    🔔 Customer Time!
                  </span>
                )}
              </div>
              <p className="text-gray-400 flex items-center">
                <FiUsers className="mr-1" />
                {table.capacity} seats
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                table.status
              )}`}
            >
              {table.status}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={handleEditTable}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit Table"
              >
                <FiEdit className="text-lg" />
              </button>
              <button
                onClick={handleDeleteTable}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete Table"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white font-medium">{table.location}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Type</p>
            <p className="text-white font-medium">{table.type}</p>
          </div>
        </div>

        {/* Booking Info (if booked) */}
        {table.status !== 'available' && (table.currentBooking || table.bookings) && (
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            {/* Multiple Bookings Display */}
            {table.bookings && table.bookings.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">Today's Bookings</h4>
                  <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                    {table.bookings.length} booking{table.bookings.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {table.bookings
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((booking, index) => {
                      const now = new Date();
                      const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
                      const timeDiff = Math.abs(now - bookingDateTime) / (1000 * 60); // difference in minutes
                      
                      const isActive = timeDiff <= 15 && booking.status === 'confirmed'; // Within 15 minutes
                      const isPast = bookingDateTime < now && timeDiff > 15;
                      const isUpcoming = bookingDateTime > now && timeDiff > 15;
                      
                      return (
                        <div 
                          key={booking.id || index} 
                          className={`p-3 rounded-lg border-l-4 ${
                            isActive 
                              ? 'bg-green-900/30 border-green-400 ring-2 ring-green-400/50' 
                              : isPast 
                                ? 'bg-gray-800/50 border-gray-600' 
                                : 'bg-blue-900/20 border-blue-500'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{booking.customerName}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                isActive 
                                  ? 'bg-green-500 text-white animate-pulse' 
                                  : isPast 
                                    ? 'bg-gray-600 text-gray-300' 
                                    : 'bg-blue-600 text-white'
                              }`}>
                                {isActive ? 'ARRIVED' : isPast ? 'Past' : 'Upcoming'}
                              </span>
                              {isActive && (
                                <span className="text-xs text-green-400 animate-pulse">
                                  🔔 Time Now!
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">
                                {formatTime(booking.time)}
                              </span>
                              {!isPast && (
                                <button
                                  onClick={() => onCancel(table.id, booking.id)}
                                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                                  title="Delete booking"
                                >
                                  <FiTrash2 className="text-sm" />
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Phone:</span>
                              <span className="text-white">{booking.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Guests:</span>
                              <span className="text-white">{booking.guests}</span>
                            </div>
                          </div>
                          {booking.notes && (
                            <div className="mt-2 text-xs">
                              <span className="text-gray-400">Notes:</span>
                              <p className="text-white mt-1">{booking.notes}</p>
                            </div>
                          )}
                          {isActive && (
                            <div className="mt-3 flex gap-2">
                              <button
                                onClick={() => handleCustomerArrival(booking)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md font-medium transition-colors animate-pulse"
                              >
                                🍽️ Go to Menu
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              /* Single Booking Display (Backward Compatibility) */
              table.currentBooking && (
                <>
                  <h4 className="text-white font-medium mb-2">Current Booking</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customer:</span>
                      <span className="text-white">{table.currentBooking.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{table.currentBooking.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Guests:</span>
                      <span className="text-white">{table.currentBooking.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">
                        {table.currentBooking.date} at {formatTime(table.currentBooking.time)}
                      </span>
                    </div>
                    {table.currentBooking.notes && (
                      <div className="mt-2">
                        <span className="text-gray-400">Notes:</span>
                        <p className="text-white mt-1">{table.currentBooking.notes}</p>
                      </div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {table.status === 'available' ? (
            <>
              <button
                onClick={handleBooking}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <FiCheck className="text-lg" />
                <span>Book</span>
              </button>
              <button
                onClick={handleGoToMenu}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <BiSolidDish className="text-lg" />
                <span>Menu</span>
              </button>
            </>
          ) : table.status === 'booked' ? (
            <>
              {/* Show different buttons based on booking structure */}
              {table.bookings && table.bookings.length > 0 ? (
                /* Multiple bookings */
                <>
                  <button
                    onClick={handleBooking}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
                  >
                    <FiCheck className="text-lg" />
                    <span>Add Booking</span>
                  </button>
                  <button
                    onClick={handleGoToMenu}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
                  >
                    <BiSolidDish className="text-lg" />
                    <span>Menu</span>
                  </button>
                </>
              ) : (
                /* Single booking (backward compatibility) */
                <>
                  <button
                    onClick={() => onCancel(table.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
                  >
                    <FiX className="text-lg" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={() => handleCustomerArrival(table.currentBooking)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
                  >
                    <BiSolidDish className="text-lg" />
                    <span>Arrived</span>
                  </button>
                </>
              )}
            </>
          ) : table.status === 'occupied' ? (
            table.number !== '3' && (
              <button
                onClick={handleWalkInOrder}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
              >
                <BiSolidDish className="text-lg" />
                <span>Order</span>
              </button>
            )
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-600 text-gray-400 py-2 px-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-1 text-sm"
            >
              <span>Unavailable</span>
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-white font-medium mb-3">Table Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Added:</p>
                <p className="text-white">{new Date(table.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Last Updated:</p>
                <p className="text-white">{new Date(table.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
            {table.features && table.features.length > 0 && (
              <div className="mt-3">
                <p className="text-gray-400 text-sm mb-2">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {table.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="border-t border-gray-700 bg-gray-900 p-6">
          <h4 className="text-white font-medium mb-4">
            {table.bookings && table.bookings.length > 0 ? 
              `Add New Booking - Table ${table.number}` : 
              `Book Table ${table.number}`
            }
          </h4>
          
          {/* Show existing bookings for today */}
          {table.bookings && table.bookings.length > 0 && (
            <div className="mb-4 p-3 bg-blue-900/20 rounded-lg border border-blue-700">
              <h5 className="text-blue-400 font-medium mb-2">Existing Bookings Today:</h5>
              <div className="space-y-1">
                {table.bookings
                  .filter(booking => booking.date === new Date().toISOString().split('T')[0])
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((booking, index) => (
                    <div key={index} className="text-sm text-gray-300 flex justify-between">
                      <span>{formatTime(booking.time)} - {booking.customerName}</span>
                      <span>{booking.guests} guests</span>
                    </div>
                  ))}
              </div>
              <p className="text-xs text-yellow-400 mt-2">
                ⚠️ Please maintain at least 2 hours between bookings
              </p>
            </div>
          )}
          
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.customerName}
                  onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Guests</label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                >
                  {[...Array(table.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Notes (Optional)</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                value={bookingData.notes}
                onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                placeholder="Special requests, dietary restrictions, etc."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {table.bookings && table.bookings.length > 0 ? 'Add Booking' : 'Confirm Booking'}
              </button>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Table Form Modal */}
      {showEditForm && (
        <div className="border-t border-gray-700 bg-gray-900 p-6">
          <h4 className="text-white font-medium mb-4">Edit Table {table.number}</h4>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Table Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editData.number}
                  onChange={(e) => setEditData({...editData, number: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Capacity</label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editData.capacity}
                  onChange={(e) => setEditData({...editData, capacity: parseInt(e.target.value)})}
                >
                  {[2,4,6,8,10,12].map(num => (
                    <option key={num} value={num}>{num} people</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Location</label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Main Dining">Main Dining</option>
                  <option value="Patio">Patio</option>
                  <option value="Private Room">Private Room</option>
                  <option value="Bar Area">Bar Area</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Type</label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editData.type}
                  onChange={(e) => setEditData({...editData, type: e.target.value})}
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Features (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Window View, Quiet Corner (separate with commas)"
                value={editData.features.join(', ')}
                onChange={(e) => setEditData({...editData, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '')})}
              />
              <p className="text-gray-500 text-xs mt-1">Current features will be replaced with new ones</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleEditCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="border-t border-gray-700 bg-red-900/10 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-medium mb-2">Delete Table {table.number}?</h4>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone. All table data will be permanently removed.
              {table.status !== 'available' && table.currentBooking && (
                <span className="block mt-2 text-yellow-400 font-medium">
                  ⚠️ This table has an active booking that will also be deleted.
                </span>
              )}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <FiTrash2 className="text-lg" />
                <span>Delete Table</span>
              </button>
              <button
                onClick={handleDeleteCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCards;
