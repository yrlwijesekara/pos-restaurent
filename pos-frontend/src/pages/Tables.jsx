import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPlus, FiFilter, FiSearch } from "react-icons/fi";
import TableCards from "../components/Tables/TableCards";

const Tables = () => {
    const navigate = useNavigate();
    const [tables, setTables] = useState([]);
    const [filteredTables, setFilteredTables] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTable, setNewTable] = useState({
        number: '',
        capacity: 2,
        location: '',
        type: 'standard',
        features: []
    });

    // Sample data - replace with actual API call
    useEffect(() => {
        const sampleTables = [
            {
                id: '1',
                number: '1',
                capacity: 4,
                location: 'Main Dining',
                type: 'Standard',
                status: 'available',
                features: ['Window View', 'Near Kitchen'],
                createdAt: new Date().getTime() - 86400000,
                updatedAt: new Date().getTime() - 3600000,
                booking: null
            },
            {
                id: '2',
                number: '2',
                capacity: 2,
                location: 'Main Dining',
                type: 'Standard',
                status: 'booked',
                features: ['Quiet Corner'],
                createdAt: new Date().getTime() - 172800000,
                updatedAt: new Date().getTime() - 1800000,
                booking: {
                    customerName: 'John Smith',
                    phone: '+1 (555) 123-4567',
                    guests: 2,
                    date: '2025-07-02',
                    time: '19:00',
                    notes: 'Anniversary dinner'
                }
            },
            {
                id: '3',
                number: '3',
                capacity: 6,
                location: 'Patio',
                type: 'Premium',
                status: 'occupied',
                features: ['Outdoor Seating', 'Garden View'],
                createdAt: new Date().getTime() - 259200000,
                updatedAt: new Date().getTime() - 900000,
                booking: {
                    customerName: 'Sarah Johnson',
                    phone: '+1 (555) 987-6543',
                    guests: 4,
                    date: '2025-07-02',
                    time: '18:30',
                    notes: 'Birthday celebration'
                }
            },
            {
                id: '4',
                number: '4',
                capacity: 8,
                location: 'Private Room',
                type: 'VIP',
                status: 'reserved',
                features: ['Private Room', 'Sound System', 'Projector'],
                createdAt: new Date().getTime() - 345600000,
                updatedAt: new Date().getTime() - 600000,
                booking: {
                    customerName: 'Corporate Event',
                    phone: '+1 (555) 456-7890',
                    guests: 8,
                    date: '2025-07-03',
                    time: '12:00',
                    notes: 'Business lunch meeting'
                }
            },
            {
                id: '5',
                number: '5',
                capacity: 4,
                location: 'Main Dining',
                type: 'Standard',
                status: 'available',
                features: ['Center Table'],
                createdAt: new Date().getTime() - 432000000,
                updatedAt: new Date().getTime() - 300000,
                booking: null
            }
        ];
        
        setTables(sampleTables);
        setFilteredTables(sampleTables);
    }, []);

    // Filter tables based on status and search query
    useEffect(() => {
        let filtered = tables;

        // Filter by status
        if (activeFilter !== 'all') {
            filtered = filtered.filter(table => 
                table.status.toLowerCase() === activeFilter.toLowerCase()
            );
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(table => 
                table.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                table.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                table.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTables(filtered);
    }, [tables, activeFilter, searchQuery]);

    const handleAddTable = (e) => {
        e.preventDefault();
        const table = {
            id: (tables.length + 1).toString(),
            ...newTable,
            status: 'available',
            features: newTable.features.filter(f => f.trim() !== ''),
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            booking: null
        };
        
        setTables([...tables, table]);
        setNewTable({
            number: '',
            capacity: 2,
            location: '',
            type: 'standard',
            features: []
        });
        setShowAddForm(false);
    };

    const handleBookTable = (tableId, bookingData) => {
        setTables(tables.map(table => 
            table.id === tableId 
                ? { ...table, status: 'booked', booking: bookingData, updatedAt: new Date().getTime() }
                : table
        ));
    };

    const handleCancelBooking = (tableId) => {
        setTables(tables.map(table => 
            table.id === tableId 
                ? { ...table, status: 'available', booking: null, updatedAt: new Date().getTime() }
                : table
        ));
    };

    const handleEditTable = (table) => {
        // Implementation for editing table details
        console.log('Edit table:', table);
    };

    const filterOptions = [
        { key: 'all', label: 'All Tables', count: tables.length },
        { key: 'available', label: 'Available', count: tables.filter(t => t.status === 'available').length },
        { key: 'booked', label: 'Booked', count: tables.filter(t => t.status === 'booked').length },
        { key: 'occupied', label: 'Occupied', count: tables.filter(t => t.status === 'occupied').length },
        { key: 'reserved', label: 'Reserved', count: tables.filter(t => t.status === 'reserved').length }
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
                                Tables
                            </h1>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                        </div>
                        
                        
                    
                    </div>
                </div>

                {/* Add Table Button */}
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <FiPlus className="text-lg" />
                        <span>Add New Table</span>
                    </button>
                </div>

                {/* Add Table Form */}
                {showAddForm && (
                    <div className="mb-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Add New Table</h3>
                        <form onSubmit={handleAddTable} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Table Number</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={newTable.number}
                                        onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                                        placeholder="e.g., 6"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Capacity</label>
                                    <select
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={newTable.capacity}
                                        onChange={(e) => setNewTable({...newTable, capacity: parseInt(e.target.value)})}
                                    >
                                        {[2,4,6,8,10,12].map(num => (
                                            <option key={num} value={num}>{num} people</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Location</label>
                                    <select
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={newTable.location}
                                        onChange={(e) => setNewTable({...newTable, location: e.target.value})}
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
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={newTable.type}
                                        onChange={(e) => setNewTable({...newTable, type: e.target.value})}
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
                                    className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Window View, Quiet Corner (separate with commas)"
                                    onChange={(e) => setNewTable({...newTable, features: e.target.value.split(',').map(f => f.trim())})}
                                />
                            </div>
                            
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Add Table
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by table number, location, or type..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="mb-8">
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

                {/* Tables Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTables.length > 0 ? (
                        filteredTables.map((table) => (
                            <TableCards
                                key={table.id}
                                table={table}
                                onBook={handleBookTable}
                                onCancel={handleCancelBooking}
                                onEdit={handleEditTable}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-500 text-6xl mb-4">
                                <FiFilter className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">No tables found</h3>
                            <p className="text-gray-400">
                                {searchQuery 
                                    ? `No tables match your search "${searchQuery}"`
                                    : `No tables with status "${activeFilter}"`
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Tables Statistics */}
                {filteredTables.length > 0 && (
                    <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Tables Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-400">
                                    {tables.filter(t => t.status === 'available').length}
                                </p>
                                <p className="text-gray-400">Available</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-400">
                                    {tables.filter(t => t.status === 'booked').length}
                                </p>
                                <p className="text-gray-400">Booked</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-400">
                                    {tables.filter(t => t.status === 'occupied').length}
                                </p>
                                <p className="text-gray-400">Occupied</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-400">
                                    {tables.reduce((sum, table) => sum + table.capacity, 0)}
                                </p>
                                <p className="text-gray-400">Total Capacity</p>
                            </div>
                        </div>
                    </div>
                )}

               
            </div>
        </div>
    );
};

export default Tables;
