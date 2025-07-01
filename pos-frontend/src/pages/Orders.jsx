import React, { useState, useEffect } from "react";
import OrderCard from "../components/orders/OrderCard";
import { FiFilter, FiSearch, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data - replace with actual API call
    useEffect(() => {
        const sampleOrders = [
            {
                id: '001',
                customerName: 'John Doe',
                tableNumber: 5,
                status: 'ready',
                timestamp: new Date().getTime() - 1800000, // 30 minutes ago
                estimatedTime: '15:30',
                subtotal: 25.50,
                tax: 2.55,
                total: 28.05,
                items: [
                    {
                        name: 'Grilled Chicken Sandwich',
                        quantity: 1,
                        price: 12.99,
                        customizations: ['No onions', 'Extra cheese']
                    },
                    {
                        name: 'French Fries',
                        quantity: 1,
                        price: 4.99
                    },
                    {
                        name: 'Coca Cola',
                        quantity: 2,
                        price: 2.99
                    }
                ],
                specialInstructions: 'Please make it spicy'
            },
            {
                id: '002',
                customerName: 'Jane Smith',
                tableNumber: 3,
                status: 'in progress',
                timestamp: new Date().getTime() - 900000, // 15 minutes ago
                estimatedTime: '15:45',
                subtotal: 18.75,
                tax: 1.88,
                total: 20.63,
                items: [
                    {
                        name: 'Caesar Salad',
                        quantity: 1,
                        price: 9.99,
                        customizations: ['Grilled chicken', 'Extra dressing']
                    },
                    {
                        name: 'Iced Tea',
                        quantity: 1,
                        price: 2.49
                    },
                    {
                        name: 'Cheesecake',
                        quantity: 1,
                        price: 6.99
                    }
                ]
            },
            {
                id: '003',
                customerName: 'Mike Johnson',
                tableNumber: 8,
                status: 'completed',
                timestamp: new Date().getTime() - 300000, // 5 minutes ago
                estimatedTime: '16:00',
                subtotal: 32.50,
                tax: 3.25,
                total: 35.75,
                items: [
                    {
                        name: 'Ribeye Steak',
                        quantity: 1,
                        price: 24.99,
                        customizations: ['Medium rare', 'Garlic butter']
                    },
                    {
                        name: 'Mashed Potatoes',
                        quantity: 1,
                        price: 4.99
                    },
                    {
                        name: 'Red Wine',
                        quantity: 1,
                        price: 8.99
                    }
                ],
                specialInstructions: 'Birthday celebration - please add candle to dessert'
            },
            {
                id: '004',
                customerName: 'Sarah Wilson',
                tableNumber: 12,
                status: 'ready',
                timestamp: new Date().getTime() - 2700000, // 45 minutes ago
                estimatedTime: '15:15',
                subtotal: 15.25,
                tax: 1.53,
                total: 16.78,
                items: [
                    {
                        name: 'Veggie Burger',
                        quantity: 1,
                        price: 10.99,
                        customizations: ['Vegan cheese', 'Avocado']
                    },
                    {
                        name: 'Sweet Potato Fries',
                        quantity: 1,
                        price: 4.99
                    }
                ]
            },
            {
                id: '005',
                customerName: 'David Brown',
                tableNumber: 7,
                status: 'in progress',
                timestamp: new Date().getTime() - 600000, // 10 minutes ago
                estimatedTime: '15:50',
                subtotal: 45.80,
                tax: 4.58,
                total: 50.38,
                items: [
                    {
                        name: 'Seafood Platter',
                        quantity: 1,
                        price: 28.99
                    },
                    {
                        name: 'Lobster Bisque',
                        quantity: 1,
                        price: 8.99
                    },
                    {
                        name: 'House Salad',
                        quantity: 2,
                        price: 5.99
                    },
                    {
                        name: 'Chardonnay',
                        quantity: 1,
                        price: 9.99
                    }
                ],
                specialInstructions: 'Allergy: shellfish for one guest'
            }
        ];
        
        // Convert any "supply" orders to "completed" orders
        const updatedOrders = sampleOrders.map(order => ({
            ...order,
            status: order.status === 'supply' ? 'completed' : order.status
        }));
        
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
    }, []);

    // Filter orders based on status and search query
    useEffect(() => {
        let filtered = orders;

        // Filter by status
        if (activeFilter !== 'all') {
            filtered = filtered.filter(order => 
                order.status.toLowerCase() === activeFilter.toLowerCase()
            );
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(order => 
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.tableNumber.toString().includes(searchQuery)
            );
        }

        setFilteredOrders(filtered);
    }, [orders, activeFilter, searchQuery]);

    const handleOrderClick = (order) => {
        console.log('Order clicked:', order);
        // Add any additional logic when order is clicked
    };

    const filterOptions = [
        { key: 'all', label: 'All Orders', count: orders.length },
        { key: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length },
        { key: 'in progress', label: 'In Progress', count: orders.filter(o => o.status === 'in progress').length },
        { key: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length }
    ];

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-full mx-auto">
                {/* Stylish Header with Back Button */}
                <div className="mb-8 relative">
                    {/* Back Button - Eye-catching */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute left-0 top-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group transform hover:scale-105"
                    >
                        <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    {/* Header Content */}
                    <div className="text-center pt-4">
                        <div className="relative inline-block">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                                Orders
                            </h1>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                        </div>
                        
                        
                       
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by order ID, customer name, or table number..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => setActiveFilter(option.key)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                                    activeFilter === option.key
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                                }`}
                            >
                                <FiFilter className="text-sm" />
                                <span>{option.label}</span>
                                <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs">
                                    {option.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onClick={handleOrderClick}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-6xl mb-4">
                                <FiFilter className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">No orders found</h3>
                            <p className="text-gray-400">
                                {searchQuery 
                                    ? `No orders match your search "${searchQuery}"`
                                    : `No orders with status "${activeFilter}"`
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Order Statistics */}
                {filteredOrders.length > 0 && (
                    <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-400">
                                    {filteredOrders.length}
                                </p>
                                <p className="text-gray-400">Total Orders</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-400">
                                    ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                                </p>
                                <p className="text-gray-400">Total Revenue</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-400">
                                    ${(filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length).toFixed(2)}
                                </p>
                                <p className="text-gray-400">Avg Order Value</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
