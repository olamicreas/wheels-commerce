import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Filter, 
  Package, 
  Truck, 
  ShieldCheck, 
  Phone,
  Heart,
  User,
  ArrowRight,
  Zap,
  Check,
  Info,
  Minus,
  Plus,
  ArrowLeft,
  MousePointerClick
} from 'lucide-react';

// --- Mock Data with B2B Details ---
const CATEGORIES = [
  { id: 'all', name: 'All Departments' },
  { id: 'supplies', name: 'Office Supplies' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'tech', name: 'Technology' },
  { id: 'breakroom', name: 'Breakroom' },
  { id: 'cleaning', name: 'Janitorial' },
];

// Enhanced Product Data with VALID Image Links
const PRODUCTS = [
  {
    id: 1,
    title: 'Ergonomic Mesh Task Chair',
    category: 'furniture',
    price: 189.99,
    rating: 4.8,
    reviews: 124,
    // Modern Office Chair
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', 
    description: 'Breathable mesh back with adjustable lumbar support and padded seat functionality for all-day comfort. Features 360-degree swivel and smooth-rolling casters.',
    sku: 'FUR-2910',
    stock: 450,
    specs: { 'Material': 'Mesh/Nylon', 'Weight Cap': '275 lbs', 'Warranty': '5 Years' },
    bulkPricing: [
      { min: 1, price: 189.99 },
      { min: 10, price: 175.00 },
      { min: 50, price: 160.00 }
    ]
  },
  {
    id: 2,
    title: 'Executive Mahogany Desk',
    category: 'furniture',
    price: 459.00,
    rating: 4.9,
    reviews: 45,
    // Modern Wooden Desk
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800', 
    description: 'Premium mahogany finish with built-in cable management and spacious drawers. Scratch-resistant surface.',
    sku: 'FUR-9921',
    stock: 85,
    specs: { 'Width': '60 inches', 'Depth': '30 inches', 'Finish': 'Mahogany' },
    bulkPricing: [
      { min: 1, price: 459.00 },
      { min: 5, price: 430.00 },
      { min: 20, price: 400.00 }
    ]
  },
  {
    id: 3,
    title: 'Wireless Mechanical Keyboard',
    category: 'tech',
    price: 129.50,
    rating: 4.7,
    reviews: 890,
    // Mechanical Keyboard
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    description: 'Tactile switches with multi-device bluetooth connectivity and long battery life. RGB backlit keys.',
    sku: 'TEC-1029',
    stock: 1200,
    specs: { 'Switch': 'Cherry MX Blue', 'Battery': '40 Hours', 'Connection': 'BT 5.0' },
    bulkPricing: [
      { min: 1, price: 129.50 },
      { min: 20, price: 115.00 },
      { min: 100, price: 105.00 }
    ]
  },
  {
    id: 4,
    title: '4K Ultra HD Monitor 27"',
    category: 'tech',
    price: 349.99,
    rating: 4.6,
    reviews: 210,
    // Computer Monitor
    image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=800',
    description: 'Crystal clear resolution with color accuracy perfect for designers. Adjustable stand included.',
    sku: 'TEC-3310',
    stock: 300,
    specs: { 'Refresh Rate': '60Hz', 'Panel': 'IPS', 'Inputs': 'HDMI, DP' },
    bulkPricing: [
      { min: 1, price: 349.99 },
      { min: 10, price: 330.00 },
      { min: 50, price: 310.00 }
    ]
  },
  {
    id: 5,
    title: 'Premium Copy Paper (Case)',
    category: 'supplies',
    price: 42.99,
    rating: 4.5,
    reviews: 1500,
    // Stack of Books/Paper
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800',
    description: 'High brightness 96 paper, perfect for high-volume printing. Jam-free guarantee.',
    sku: 'SUP-1001',
    stock: 5000,
    specs: { 'Weight': '20 lb', 'Brightness': '96', 'Sheets': '5000/Case' },
    bulkPricing: [
      { min: 1, price: 42.99 },
      { min: 40, price: 38.00 }, // Pallet price
      { min: 100, price: 35.00 }
    ]
  },
  {
    id: 6,
    title: 'Artist Pen Set (24 Pack)',
    category: 'supplies',
    price: 24.50,
    rating: 4.8,
    reviews: 340,
    // Pens/Stationery
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
    description: 'Smooth flowing ink in assorted colors. Quick drying and smudge resistant.',
    sku: 'SUP-5520',
    stock: 800,
    specs: { 'Tip Size': '0.7mm', 'Type': 'Gel', 'Colors': 'Assorted' },
    bulkPricing: [
      { min: 1, price: 24.50 },
      { min: 20, price: 20.00 },
      { min: 50, price: 18.00 }
    ]
  },
];

// --- Sub-Components ---

// 1. Reusable Button
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-95",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95",
    outline: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 active:scale-95",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// 2. Notification Toast
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-[60] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all animate-in slide-in-from-bottom-5 ${
      type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'
    }`}>
      {type === 'success' ? <Check size={18} className="text-green-400" /> : <Info size={18} />}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

// 3. Product Card (Grid View)
const ProductCard = ({ product, onAdd, onView, isLiked, onToggleLike }) => (
  <div 
    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-blue-200 cursor-pointer"
    onClick={() => onView(product)}
  >
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      <img 
        src={product.image} 
        alt={product.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
      />
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening modal
          onToggleLike(product.id);
        }}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors z-10 ${
          isLiked ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
        }`}
      >
        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
        <span className="text-white font-medium text-sm">Click to View Details</span>
      </div>
    </div>
    
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex justify-between items-start">
        <div className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
        <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">In Stock</div>
      </div>
      <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
        {product.title}
      </h3>
      
      <div className="flex items-center gap-1 mb-3">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
          ))}
        </div>
        <span className="text-xs text-gray-500">({product.reviews})</span>
      </div>
      
      <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
           <span className="text-xs text-gray-400 block">From</span>
           <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        <Button 
          variant="secondary" 
          onClick={(e) => {
             e.stopPropagation();
             onAdd(product, 1);
          }}
          className="!py-1.5 !px-3 !text-sm"
        >
          <ShoppingCart size={16} /> Add
        </Button>
      </div>
    </div>
  </div>
);

// 4. Detailed Product Modal
const ProductDetailModal = ({ product, isOpen, onClose, onAdd, isLiked, onToggleLike }) => {
  const [qty, setQty] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);

  // Reset qty when product changes
  useEffect(() => {
    if (isOpen) {
      setQty(1);
    }
  }, [isOpen, product]);

  // Calculate Bulk Price dynamically
  useEffect(() => {
    if (!product) return;
    // Find the active tier
    const activeTier = [...product.bulkPricing].reverse().find(tier => qty >= tier.min);
    setCurrentPrice(activeTier ? activeTier.price : product.price);
  }, [qty, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white h-full sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Mobile Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full sm:hidden">
          <X size={24} />
        </button>

        {/* Left: Image */}
        <div className="w-full sm:w-1/2 bg-gray-100 relative group">
          <img src={product.image} alt={product.title} className="w-full h-64 sm:h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
             SKU: {product.sku}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full sm:w-1/2 flex flex-col bg-white overflow-y-auto max-h-[60vh] sm:max-h-full">
          <div className="p-6 sm:p-8 flex-1">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
               <div>
                  <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">{product.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{product.title}</h2>
               </div>
               <button onClick={onClose} className="hidden sm:block p-2 hover:bg-gray-100 rounded-full text-gray-500">
                 <X size={24} />
               </button>
            </div>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-4 mb-6 text-sm">
               <div className="flex items-center text-yellow-500">
                  <Star fill="currentColor" size={16} /> 
                  <span className="ml-1 font-semibold text-gray-900">{product.rating}</span>
                  <span className="mx-1 text-gray-300">|</span>
                  <span className="text-gray-500 hover:text-blue-600 cursor-pointer">{product.reviews} Reviews</span>
               </div>
               <div className="flex items-center text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                  <Check size={14} className="mr-1" /> {product.stock} in stock
               </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-xs text-gray-400 uppercase">{key}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {/* Bulk Pricing Table (INTERACTIVE) */}
            <div className="mb-8 border border-blue-100 rounded-xl overflow-hidden">
               <div className="bg-blue-50 px-4 py-2 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Volume Pricing</span>
                  <span className="text-[10px] text-blue-600 flex items-center gap-1"><MousePointerClick size={10} /> Click to apply</span>
               </div>
               <div className="flex divide-x divide-gray-100">
                 {product.bulkPricing.map((tier, idx) => {
                    const isActiveTier = qty >= tier.min && (idx === product.bulkPricing.length - 1 || qty < product.bulkPricing[idx + 1].min);
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => setQty(tier.min)}
                        className={`flex-1 p-3 text-center transition-all duration-200 cursor-pointer relative group ${
                          qty >= tier.min 
                          ? 'bg-blue-50/50' 
                          : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                         {/* Selection Ring */}
                         {isActiveTier && <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none"></div>}
                         
                         <div className="text-xs text-gray-500 mb-1">Buy {tier.min}+</div>
                         <div className={`font-bold ${qty >= tier.min ? 'text-blue-700' : 'text-gray-900'}`}>
                           ${tier.price.toFixed(2)}
                         </div>
                      </button>
                    );
                 })}
               </div>
            </div>

          </div>

          {/* Bottom Actions Bar */}
          <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
            <div className="flex flex-col gap-4">
               
               <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Total Price</span>
                    <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      ${(currentPrice * qty).toFixed(2)}
                      {currentPrice < product.price && (
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                           Save {Math.round((1 - currentPrice/product.price) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Qty Selector */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <input 
                      type="number" 
                      value={qty} 
                      onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center bg-transparent font-bold outline-none"
                    />
                    <button 
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button 
                    onClick={() => onToggleLike(product.id)}
                    className={`p-3 rounded-lg border flex-shrink-0 transition-colors ${
                      isLiked 
                      ? 'border-red-200 bg-red-50 text-red-500' 
                      : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Heart fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <Button 
                    className="w-full text-lg shadow-xl shadow-blue-600/20" 
                    onClick={() => onAdd(product, qty, currentPrice)}
                  >
                    Add {qty} to Order
                  </Button>
               </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


// --- Main App Logic ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // App State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Modal
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Actions
  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    // Auto clear handled by Toast component
    setTimeout(() => setToast(null), 3000); 
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prev.filter(id => id !== productId);
      }
      showToast("Added to Wishlist");
      return [...prev, productId];
    });
  };

  const addToCart = (product, quantity = 1, priceOverride = null) => {
    // If modal passes a specific price (due to bulk tier), use it. Otherwise use base price.
    const finalPrice = priceOverride || product.price;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // If price changed due to bulk tier, we update the price too for simplicity in this prototype
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + quantity, price: finalPrice } : item
        );
      }
      return [...prev, { ...product, qty: quantity, price: finalPrice }];
    });
    
    // Close modal if open
    setSelectedProduct(null);
    setIsCartOpen(true);
    showToast(`Added ${quantity} items to cart`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      
      {/* Toast Notification Container */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center">
        <span className="font-medium">Fast Nationwide Delivery</span> | Business accounts get <span className="underline cursor-pointer">Net-30 Terms</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 -ml-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setActiveCategory('all'); setSearchQuery('')}}>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Truck size={24} className="transform -scale-x-100" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Wheels<span className="text-blue-600">Commerce</span></h1>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Distribution</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl relative">
              <input
                type="text"
                placeholder="Search products by name, SKU, or category..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-4 mr-2">
                 <button className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                    <User size={20} />
                    <span className="text-[10px] font-bold mt-1">ACCOUNT</span>
                 </button>
                 <button className="flex flex-col items-center text-gray-500 hover:text-blue-600 relative">
                    <Heart size={20} className={wishlist.length > 0 ? "text-red-500 fill-red-500" : ""} />
                    <span className="text-[10px] font-bold mt-1">LISTS</span>
                    {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>}
                 </button>
              </div>
              
              <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

              <button 
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <div className="bg-blue-50 p-2 rounded-full text-blue-700">
                   <ShoppingCart size={24} />
                </div>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white transform translate-x-1 -translate-y-1 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <div className="relative">
               <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <nav className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={18} /> Departments
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat.id 
                          ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
                          : 'text-gray-600 hover:bg-gray-100 border-l-4 border-transparent'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Widget */}
              <div className="bg-slate-800 rounded-xl p-6 text-white text-center shadow-lg shadow-slate-500/20 relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
                <Truck size={32} className="text-blue-400 mx-auto mb-3 relative z-10" />
                <h4 className="font-bold text-lg mb-1 relative z-10">Free Shipping</h4>
                <p className="text-sm text-slate-300 mb-4 relative z-10">On bulk orders over $500.</p>
                <div className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg text-sm group-hover:bg-blue-500 transition-colors relative z-10">
                   View Details
                </div>
              </div>
            </nav>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === 'all' ? 'Featured Products' : CATEGORIES.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">Showing {filteredProducts.length} items available for immediate dispatch.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2 cursor-pointer focus:border-blue-500 outline-none">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={addToCart} 
                    onView={setSelectedProduct}
                    isLiked={wishlist.includes(product.id)}
                    onToggleLike={toggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
                <Search className="text-gray-300 mx-auto mb-4" size={48} />
                <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                <p className="text-gray-500 mt-2 mb-6">We couldn't find matches for "{searchQuery}"</p>
                <Button variant="outline" onClick={() => {setSearchQuery(''); setActiveCategory('all')}}>
                  Reset Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                       <Truck size={18} className="transform -scale-x-100" />
                    </div>
                    <span className="font-bold text-lg text-slate-900">WheelsCommerce</span>
                 </div>
                 <p className="text-sm text-gray-500 leading-relaxed">
                    Your trusted partner in B2B logistics and office procurement. Delivering excellence since 2026.
                 </p>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Investor Relations</li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li>Help Center</li>
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
                 <p className="text-sm text-gray-600 mb-2">1-800-WHEELS-B2B</p>
                 <p className="text-sm text-gray-600">support@wheelscommerce.com</p>
              </div>
           </div>
        </div>
        <div className="bg-gray-50 py-4 text-center text-xs text-gray-400 border-t border-gray-100">
           &copy; 2026 Wheels Commerce Distribution. All rights reserved.
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={addToCart}
        isLiked={selectedProduct && wishlist.includes(selectedProduct.id)}
        onToggleLike={toggleWishlist}
      />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart size={20} /> Order Summary
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                     <ShoppingCart size={40} className="text-gray-400" />
                  </div>
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1 mb-6 text-gray-400">Add items to start an order</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Browsing</Button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                    <div className="relative w-20 h-20 flex-shrink-0">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg bg-gray-50" />
                       <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                          x{item.qty}
                       </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 mb-1">SKU: {item.sku}</p>
                        {item.qty >= 10 && <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded">Bulk Price Applied</span>}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                           <button onClick={() => updateCartQty(item.id, -1)} className="text-gray-400 hover:text-blue-600"><Minus size={14} /></button>
                           <span className="text-sm font-semibold">{item.qty}</span>
                           <button onClick={() => updateCartQty(item.id, 1)} className="text-gray-400 hover:text-blue-600"><Plus size={14} /></button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</div>
                          <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 underline mt-1">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Freight</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax (Est.)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full py-4 text-lg shadow-lg shadow-blue-500/20 group">
                Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


