import React from "react";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
    return (
        <div 
            className="flex gap-6 bg-black p-6 min-h-screen overflow-auto scrollbar-hide"
            style={{ height: 'calc(100vh - 5rem)' }}
        >
            {/* Left Section - Greetings and Feature Cards */}
            <div className="flex-1 space-y-6 overflow-y-auto scrollbar-hide">
                {/* Greetings Component */}
                <Greetings />
                
                {/* Mini Cards for Key Metrics */}
                <MiniCard />
                
                {/* Recent Orders */}
                <RecentOrders />
                
                
            </div>

            {/* Right Section - Popular Dishes */}
            <div className="flex-1 bg-gray-900 rounded-2xl shadow-lg p-6 overflow-y-auto scrollbar-hide">
                <PopularDishes />
            </div>
        </div>
    );
};

export default Home;
