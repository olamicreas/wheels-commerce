import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Filter, 
  Truck, 
  Heart,
  User,
  ArrowRight,
  Check,
  Info,
  Minus,
  Plus,
  MousePointerClick,
  ArrowLeft,
  LayoutGrid,
  Shield,
  FileText,
  Lock,
  Building2,
  Mail,
  Phone,
  HelpCircle,
  LogOut,
  CreditCard,
  MapPin,
  Loader2
} from 'lucide-react';


const CATEGORIES = [
  { id: 'all', name: 'All Departments' },
  { id: 'supplies', name: 'Office Supplies' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'tech', name: 'Technology' },
  { id: 'breakroom', name: 'Breakroom' },
  { id: 'cleaning', name: 'Janitorial' },
];

const PRODUCTS = [
  // --- FURNITURE ---
  {
    id: 1,
    title: 'Ergonomic Mesh Task Chair',
    category: 'furniture',
    price: 189.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', 
    description: 'Breathable mesh back with adjustable lumbar support.',
    sku: 'FUR-2910',
    stock: 450,
    specs: { 'Material': 'Mesh', 'Weight Cap': '275 lbs' },
    bulkPricing: [{ min: 1, price: 189.99 }, { min: 10, price: 175.00 }]
  },
  {
    id: 2,
    title: 'Executive Mahogany Desk',
    category: 'furniture',
    price: 459.00,
    rating: 4.9,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', 
    description: 'Premium mahogany finish with built-in cable management.',
    sku: 'FUR-9921',
    stock: 85,
    specs: { 'Width': '60 inches', 'Finish': 'Mahogany' },
    bulkPricing: [{ min: 1, price: 459.00 }, { min: 5, price: 430.00 }]
  },
  {
    id: 101,
    title: 'Modern Standing Desk',
    category: 'furniture',
    price: 299.00,
    rating: 4.7,
    reviews: 88,
    image: 'https://modernwoodstyle.com/cdn/shop/files/walnut-standing-desk-with-storage-and-monitor-stand_1800x.jpg?v=1748571621',
    description: 'Electric height adjustable desk with memory settings.',
    sku: 'FUR-3301',
    stock: 120,
    specs: { 'Height': '24-50 inches', 'Motor': 'Dual' },
    bulkPricing: [{ min: 1, price: 299.00 }, { min: 5, price: 275.00 }]
  },
  {
    id: 102,
    title: 'Conference Table (10ft)',
    category: 'furniture',
    price: 899.00,
    rating: 4.6,
    reviews: 32,
    image: 'https://static.wixstatic.com/media/26b54c_6614afe76a6a49f18891220bcf0c8c78~mv2.jpg/v1/fill/w_947,h_986,al_c,q_85,enc_avif,quality_auto/26b54c_6614afe76a6a49f18891220bcf0c8c78~mv2.jpg', // Placeholder
    description: 'Spacious conference table with power outlets.',
    sku: 'FUR-8810',
    stock: 20,
    specs: { 'Seats': '10-12', 'Material': 'Oak Veneer' },
    bulkPricing: [{ min: 1, price: 899.00 }, { min: 3, price: 850.00 }]
  },
  {
    id: 103,
    title: 'Leather Reception Sofa',
    category: 'furniture',
    price: 650.00,
    rating: 4.8,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
    description: 'Black leather sofa for waiting areas.',
    sku: 'FUR-5521',
    stock: 40,
    specs: { 'Material': 'Genuine Leather', 'Color': 'Black' },
    bulkPricing: [{ min: 1, price: 650.00 }, { min: 5, price: 600.00 }]
  },
  {
    id: 104,
    title: 'Steel Filing Cabinet (4-Drawer)',
    category: 'furniture',
    price: 180.00,
    rating: 4.5,
    reviews: 210,
    image: 'https://www.furniturecloud.co.uk/pub/media/catalog/product/d/c/dcf4s.jpg',
    description: 'Vertical locking filing cabinet.',
    sku: 'FUR-1102',
    stock: 200,
    specs: { 'Drawers': '4', 'Lock': 'Keyed' },
    bulkPricing: [{ min: 1, price: 180.00 }, { min: 10, price: 160.00 }]
  },
  {
    id: 105,
    title: 'Office Bookshelf',
    category: 'furniture',
    price: 120.00,
    rating: 4.4,
    reviews: 89,
    image: 'https://www.sobefurniture.com/wp-content/uploads/2020/07/products-elanbookcase-scaled-scaled-500x500.jpg',
    description: '5-shelf standard bookcase.',
    sku: 'FUR-2201',
    stock: 150,
    specs: { 'Height': '72 inches', 'Color': 'Espresso' },
    bulkPricing: [{ min: 1, price: 120.00 }, { min: 10, price: 100.00 }]
  },
  {
    id: 106,
    title: 'Floor Lamp',
    category: 'furniture',
    price: 45.99,
    rating: 4.3,
    reviews: 67,
    image: 'https://m.media-amazon.com/images/I/81uGOoV8wZL._AC_UF894,1000_QL80_.jpg',
    description: 'Modern LED floor lamp for lounge areas.',
    sku: 'FUR-LED1',
    stock: 300,
    specs: { 'Bulb': 'LED', 'Height': '60 inches' },
    bulkPricing: [{ min: 1, price: 45.99 }, { min: 20, price: 40.00 }]
  },
  {
    id: 107,
    title: 'Rolling Whiteboard',
    category: 'furniture',
    price: 210.00,
    rating: 4.7,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    description: 'Double-sided magnetic whiteboard on wheels.',
    sku: 'FUR-WB01',
    stock: 90,
    specs: { 'Size': '4x3 ft', 'Surface': 'Magnetic' },
    bulkPricing: [{ min: 1, price: 210.00 }, { min: 5, price: 195.00 }]
  },

  // --- TECH ---
  {
    id: 3,
    title: 'Wireless Mechanical Keyboard',
    category: 'tech',
    price: 129.50,
    rating: 4.7,
    reviews: 890,
    image: 'https://m.media-amazon.com/images/I/61P7MvyRbUL._AC_UF894,1000_QL80_.jpg',
    description: 'Tactile switches with multi-device bluetooth.',
    sku: 'TEC-1029',
    stock: 1200,
    specs: { 'Switch': 'Cherry MX', 'Conn': 'BT 5.0' },
    bulkPricing: [{ min: 1, price: 129.50 }, { min: 20, price: 115.00 }]
  },
  {
    id: 4,
    title: '4K Ultra HD Monitor 27"',
    category: 'tech',
    price: 349.99,
    rating: 4.6,
    reviews: 210,
    image: 'https://www.bhphotovideo.com/cdn-cgi/image/fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/dell_u2725qe_ultrasharp_27_4k_uhd_1745255323_1889853.jpg',
    description: 'Crystal clear resolution with color accuracy.',
    sku: 'TEC-3310',
    stock: 300,
    specs: { 'Panel': 'IPS', 'Refresh': '60Hz' },
    bulkPricing: [{ min: 1, price: 349.99 }, { min: 10, price: 330.00 }]
  },
  {
    id: 201,
    title: 'Business Laptop 15"',
    category: 'tech',
    price: 899.00,
    rating: 4.5,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    description: 'Reliable workhorse laptop with i7 processor.',
    sku: 'TEC-LAP1',
    stock: 150,
    specs: { 'RAM': '16GB', 'SSD': '512GB' },
    bulkPricing: [{ min: 1, price: 899.00 }, { min: 5, price: 850.00 }]
  },
  {
    id: 202,
    title: 'Wireless Ergonomic Mouse',
    category: 'tech',
    price: 39.99,
    rating: 4.8,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    description: 'Reduces wrist strain. Long battery life.',
    sku: 'TEC-MOU1',
    stock: 2000,
    specs: { 'DPI': '4000', 'Type': 'Laser' },
    bulkPricing: [{ min: 1, price: 39.99 }, { min: 20, price: 35.00 }]
  },
  {
    id: 203,
    title: 'HD Webcam 1080p',
    category: 'tech',
    price: 59.99,
    rating: 4.4,
    reviews: 320,
    image: 'https://c1.neweggimages.com/productimage/nb640/1EF-00ZZ-00001-S06.jpg', // Placeholder
    description: 'Wide angle webcam for conference calls.',
    sku: 'TEC-CAM1',
    stock: 600,
    specs: { 'Res': '1080p', 'Mic': 'Stereo' },
    bulkPricing: [{ min: 1, price: 59.99 }, { min: 10, price: 55.00 }]
  },
  {
    id: 204,
    title: 'Noise Cancelling Headset',
    category: 'tech',
    price: 149.99,
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    description: 'Premium audio with active noise cancellation.',
    sku: 'TEC-HEAD1',
    stock: 400,
    specs: { 'Type': 'Over-ear', 'Wireless': 'Yes' },
    bulkPricing: [{ min: 1, price: 149.99 }, { min: 20, price: 135.00 }]
  },
  {
    id: 205,
    title: 'Network Router WiFi 6',
    category: 'tech',
    price: 199.99,
    rating: 4.6,
    reviews: 89,
    image: 'https://i5.walmartimages.com/seo/NETGEAR-Nighthawk-AX3000-WiFi-6-Router-3Gbps-RAX35_a0db0732-eeca-4fac-8532-20acf3df2f6e.171095d77e78a01732414e7d3d26f559.png?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    description: 'High speed internet router for small offices.',
    sku: 'TEC-ROUT1',
    stock: 120,
    specs: { 'Speed': 'AX3000', 'Ports': '4' },
    bulkPricing: [{ min: 1, price: 199.99 }, { min: 5, price: 190.00 }]
  },
  {
    id: 206,
    title: 'HDMI Cable (10ft)',
    category: 'tech',
    price: 12.99,
    rating: 4.5,
    reviews: 1200,
    image: 'https://www.pccables.com/images/01723.jpg', // Placeholder
    description: 'High speed braided HDMI cable.',
    sku: 'TEC-CAB1',
    stock: 5000,
    specs: { 'Length': '10ft', 'Ver': '2.1' },
    bulkPricing: [{ min: 1, price: 12.99 }, { min: 50, price: 10.00 }]
  },
  {
    id: 207,
    title: 'External SSD 1TB',
    category: 'tech',
    price: 119.00,
    rating: 4.9,
    reviews: 340,
    image: 'https://shop.sandisk.com/content/dam/store/en-us/assets/products/portable/sandisk-usb-3-2-ssd/gallery/sandisk-usb-3-2-ssd-front.png.thumb.1280.1280.png',
    description: 'Rugged portable storage.',
    sku: 'TEC-SSD1',
    stock: 250,
    specs: { 'Cap': '1TB', 'Speed': '1050MB/s' },
    bulkPricing: [{ min: 1, price: 119.00 }, { min: 10, price: 110.00 }]
  },

  // --- OFFICE SUPPLIES ---
  {
    id: 5,
    title: 'Premium Copy Paper (Case)',
    category: 'supplies',
    price: 42.99,
    rating: 4.5,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800',
    description: 'High brightness 96 paper.',
    sku: 'SUP-1001',
    stock: 5000,
    specs: { 'Weight': '20 lb', 'Sheets': '5000' },
    bulkPricing: [{ min: 1, price: 42.99 }, { min: 40, price: 38.00 }]
  },
  {
    id: 6,
    title: 'Artist Pen Set (24 Pack)',
    category: 'supplies',
    price: 24.50,
    rating: 4.8,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
    description: 'Smooth flowing ink in assorted colors.',
    sku: 'SUP-5520',
    stock: 800,
    specs: { 'Type': 'Gel', 'Count': '24' },
    bulkPricing: [{ min: 1, price: 24.50 }, { min: 20, price: 20.00 }]
  },
  {
    id: 301,
    title: 'Heavy Duty Stapler',
    category: 'supplies',
    price: 15.99,
    rating: 4.4,
    reviews: 120,
    image: 'https://media.accobrands.com/media/560-560/20932.jpg?width=1360px&height=898px',
    description: 'Staples up to 60 sheets.',
    sku: 'SUP-STAP1',
    stock: 600,
    specs: { 'Cap': '60 sheets', 'Type': 'Manual' },
    bulkPricing: [{ min: 1, price: 15.99 }, { min: 20, price: 14.00 }]
  },
  {
    id: 302,
    title: 'Sticky Notes (12 Pads)',
    category: 'supplies',
    price: 9.99,
    rating: 4.7,
    reviews: 890,
    image: 'https://images-na.ssl-images-amazon.com/images/I/417yzGWgfWL.jpg',
    description: 'Yellow 3x3 sticky notes.',
    sku: 'SUP-NOTE1',
    stock: 3000,
    specs: { 'Size': '3x3', 'Color': 'Yellow' },
    bulkPricing: [{ min: 1, price: 9.99 }, { min: 50, price: 8.50 }]
  },
  {
    id: 303,
    title: 'File Folders (100 Box)',
    category: 'supplies',
    price: 18.50,
    rating: 4.6,
    reviews: 230,
    image: 'https://content.oppictures.com/Master_Images/Master_Variants/Variant_500/283305.JPG', // Generic paper
    description: 'Manila file folders letter size.',
    sku: 'SUP-FOLD1',
    stock: 1200,
    specs: { 'Size': 'Letter', 'Tab': '1/3 Cut' },
    bulkPricing: [{ min: 1, price: 18.50 }, { min: 20, price: 16.00 }]
  },
  {
    id: 304,
    title: 'Permanent Markers (12)',
    category: 'supplies',
    price: 12.00,
    rating: 4.8,
    reviews: 560,
    image: 'https://shop.dkoutlet.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/S/A/SAN33001BX_L.jpg', // Generic desk
    description: 'Fine point black permanent markers.',
    sku: 'SUP-MARK1',
    stock: 1500,
    specs: { 'Color': 'Black', 'Tip': 'Fine' },
    bulkPricing: [{ min: 1, price: 12.00 }, { min: 50, price: 10.00 }]
  },
  {
    id: 305,
    title: 'Scotch Tape (6 Rolls)',
    category: 'supplies',
    price: 14.99,
    rating: 4.7,
    reviews: 400,
    image: 'https://m.media-amazon.com/images/I/71vkTTOaBnL._AC_UF894,1000_QL80_.jpg', // Generic
    description: 'Invisible tape refill rolls.',
    sku: 'SUP-TAPE1',
    stock: 900,
    specs: { 'Width': '3/4"', 'Finish': 'Matte' },
    bulkPricing: [{ min: 1, price: 14.99 }, { min: 20, price: 13.00 }]
  },
  {
    id: 306,
    title: 'Business Envelopes #10',
    category: 'supplies',
    price: 22.00,
    rating: 4.4,
    reviews: 150,
    image: 'https://www.bluesummitsupplies.com/cdn/shop/products/10-Single-Window-Security-Envelopes-020.jpg?v=1589984151&width=960', // Generic
    description: 'Security tinted envelopes, box of 500.',
    sku: 'SUP-ENV1',
    stock: 800,
    specs: { 'Size': '#10', 'Seal': 'Self-seal' },
    bulkPricing: [{ min: 1, price: 22.00 }, { min: 10, price: 20.00 }]
  },

  // --- BREAKROOM ---
  {
    id: 401,
    title: 'Medium Roast Coffee (5lb)',
    category: 'breakroom',
    price: 45.00,
    rating: 4.8,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    description: 'Whole bean arabica coffee blend.',
    sku: 'BRK-COF1',
    stock: 500,
    specs: { 'Roast': 'Medium', 'Origin': 'Colombia' },
    bulkPricing: [{ min: 1, price: 45.00 }, { min: 10, price: 40.00 }]
  },
  {
    id: 402,
    title: 'Paper Cups 12oz (1000)',
    category: 'breakroom',
    price: 65.00,
    rating: 4.5,
    reviews: 120,
    image: 'https://i5.walmartimages.com/seo/1000-Pack-12oz-Disposable-White-Paper-Coffee-Cups-Black-Dome-Lids-For-Hot-Cold-Drink-Coffee-Tea-Cocoa-Travel-Office-Home-Cider-Hot-Chocolate-To-go-Co_c6f4e910-8c4b-43a5-a5c9-01c7166dcfd3.9dd8b21a79bfba513fb908416413621c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    description: 'Hot beverage cups, eco-friendly.',
    sku: 'BRK-CUP1',
    stock: 800,
    specs: { 'Size': '12oz', 'Material': 'Paper' },
    bulkPricing: [{ min: 1, price: 65.00 }, { min: 5, price: 60.00 }]
  },
  {
    id: 403,
    title: 'Assorted Snacks Box',
    category: 'breakroom',
    price: 35.00,
    rating: 4.9,
    reviews: 80,
    image: 'https://www.pittmandavis.com/images/xl/PD24-SST.jpg?v=3',
    description: 'Chips, nuts, and bars variety pack.',
    sku: 'BRK-SNK1',
    stock: 200,
    specs: { 'Count': '50', 'Type': 'Variety' },
    bulkPricing: [{ min: 1, price: 35.00 }, { min: 10, price: 32.00 }]
  },
  {
    id: 404,
    title: 'Spring Water (24 Pack)',
    category: 'breakroom',
    price: 12.99,
    rating: 4.7,
    reviews: 500,
    image: 'https://d13jicmd7uan86.cloudfront.net/923fe517-16f5-4027-a312-ae1e008ab857/725?format=webp',
    description: 'Bottled spring water 16.9oz.',
    sku: 'BRK-H2O1',
    stock: 1000,
    specs: { 'Vol': '500ml', 'Pack': '24' },
    bulkPricing: [{ min: 1, price: 12.99 }, { min: 40, price: 10.00 }]
  },
  {
    id: 405,
    title: 'Plastic Utensils Set',
    category: 'breakroom',
    price: 18.00,
    rating: 4.4,
    reviews: 90,
    image: 'https://cdn.shopify.com/s/files/1/1552/7691/files/72-pcs-navy-blue-heavy-duty-plastic-silverware-set-in-baroque-style-disposable-utensils-knife-fork-and-spoon-set.jpg?v=1764377226&width=1000&crop=center', // Placeholder
    description: 'Forks, spoons, knives heavy duty.',
    sku: 'BRK-FORK1',
    stock: 600,
    specs: { 'Count': '300', 'Color': 'White' },
    bulkPricing: [{ min: 1, price: 18.00 }, { min: 10, price: 16.00 }]
  },
  {
    id: 406,
    title: 'Green Tea Bags (100)',
    category: 'breakroom',
    price: 15.50,
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=800',
    description: 'Organic green tea bags.',
    sku: 'BRK-TEA1',
    stock: 400,
    specs: { 'Type': 'Green', 'Count': '100' },
    bulkPricing: [{ min: 1, price: 15.50 }, { min: 10, price: 14.00 }]
  },
  {
    id: 407,
    title: 'Paper Napkins (Pack 500)',
    category: 'breakroom',
    price: 9.00,
    rating: 4.3,
    reviews: 150,
    image: 'https://m.media-amazon.com/images/I/71zdyaOhr0L._AC_UF894,1000_QL80_.jpg', // Placeholder
    description: 'White beverage napkins.',
    sku: 'BRK-NAP1',
    stock: 800,
    specs: { 'Ply': '1-Ply', 'Count': '500' },
    bulkPricing: [{ min: 1, price: 9.00 }, { min: 20, price: 8.00 }]
  },
  {
    id: 408,
    title: 'Sugar Canisters (Pack 3)',
    category: 'breakroom',
    price: 10.00,
    rating: 4.6,
    reviews: 110,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjgZfcjQbhlbGl7dm20XuE8V0VJ8xAKfWBQ&s', // Placeholder
    description: 'Pure cane sugar pour canisters.',
    sku: 'BRK-SUG1',
    stock: 300,
    specs: { 'Wt': '20oz', 'Count': '3' },
    bulkPricing: [{ min: 1, price: 10.00 }, { min: 20, price: 9.00 }]
  },

  // --- JANITORIAL ---
  {
    id: 501,
    title: 'All-Purpose Cleaner (Gal)',
    category: 'cleaning',
    price: 14.99,
    rating: 4.7,
    reviews: 230,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFM4DD7NNGUJ5MmnU_Gnq6qi80Jv-4wGEFw&s',
    description: 'Industrial strength multi-surface cleaner.',
    sku: 'CLN-ALL1',
    stock: 400,
    specs: { 'Vol': '1 Gallon', 'Scent': 'Lemon' },
    bulkPricing: [{ min: 1, price: 14.99 }, { min: 4, price: 12.00 }]
  },
  {
    id: 502,
    title: 'Paper Towels (12 Rolls)',
    category: 'cleaning',
    price: 28.00,
    rating: 4.6,
    reviews: 560,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-k1yGiNDQrJdpqYs1jNc8C2ej_Nbmwb4ZdA&s',
    description: 'High absorbency paper towels.',
    sku: 'CLN-TOW1',
    stock: 1200,
    specs: { 'Ply': '2-Ply', 'Count': '12' },
    bulkPricing: [{ min: 1, price: 28.00 }, { min: 10, price: 25.00 }]
  },
  {
    id: 503,
    title: 'Hand Sanitizer (Gal)',
    category: 'cleaning',
    price: 35.00,
    rating: 4.8,
    reviews: 400,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRao1xGU32hEDZ4NnMQSQ0uNTVoLAMJ4-O9-Q&s',
    description: '70% Alcohol gel sanitizer refill.',
    sku: 'CLN-SAN1',
    stock: 800,
    specs: { 'Vol': '1 Gallon', 'Alcohol': '70%' },
    bulkPricing: [{ min: 1, price: 35.00 }, { min: 4, price: 30.00 }]
  },
  {
    id: 504,
    title: 'Trash Bags 13G (100)',
    category: 'cleaning',
    price: 19.99,
    rating: 4.5,
    reviews: 320,
    image: 'https://m.media-amazon.com/images/I/71UAp4Xsu7L._AC_UF894,1000_QL80_.jpg', // Placeholder
    description: 'Heavy duty drawstring kitchen bags.',
    sku: 'CLN-BAG1',
    stock: 600,
    specs: { 'Size': '13 Gal', 'Count': '100' },
    bulkPricing: [{ min: 1, price: 19.99 }, { min: 10, price: 18.00 }]
  },
  {
    id: 505,
    title: 'Microfiber Cloths (24)',
    category: 'cleaning',
    price: 16.50,
    rating: 4.9,
    reviews: 210,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXEUfImnF_ww9yBvzceGV4WMNep0e18A7X0g&s', // Placeholder
    description: 'Lint-free cleaning cloths.',
    sku: 'CLN-CLTH1',
    stock: 900,
    specs: { 'Size': '12x12', 'Color': 'Blue' },
    bulkPricing: [{ min: 1, price: 16.50 }, { min: 10, price: 15.00 }]
  },
  {
    id: 506,
    title: 'Liquid Hand Soap (4 Gal)',
    category: 'cleaning',
    price: 45.00,
    rating: 4.4,
    reviews: 180,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQha9fwjeHI59pI-dIVMTIyP33HH_iYDX6cPA&s', // Placeholder
    description: 'Moisturizing hand soap refill case.',
    sku: 'CLN-SOAP1',
    stock: 300,
    specs: { 'Vol': '4 Gallon', 'Scent': 'Aloe' },
    bulkPricing: [{ min: 1, price: 45.00 }, { min: 5, price: 40.00 }]
  },
  {
    id: 507,
    title: 'Industrial Mop Head',
    category: 'cleaning',
    price: 9.99,
    rating: 4.3,
    reviews: 80,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYTvfieVMNTG_lRqTVOuquhdwlgNUGg4Hp3A&s', // Placeholder
    description: 'Cotton loop end mop head replacement.',
    sku: 'CLN-MOP1',
    stock: 500,
    specs: { 'Mat': 'Cotton', 'Size': 'Large' },
    bulkPricing: [{ min: 1, price: 9.99 }, { min: 20, price: 8.50 }]
  },
  {
    id: 508,
    title: 'Disinfectant Spray (12)',
    category: 'cleaning',
    price: 38.00,
    rating: 4.8,
    reviews: 600,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkwbwn1RuNNbmjHFJea49H2K9_1SEhIcx9w&s', // Placeholder
    description: 'Kills 99.9% of viruses and bacteria.',
    sku: 'CLN-SPRY1',
    stock: 400,
    specs: { 'Count': '12 cans', 'Oz': '19oz' },
    bulkPricing: [{ min: 1, price: 38.00 }, { min: 10, price: 35.00 }]
  }
];

// --- AUTH UTILS ---
// Simulates a JSON database in localStorage
const MOCK_DB_KEY = 'wheels_commerce_users_db';

const AuthService = {
  getUsers: () => {
    return JSON.parse(localStorage.getItem(MOCK_DB_KEY) || '[]');
  },
  
  register: (user) => {
    const users = AuthService.getUsers();
    // Check if email exists
    if (users.find(u => u.email === user.email)) {
      return { success: false, message: 'Email already registered.' };
    }
    const newUser = { ...user, id: Date.now(), createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
    return { success: true, user: newUser };
  },

  login: (email, password) => {
    const users = AuthService.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) return { success: true, user };
    return { success: false, message: 'Invalid credentials.' };
  }
};

// --- Sub-Components ---

const Loader = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Truck size={24} className="text-blue-600" />
      </div>
    </div>
    <p className="mt-4 text-blue-900 font-bold animate-pulse">Loading Wheels Commerce...</p>
  </div>
);

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
          e.stopPropagation(); 
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

const ProductDetailModal = ({ product, isOpen, onClose, onAdd, isLiked, onToggleLike }) => {
  const [qty, setQty] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);

  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen, product]);

  useEffect(() => {
    if (!product) return;
    const activeTier = [...product.bulkPricing].reverse().find(tier => qty >= tier.min);
    setCurrentPrice(activeTier ? activeTier.price : product.price);
  }, [qty, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white h-full sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row animate-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full sm:hidden">
          <X size={24} />
        </button>

        <div className="w-full sm:w-1/2 bg-gray-100 relative group">
          <img src={product.image} alt={product.title} className="w-full h-64 sm:h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
             SKU: {product.sku}
          </div>
        </div>

        <div className="w-full sm:w-1/2 flex flex-col bg-white overflow-y-auto max-h-[60vh] sm:max-h-full">
          <div className="p-6 sm:p-8 flex-1">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">{product.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{product.title}</h2>
               </div>
               <button onClick={onClose} className="hidden sm:block p-2 hover:bg-gray-100 rounded-full text-gray-500">
                 <X size={24} />
               </button>
            </div>

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

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-xs text-gray-400 uppercase">{key}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>

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
                          qty >= tier.min ? 'bg-blue-50/50' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
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

                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all"><Minus size={16} /></button>
                    <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center bg-transparent font-bold outline-none" />
                    <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all"><Plus size={16} /></button>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button 
                    onClick={() => onToggleLike(product.id)}
                    className={`p-3 rounded-lg border flex-shrink-0 transition-colors ${
                      isLiked ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Heart fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <Button className="w-full text-lg shadow-xl shadow-blue-600/20" onClick={() => onAdd(product, qty, currentPrice)}>
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


// --- VIEW COMPONENTS ---

const RegistrationView = ({ onBack, onRegister, onSwitchToLogin }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.firstName && form.email && form.password) {
      onRegister(form);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-5">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to Shop
      </button>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Business Account</h2>
          <p className="text-gray-500 mt-2">Join Wheels Commerce to access wholesale pricing.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, firstName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, lastName: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <div className="relative">
               <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, company: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
             <div className="relative">
               <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input required type="email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
             <div className="relative">
               <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input required type="password" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, password: e.target.value})} />
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full py-3 text-lg">Create Account</Button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account? <button type="button" onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline">Log in</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginView = ({ onBack, onLogin, onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form.email, form.password);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-in slide-in-from-bottom-5">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to Shop
      </button>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Log in to your business account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
             <div className="relative">
               <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input required type="email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
             <div className="relative">
               <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input required type="password" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setForm({...form, password: e.target.value})} />
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full py-3 text-lg">Log In</Button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              New customer? <button type="button" onClick={onSwitchToRegister} className="text-blue-600 font-semibold hover:underline">Create Account</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileView = ({ user, onLogout, onBack }) => (
  <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in">
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      <button onClick={onLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
        <LogOut size={18} /> Sign Out
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <div className="col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-500 text-sm">{user.company}</p>
          <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Verified Business
          </div>
        </div>
        <div className="space-y-3 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail size={18} /> <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Building2 size={18} /> <span className="text-sm">{user.company || 'Individual Account'}</span>
          </div>
        </div>
      </div>

      {/* Stats/Dashboard */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
          <h3 className="font-bold text-lg mb-1">Welcome back, {user.firstName}!</h3>
          <p className="text-blue-100 text-sm mb-4">You have access to exclusive wholesale pricing.</p>
          <div className="flex gap-4">
             <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="block text-2xl font-bold">0</span>
                <span className="text-xs text-blue-100">Active Orders</span>
             </div>
             <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="block text-2xl font-bold">$0.00</span>
                <span className="text-xs text-blue-100">Spend YTD</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button onClick={onBack} className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left group">
              <ShoppingCart className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-gray-900">Start Shopping</div>
              <div className="text-xs text-gray-500">Browse catalog</div>
           </button>
           <div className="p-4 bg-white border border-gray-200 rounded-xl text-left opacity-60 cursor-not-allowed">
              <CreditCard className="text-gray-400 mb-2" />
              <div className="font-bold text-gray-900">Payment Methods</div>
              <div className="text-xs text-gray-500">Manage cards</div>
           </div>
           <div className="p-4 bg-white border border-gray-200 rounded-xl text-left opacity-60 cursor-not-allowed">
              <MapPin className="text-gray-400 mb-2" />
              <div className="font-bold text-gray-900">Addresses</div>
              <div className="text-xs text-gray-500">Manage shipping</div>
           </div>
           <div className="p-4 bg-white border border-gray-200 rounded-xl text-left opacity-60 cursor-not-allowed">
              <FileText className="text-gray-400 mb-2" />
              <div className="font-bold text-gray-900">Invoices</div>
              <div className="text-xs text-gray-500">View history</div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const TermsView = ({ onBack }) => (
  <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
      <ArrowLeft size={16} className="mr-2" /> Back
    </button>
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <FileText className="text-blue-600" /> Terms of Service
      </h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
        <p><strong>Effective Date:</strong> January 1, 2024</p>
        <p>Welcome to Wheels Commerce. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
        
        <h3 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h3>
        <p>By registering for a business account, you confirm that you have the authority to bind your organization to these terms.</p>

        <h3 className="text-lg font-bold text-gray-900">2. Pricing & Payment</h3>
        <p>All prices are listed in USD. Volume pricing is subject to change. Net-30 terms are available for qualified business accounts upon credit approval.</p>

        <h3 className="text-lg font-bold text-gray-900">3. Shipping & Delivery</h3>
        <p>We offer free shipping on bulk orders over $500. Delivery times are estimates and not guarantees. Risk of loss passes to you upon delivery to the carrier.</p>

        <h3 className="text-lg font-bold text-gray-900">4. Returns</h3>
        <p>Items may be returned within 30 days of receipt. Custom or bulk orders may be subject to a restocking fee.</p>
      </div>
    </div>
  </div>
);

const PrivacyView = ({ onBack }) => (
  <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
      <ArrowLeft size={16} className="mr-2" /> Back
    </button>
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Shield className="text-green-600" /> Privacy Policy
      </h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
        <p><strong>Last Updated:</strong> January 1, 2024</p>
        <p>Wheels Commerce is committed to protecting your privacy. This policy explains how we collect and use your data.</p>
        
        <h3 className="text-lg font-bold text-gray-900">1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes name, company details, email, and shipping address.</p>

        <h3 className="text-lg font-bold text-gray-900">2. How We Use Information</h3>
        <p>We use your information to process orders, manage your account, send transactional emails, and improve our inventory selection.</p>

        <h3 className="text-lg font-bold text-gray-900">3. Data Security</h3>
        <p>We use industry-standard encryption (SSL) to protect your payment and personal data. We do not sell your data to third parties.</p>
      </div>
    </div>
  </div>
);

const AboutView = ({ onBack }) => (
  <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
      <ArrowLeft size={16} className="mr-2" /> Back
    </button>
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Building2 className="text-blue-600" /> About Wheels Commerce
      </h1>
      <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
        <p className="text-lg leading-relaxed">
          Established in 2024, <strong>Wheels Commerce</strong> has rapidly evolved into the premier logistics and procurement partner for businesses across the nation.
        </p>
        <p>
          We understand that modern businesses need more than just office supplies; they need a reliable supply chain that moves as fast as they do. Our name, "Wheels," represents our commitment to momentum—keeping your business moving forward without interruption.
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-6">Our Mission</h3>
        <p>To streamline B2B procurement through technology-driven logistics and competitive volume pricing.</p>
        <h3 className="text-lg font-bold text-gray-900 mt-6">Why Choose Us?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Speed:</strong> Nationwide delivery network optimized for speed.</li>
          <li><strong>Value:</strong> Direct-to-business wholesale pricing.</li>
          <li><strong>Service:</strong> Dedicated account managers for enterprise clients.</li>
        </ul>
      </div>
    </div>
  </div>
);

const HelpView = ({ onBack }) => (
  <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
      <ArrowLeft size={16} className="mr-2" /> Back
    </button>
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <HelpCircle className="text-blue-600" /> Help Center
      </h1>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">How do I qualify for Net-30 terms?</h4>
              <p className="text-sm text-gray-600 mt-1">Registered businesses with a valid EIN and 6 months of operating history can apply for Net-30 terms through their account dashboard.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">What is your return policy?</h4>
              <p className="text-sm text-gray-600 mt-1">We accept returns on unopened items within 30 days. Defective items can be exchanged immediately. Bulk orders may be subject to a restocking fee.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">Do you offer samples?</h4>
              <p className="text-sm text-gray-600 mt-1">Yes! Enterprise accounts can request product samples for furniture and custom supplies. Contact your account manager.</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-bold text-gray-900 mb-4">Need more help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Mail size={20} className="text-blue-600" />
              <span className="font-medium">Email Support</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Phone size={20} className="text-blue-600" />
              <span className="font-medium">Call 17162952930</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


// --- Main App Logic ---

export default function App() {
  const [view, setView] = useState('shop'); // 'shop', 'wishlist', 'register', 'login', 'profile', 'terms', 'privacy', 'about', 'help'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');
  
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Global loader state

  // Initial App Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // SCROLL TO TOP EFFECT
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // --- Auth Handlers ---
  const handleRegister = (newUser) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = AuthService.register(newUser);
      if (result.success) {
        setUser(result.user);
        setView('shop');
        showToast(`Welcome, ${result.user.firstName}! Account created.`);
      } else {
        showToast(result.message, 'error');
      }
      setIsLoading(false);
    }, 1500); // Simulate network delay
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = AuthService.login(email, password);
      if (result.success) {
        setUser(result.user);
        setView('shop');
        showToast(`Welcome back, ${result.user.firstName}!`);
      } else {
        showToast(result.message, 'error');
      }
      setIsLoading(false);
    }, 1500); // Simulate network delay
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      setView('login');
      showToast('You have been logged out.');
      setIsLoading(false);
    }, 800);
  };

  // --- Processed Products (Filter -> Search -> Sort) ---
  const processedProducts = useMemo(() => {
    let data = [...PRODUCTS];

    if (view === 'wishlist') {
      data = data.filter(p => wishlist.includes(p.id));
    } else if (activeCategory !== 'all') {
      data = data.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q)
      );
    }

    switch (sortOption) {
      case 'price-asc': data.sort((a, b) => a.price - b.price); break;
      case 'price-desc': data.sort((a, b) => b.price - a.price); break;
      case 'rating': data.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return data;
  }, [view, activeCategory, searchQuery, sortOption, wishlist]);


  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
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
    const finalPrice = priceOverride || product.price;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + quantity, price: finalPrice } : item
        );
      }
      return [...prev, { ...product, qty: quantity, price: finalPrice }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
    showToast(`Added ${quantity} items to cart`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, qty: Math.max(1, item.qty + delta) };
      return item;
    }));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (user) {
      showToast("Order placed successfully! (Mock)", "success");
    } else {
      setView('login');
      showToast("Please log in to checkout", "info");
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Navigation Handlers
  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    setView('shop');
    setIsMobileMenuOpen(false);
  };

  const handleWishlistClick = () => {
    setView('wishlist');
    setIsMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (user) {
      setView('profile');
    } else {
      setView('login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      {isLoading && <Loader />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center">
        <span className="font-medium">Fast Nationwide Delivery</span> | Business accounts get <span className="underline cursor-pointer">Net-30 Terms</span>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 -ml-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setActiveCategory('all'); setView('shop'); setSearchQuery('')}}>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Truck size={24} className="transform -scale-x-100" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Wheels<span className="text-blue-600">Commerce</span></h1>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Distribution</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 max-w-2xl relative">
              <input
                type="text"
                placeholder={view === 'wishlist' ? "Search your wishlist..." : "Search products by name, SKU, or category..."}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-4 mr-2">
                 <button 
                   className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                   onClick={handleAccountClick}
                 >
                    <User size={20} className={user ? "text-blue-600 fill-blue-100" : ""} />
                    <span className="text-[10px] font-bold mt-1">{user ? 'PROFILE' : 'LOGIN'}</span>
                 </button>
                 <button 
                    onClick={handleWishlistClick}
                    className={`flex flex-col items-center hover:text-blue-600 relative ${view === 'wishlist' ? 'text-blue-600' : 'text-gray-500'}`}
                 >
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

      {/* VIEW RENDER LOGIC */}
      {view === 'register' ? (
        <RegistrationView 
          onBack={() => setView('shop')} 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setView('login')}
        />
      ) : view === 'login' ? (
        <LoginView 
          onBack={() => setView('shop')} 
          onLogin={handleLogin}
          onSwitchToRegister={() => setView('register')}
        />
      ) : view === 'profile' && user ? (
        <ProfileView 
          user={user} 
          onLogout={handleLogout}
          onBack={() => setView('shop')}
        />
      ) : view === 'terms' ? (
        <TermsView onBack={() => setView('shop')} />
      ) : view === 'privacy' ? (
        <PrivacyView onBack={() => setView('shop')} />
      ) : view === 'about' ? (
        <AboutView onBack={() => setView('shop')} />
      ) : view === 'help' ? (
        <HelpView onBack={() => setView('shop')} />
      ) : (
        /* SHOP & WISHLIST VIEW */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
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
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === cat.id && view === 'shop'
                            ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
                            : 'text-gray-600 hover:bg-gray-100 border-l-4 border-transparent'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Only: User Actions */}
                <div className="lg:hidden border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={18} /> Account
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <button 
                        onClick={() => { handleAccountClick(); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 w-full"
                      >
                        <User size={16} /> {user ? 'My Profile' : 'Login / Register'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { handleWishlistClick(); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 w-full"
                      >
                        <Heart size={16} /> Wishlist
                        {wishlist.length > 0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">{wishlist.length}</span>}
                      </button>
                    </li>
                  </ul>
                </div>

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

            <main className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {view === 'wishlist' ? (
                       <>
                          <Heart className="text-red-500 fill-red-500" /> Your Wishlist
                       </>
                    ) : (
                       activeCategory === 'all' ? 'Featured Products' : CATEGORIES.find(c => c.id === activeCategory)?.name
                    )}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Showing {processedProducts.length} items</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort:</span>
                  <select 
                     className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2 cursor-pointer focus:border-blue-500 outline-none"
                     value={sortOption}
                     onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {view === 'wishlist' && processedProducts.length === 0 ? (
                 <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
                    <Heart className="text-gray-300 mx-auto mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900">Your wishlist is empty</h3>
                    <p className="text-gray-500 mt-2 mb-6">Save items you want to buy later.</p>
                    <Button variant="outline" onClick={() => setView('shop')}>
                       Browse Products
                    </Button>
                 </div>
              ) : processedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {processedProducts.map(product => (
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
                  <Button variant="outline" onClick={() => {setSearchQuery(''); setActiveCategory('all'); setView('shop')}}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

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
                    Your trusted partner in B2B logistics and office procurement. Delivering excellence since 2024.
                 </p>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => setView('shop')} className="hover:text-blue-600">Home</button></li>
                    <li><button onClick={() => setView('about')} className="hover:text-blue-600">About Us</button></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Legal & Support</h4>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li><button onClick={() => setView('terms')} className="hover:text-blue-600">Terms of Service</button></li>
                    <li><button onClick={() => setView('privacy')} className="hover:text-blue-600">Privacy Policy</button></li>
                    <li><button onClick={() => setView('help')} className="hover:text-blue-600">Help Center</button></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
                 <p className="text-sm text-gray-600 mb-2">17162952930</p>
                 <p className="text-sm text-gray-600">support@wheelscommerce.com</p>
              </div>
           </div>
        </div>
        <div className="bg-gray-50 py-4 text-center text-xs text-gray-400 border-t border-gray-100">
           &copy; 2026 Wheels Commerce Distribution. All rights reserved.
        </div>
      </footer>

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={addToCart}
        isLiked={selectedProduct && wishlist.includes(selectedProduct.id)}
        onToggleLike={toggleWishlist}
      />

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
              <Button className="w-full py-4 text-lg shadow-lg shadow-blue-500/20 group" onClick={handleCheckout}>
                Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


