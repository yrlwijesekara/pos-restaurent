import React, { useState } from 'react';
import { BiSearch, BiTime, BiCheckCircle } from 'react-icons/bi';
import { IoEye, IoFilter } from 'react-icons/io5';
import { MdPendingActions } from 'react-icons/md';
import OrderList from './OrderList';

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showViewAll, setShowViewAll] = useState(false);

  // Sample orders data - in a real app, this would come from API/state management
  const orders = [
    {
      id: '#ORD-001',
      customerName: 'John Doe',
      items: ['Grilled Chicken', 'Caesar Salad'],
      total: 32.50,
      status: 'preparing',
      time: '10 mins ago',
      tableNumber: 'T-05'
    },
    {
      id: '#ORD-002',
      customerName: 'Sarah Wilson',
      items: ['Beef Steak', 'French Fries', 'Coke'],
      total: 45.99,
      status: 'ready',
      time: '5 mins ago',
      tableNumber: 'T-12'
    },
    {
      id: '#ORD-003',
      customerName: 'Mike Johnson',
      items: ['Pizza Margherita', 'Garlic Bread'],
      total: 28.75,
      status: 'completed',
      time: '15 mins ago',
      tableNumber: 'T-08'
    },
    {
      id: '#ORD-004',
      customerName: 'Emily Davis',
      items: ['Chicken Wings', 'Beer'],
      total: 19.50,
      status: 'preparing',
      time: '8 mins ago',
      tableNumber: 'T-03'
    },
    {
      id: '#ORD-005',
      customerName: 'Robert Brown',
      items: ['Seafood Pasta', 'White Wine'],
      total: 52.00,
      status: 'pending',
      time: '2 mins ago',
      tableNumber: 'T-15'
    }
  ];

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Show only first 3 orders if not viewing all
  const displayedOrders = showViewAll ? filteredOrders : filteredOrders.slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/30';
      case 'preparing': return 'text-blue-400 bg-blue-900/30';
      case 'ready': return 'text-green-400 bg-green-900/30';
      case 'completed': return 'text-gray-400 bg-gray-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <MdPendingActions className="text-sm" />;
      case 'preparing': return <BiTime className="text-sm" />;
      case 'ready': return <BiCheckCircle className="text-sm" />;
      case 'completed': return <BiCheckCircle className="text-sm" />;
      default: return <BiTime className="text-sm" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">📋 Recent Orders</h2>
        <button 
          onClick={() => setShowViewAll(!showViewAll)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
        >
          <IoEye className="text-lg" />
          {showViewAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <IoFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <OrderList 
        orders={displayedOrders}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
      />

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Show count info */}
      {filteredOrders.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Showing {displayedOrders.length} of {filteredOrders.length} orders
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
