import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../shared/Modal';
import { FiUser, FiPhone, FiCheck } from 'react-icons/fi';

const OrderCreateModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.customerName.trim() || !formData.mobileNumber.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Validate mobile number (basic validation)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobileNumber.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically create the order via API
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create order data (in a real app, this would be sent to your backend)
      const newOrder = {
        id: Date.now(),
        customerName: formData.customerName,
        mobileNumber: formData.mobileNumber,
        createdAt: new Date().toISOString(),
        status: 'pending',
        items: []
      };

      console.log('New order created:', newOrder);

      // Reset form
      setFormData({
        customerName: '',
        mobileNumber: ''
      });

      // Close modal
      onClose();

      // Redirect to tables page
      navigate('/tables');
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setFormData({
        customerName: '',
        mobileNumber: ''
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Create New Order"
      size="md"
    >
      <form onSubmit={handleCreateOrder} className="space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Customer Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="Enter customer name"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleModalClose}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.customerName.trim() || !formData.mobileNumber.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <FiCheck className="text-lg" />
                Create Order
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderCreateModal;
