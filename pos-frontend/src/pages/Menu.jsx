import React, { useState } from 'react';
import { BiSolidDish, BiSearch } from 'react-icons/bi';
import { IoAdd, IoRemove } from 'react-icons/io5';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      available: false
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
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToOrder = (item) => {
    console.log('Added to order:', item);
    // Here you would typically dispatch to a cart/order state
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <BiSolidDish className="text-3xl text-blue-400 mr-3" />
          <h1 className="text-3xl font-bold">Menu</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
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
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-gray-900 rounded-xl border border-gray-800 p-4 ${
              !item.available ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Item Image/Emoji */}
              <div className="text-4xl">{item.image}</div>
              
              {/* Item Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <span className="text-xl font-bold text-green-400">${item.price}</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                    {item.category}
                  </span>
                  
                  {item.available ? (
                    <button
                      onClick={() => handleAddToOrder(item)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                      <IoAdd className="text-lg" />
                      <span className="font-medium">Add</span>
                    </button>
                  ) : (
                    <span className="text-sm text-red-400 font-medium">Unavailable</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
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
  );
};

export default Menu;
