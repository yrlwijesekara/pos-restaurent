// Restaurant Dishes Data
export const DISHES = [
  {
    id: 1,
    name: "Grilled Chicken",
    image: "🍗",
    category: "Main Course",
    price: 18.99,
    numberOfOrders: 145,
    description: "Tender grilled chicken breast with herbs and spices",
    isAvailable: true,
    preparationTime: "15-20 mins"
  },
  {
    id: 2,
    name: "Caesar Salad",
    image: "🥗",
    category: "Appetizers",
    price: 12.99,
    numberOfOrders: 89,
    description: "Fresh romaine lettuce with caesar dressing and croutons",
    isAvailable: true,
    preparationTime: "5-10 mins"
  },
  {
    id: 3,
    name: "Beef Steak",
    image: "🥩",
    category: "Main Course",
    price: 24.99,
    numberOfOrders: 67,
    description: "Premium beef steak cooked to perfection",
    isAvailable: true,
    preparationTime: "20-25 mins"
  },
  {
    id: 4,
    name: "Margherita Pizza",
    image: "🍕",
    category: "Main Course",
    price: 16.50,
    numberOfOrders: 123,
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    isAvailable: true,
    preparationTime: "12-15 mins"
  },
  {
    id: 5,
    name: "Chocolate Cake",
    image: "🍰",
    category: "Desserts",
    price: 8.99,
    numberOfOrders: 78,
    description: "Rich chocolate cake with chocolate ganache",
    isAvailable: true,
    preparationTime: "5 mins"
  },
  {
    id: 6,
    name: "Fresh Orange Juice",
    image: "🥤",
    category: "Beverages",
    price: 5.99,
    numberOfOrders: 156,
    description: "Freshly squeezed orange juice",
    isAvailable: false,
    preparationTime: "2-3 mins"
  },
  {
    id: 7,
    name: "Garlic Bread",
    image: "🍞",
    category: "Appetizers",
    price: 6.99,
    numberOfOrders: 134,
    description: "Crispy bread with garlic butter and herbs",
    isAvailable: true,
    preparationTime: "8-10 mins"
  },
  {
    id: 8,
    name: "Chicken Wings",
    image: "🍗",
    category: "Appetizers",
    price: 14.99,
    numberOfOrders: 98,
    description: "Spicy buffalo chicken wings with ranch dip",
    isAvailable: true,
    preparationTime: "12-15 mins"
  },
  {
    id: 9,
    name: "Seafood Pasta",
    image: "🍝",
    category: "Main Course",
    price: 22.50,
    numberOfOrders: 45,
    description: "Linguine pasta with mixed seafood in white sauce",
    isAvailable: true,
    preparationTime: "18-22 mins"
  },
  {
    id: 10,
    name: "Greek Salad",
    image: "🥗",
    category: "Appetizers",
    price: 11.99,
    numberOfOrders: 62,
    description: "Fresh vegetables with feta cheese and olive oil",
    isAvailable: true,
    preparationTime: "7-10 mins"
  },
  {
    id: 11,
    name: "Fish Tacos",
    image: "🌮",
    category: "Main Course",
    price: 15.99,
    numberOfOrders: 87,
    description: "Grilled fish tacos with fresh salsa and lime",
    isAvailable: true,
    preparationTime: "12-15 mins"
  },
  {
    id: 12,
    name: "Tiramisu",
    image: "🍰",
    category: "Desserts",
    price: 9.99,
    numberOfOrders: 56,
    description: "Classic Italian dessert with espresso and mascarpone",
    isAvailable: true,
    preparationTime: "3 mins"
  },
  {
    id: 13,
    name: "Craft Beer",
    image: "🍺",
    category: "Beverages",
    price: 7.99,
    numberOfOrders: 189,
    description: "Local craft beer on tap",
    isAvailable: true,
    preparationTime: "1 min"
  },
  {
    id: 14,
    name: "Mushroom Risotto",
    image: "🍚",
    category: "Main Course",
    price: 19.99,
    numberOfOrders: 38,
    description: "Creamy risotto with wild mushrooms and parmesan",
    isAvailable: true,
    preparationTime: "20-25 mins"
  },
  {
    id: 15,
    name: "Ice Cream Sundae",
    image: "🍨",
    category: "Desserts",
    price: 7.50,
    numberOfOrders: 92,
    description: "Vanilla ice cream with chocolate sauce and nuts",
    isAvailable: true,
    preparationTime: "3-5 mins"
  }
];

// Create POPULAR_DISHES by sorting DISHES by numberOfOrders (top 5)
export const POPULAR_DISHES = DISHES
  .sort((a, b) => b.numberOfOrders - a.numberOfOrders)
  .slice(0, 5);

// Other useful exports
export const CATEGORIES = [
  { name: "All", icon: "🍽️" },
  { name: "Appetizers", icon: "🥗" },
  { name: "Main Course", icon: "🍖" },
  { name: "Desserts", icon: "🍰" },
  { name: "Beverages", icon: "🥤" }
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Available dishes only
export const AVAILABLE_DISHES = DISHES.filter(dish => dish.isAvailable);

// Restaurant Info
export const RESTAURANT_INFO = {
  name: "Chucky Restaurant",
  address: "123 Main Street, Downtown",
  phone: "+1 (555) 123-4567",
  email: "info@chuckyrestaurant.com",
  hours: {
    weekdays: "11:00 AM - 10:00 PM",
    weekends: "10:00 AM - 11:00 PM"
  }
};
