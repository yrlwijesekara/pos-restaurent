import React, { useState } from 'react';
import { FiUsers, FiClock, FiMapPin, FiCheck, FiX, FiEdit } from 'react-icons/fi';

const TableCards = ({ table, onBook, onCancel, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-900 text-green-100 border-green-700';
      case 'booked':
        return 'bg-red-900 text-red-100 border-red-700';
      case 'occupied':
        return 'bg-yellow-900 text-yellow-100 border-yellow-700';
      case 'reserved':
        return 'bg-blue-900 text-blue-100 border-blue-700';
      default:
        return 'bg-gray-700 text-gray-100 border-gray-600';
    }
  };

  const handleBooking = () => {
    if (table.status === 'available') {
      setShowBookingForm(true);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onBook(table.id, bookingData);
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
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FiMapPin className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Table {table.number}
              </h3>
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
            <button
              onClick={handleEditTable}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiEdit className="text-lg" />
            </button>
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
        {table.status !== 'available' && table.booking && (
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <h4 className="text-white font-medium mb-2">Current Booking</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span className="text-white">{table.booking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="text-white">{table.booking.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Guests:</span>
                <span className="text-white">{table.booking.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="text-white">
                  {table.booking.date} at {formatTime(table.booking.time)}
                </span>
              </div>
              {table.booking.notes && (
                <div className="mt-2">
                  <span className="text-gray-400">Notes:</span>
                  <p className="text-white mt-1">{table.booking.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {table.status === 'available' ? (
            <button
              onClick={handleBooking}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FiCheck className="text-lg" />
              <span>Book Table</span>
            </button>
          ) : (
            <button
              onClick={() => onCancel(table.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FiX className="text-lg" />
              <span>Cancel Booking</span>
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
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
          <h4 className="text-white font-medium mb-4">Book Table {table.number}</h4>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* ...existing booking form code... */}
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
                Confirm Booking
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
    </div>
  );
};

export default TableCards;
