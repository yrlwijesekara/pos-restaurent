import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiPlus, FiMinus, FiShoppingCart, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { BiSolidDish } from 'react-icons/bi';
import { IoCheckmarkCircle } from 'react-icons/io5';

const MenuContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderTotal, setOrderTotal] = useState(0);

  // Get navigation state information
  const tableInfo = location.state?.tableInfo || null;
  const customerInfo = location.state?.customerInfo || null;
  const isCustomerArrival = location.state?.isCustomerArrival || false;
  const isWalkIn = location.state?.isWalkIn || false;

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

  const menuItems = [
    {
      id: 1,
      name: 'Grilled Chicken',
      price: 18.99,
      category: 'Main Course',
      description: 'Tender grilled chicken with herbs and spices',
      image: '🍗',
      available: true
    },
    {
      id: 2,
      name: 'Caesar Salad',
      price: 12.99,
      category: 'Appetizers',
      description: 'Fresh romaine lettuce with caesar dressing',
      image: '🥗',
      available: true
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      price: 8.99,
      category: 'Desserts',
      description: 'Rich chocolate cake with ganache',
      image: '🍰',
      available: true
    },
    {
      id: 4,
      name: 'Fresh Juice',
      price: 5.99,
      category: 'Beverages',
      description: 'Freshly squeezed orange juice',
      image: '🥤',
      available: true
    },
    {
      id: 5,
      name: 'Beef Steak',
      price: 24.99,
      category: 'Main Course',
      description: 'Premium beef steak cooked to perfection',
      image: '🥩',
      available: true
    },
    {
      id: 6,
      name: 'Garlic Bread',
      price: 6.99,
      category: 'Appetizers',
      description: 'Crispy bread with garlic butter',
      image: '🍞',
      available: true
    },
    {
      id: 7,
      name: 'Pasta Carbonara',
      price: 16.99,
      category: 'Main Course',
      description: 'Creamy pasta with bacon and parmesan',
      image: '🍝',
      available: true
    },
    {
      id: 8,
      name: 'Ice Cream',
      price: 6.50,
      category: 'Desserts',
      description: 'Vanilla ice cream with toppings',
      image: '🍦',
      available: true
    },
    {
      id: 9,
      name: 'Coffee',
      price: 4.99,
      category: 'Beverages',
      description: 'Freshly brewed coffee',
      image: '☕',
      available: false
    },
    {
      id: 10,
      name: 'Fish & Chips',
      price: 19.99,
      category: 'Main Course',
      description: 'Beer-battered fish with crispy chips',
      image: '🐟',
      available: true
    }
  ];

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate total when selected items change
  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setOrderTotal(total);
  }, [selectedItems]);

  const addToOrder = (menuItem) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...menuItem, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (menuItemId) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(item => item.id === menuItemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === menuItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter(item => item.id !== menuItemId);
      }
    });
  };

  const removeItemCompletely = (menuItemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== menuItemId));
  };

  const getItemQuantity = (menuItemId) => {
    const item = selectedItems.find(item => item.id === menuItemId);
    return item ? item.quantity : 0;
  };

  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to place order');
      return;
    }

    // Create order object
    const orderData = {
      id: Date.now(),
      customerInfo: customerInfo || { name: 'Walk-in Customer', mobile: 'N/A' },
      tableInfo: tableInfo,
      items: selectedItems,
      total: orderTotal,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('Order placed:', orderData);
    alert(`Order placed successfully! Total: $${orderTotal.toFixed(2)}`);
    
    // Navigate back to tables or home
    navigate(tableInfo ? '/tables' : '/', { 
      state: { orderPlaced: true, orderData } 
    });
  };

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to cancel the booking and continue with menu?')) {
      // Update the state to remove table association
      navigate('/menu', { 
        state: { 
          customerInfo: customerInfo, 
          tableInfo: null 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Menu Items */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <h1 className="text-3xl font-bold">Menu</h1>
            <div className="w-12 h-12" /> {/* Spacer */}
          </div>

          {/* Customer & Table Info */}
          {(customerInfo || tableInfo || isWalkIn) && (
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  {/* Scenario-specific headers */}
                  {isCustomerArrival && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium text-sm">Customer Arrived</span>
                    </div>
                  )}
                  {isWalkIn && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 font-medium text-sm">Walk-in Customer</span>
                    </div>
                  )}
                  
                  {/* Customer Information */}
                  {customerInfo && (
                    <>
                      <p className="text-sm text-gray-300">
                        Customer: <span className="text-white font-medium">{customerInfo.name}</span>
                      </p>
                      {customerInfo.mobile && (
                        <p className="text-sm text-gray-300">
                          Mobile: <span className="text-white font-medium">{customerInfo.mobile}</span>
                        </p>
                      )}
                      {customerInfo.guests && (
                        <p className="text-sm text-gray-300">
                          Guests: <span className="text-white font-medium">{customerInfo.guests}</span>
                        </p>
                      )}
                      {customerInfo.bookingTime && (
                        <p className="text-sm text-gray-300">
                          Booking Time: <span className="text-white font-medium">{customerInfo.bookingTime}</span>
                        </p>
                      )}
                    </>
                  )}
                  
                  {/* Table Information */}
                  {tableInfo && (
                    <>
                      <p className="text-sm text-gray-300">
                        Table: <span className="text-white font-medium">#{tableInfo.number}</span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Capacity: <span className="text-white font-medium">{tableInfo.capacity} persons</span>
                      </p>
                      {tableInfo.location && (
                        <p className="text-sm text-gray-300">
                          Location: <span className="text-white font-medium">{tableInfo.location}</span>
                        </p>
                      )}
                    </>
                  )}
                  
                  {/* Walk-in without customer info */}
                  {isWalkIn && !customerInfo && (
                    <p className="text-sm text-gray-300">
                      Walk-in customer at Table #{tableInfo?.number || 'TBD'}
                    </p>
                  )}
                </div>
                
                {/* Action buttons based on scenario */}
                <div className="flex gap-2">
                  {isCustomerArrival && (
                    <div className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                      Ready to Order
                    </div>
                  )}
                  {tableInfo && customerInfo && !isCustomerArrival && (
                    <button
                      onClick={handleCancelBooking}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <div
                key={item.id}
                className={`bg-gray-800 rounded-xl p-4 border transition-all duration-200 transform hover:scale-[1.02] ${
                  item.available 
                    ? 'border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20' 
                    : 'border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Item Image */}
                  <div className="text-5xl bg-gray-900 rounded-lg p-3 flex items-center justify-center min-w-[80px] h-[80px]">
                    {item.image}
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      {quantity > 0 && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {quantity} in cart
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-green-400">
                        ${item.price.toFixed(2)}
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add/Remove Controls */}
                  <div className="flex items-center gap-3">
                    {item.available ? (
                      quantity > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="text-lg font-semibold min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addToOrder(item)}
                            className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                          >
                            <FiPlus className="text-sm" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToOrder(item)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                        >
                          <FiPlus className="text-lg" />
                          <span className="font-medium">Add</span>
                        </button>
                      )
                    ) : (
                      <span className="text-sm text-red-400 font-medium">Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <BiSolidDish className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Right Side - Selected Items */}
      <div className="w-96 bg-gradient-to-b from-gray-900 to-gray-800 border-l border-gray-700 p-6 overflow-y-auto shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FiShoppingCart className="text-xl text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Order Summary</h2>
            <p className="text-sm text-gray-400">Selected Items</p>
          </div>
        </div>

        {selectedItems.length === 0 ? (
          <div className="text-center py-12">
            <FiShoppingCart className="text-4xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No items selected</p>
            <p className="text-sm text-gray-500 mt-2">Add items from the menu to get started</p>
          </div>
        ) : (
          <>
            {/* Selected Items List */}
            <div className="space-y-3 mb-6">
              {selectedItems.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItemCompletely(item.id)}
                      className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                      title="Remove from order"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => removeFromOrder(item.id)}
                        className="w-7 h-7 bg-red-600 hover:bg-red-700 rounded-md flex items-center justify-center transition-colors"
                      >
                        <FiMinus className="text-xs" />
                      </button>
                      <span className="text-sm font-medium min-w-[2rem] text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToOrder(item)}
                        className="w-7 h-7 bg-green-600 hover:bg-green-700 rounded-md flex items-center justify-center transition-colors"
                      >
                        <FiPlus className="text-xs" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-400 text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-400">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                {selectedItems.reduce((sum, item) => sum + item.quantity, 0)} item(s)
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <IoCheckmarkCircle className="text-xl" />
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuContainer;
