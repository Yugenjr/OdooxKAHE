import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, Share2, Compass } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';

const INSPIRATION_DATA = [
  {
    id: 1,
    title: 'Hidden Gems of Kyoto',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    likes: 1240,
    author: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: 2,
    title: 'Alpine Escapes: Switzerland',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
    likes: 892,
    author: 'Mark T.',
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: 3,
    title: 'Culinary Tour of Italy',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7e0cb?q=80&w=800&auto=format&fit=crop',
    likes: 2100,
    author: 'Chef Mario',
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: 4,
    title: 'Bali: Island of Gods',
    category: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    likes: 3400,
    author: 'Wanderlust Daily',
    avatar: 'https://i.pravatar.cc/150?u=4'
  },
  {
    id: 5,
    title: 'Northern Lights Safari',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=800&auto=format&fit=crop',
    likes: 4500,
    author: 'Nordic Explorer',
    avatar: 'https://i.pravatar.cc/150?u=5'
  },
  {
    id: 6,
    title: 'Moroccan Architecture',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop',
    likes: 1800,
    author: 'Design Mag',
    avatar: 'https://i.pravatar.cc/150?u=6'
  }
];

export const InspirationPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Culture', 'Nature', 'Adventure', 'Food', 'Relaxation'];

  const filteredData = activeCategory === 'All' 
    ? INSPIRATION_DATA 
    : INSPIRATION_DATA.filter(item => item.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-outfit">
      {/* Animated background gradient matching Dashboard */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="bg-[#050505]/50 backdrop-blur-2xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div 
                className="flex items-center space-x-4 group cursor-pointer"
                onClick={() => navigate('/app/dashboard')}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/50">
                    T
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-indigo-200 group-hover:via-blue-200 group-hover:to-cyan-200 transition-all duration-300">Traveloop</span>
                </div>
              </div>

              {/* Center Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="/app/dashboard" onClick={(e) => { e.preventDefault(); navigate('/app/dashboard'); }} className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>Dashboard</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/app/trips" onClick={(e) => { e.preventDefault(); navigate('/app/trips'); }} className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>My Trips</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-white hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group relative">
                  <span>Inspiration</span>
                  <span className="w-1 h-1 bg-cyan-500 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2" />
                </a>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2">
                <button className="relative p-3 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                  <Bell className="w-5 h-5 text-white/70 group-hover:text-white group-hover:text-indigo-400 transition-colors" />
                </button>
                <button className="relative ml-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-500/50">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Compass className="w-12 h-12 text-cyan-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Find Your Next Journey
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Explore curated travel stories, stunning photography, and hidden gems shared by our global community of explorers.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category 
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25 scale-105' 
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredData.map((item) => (
            <motion.div 
              variants={itemVariants}
              key={item.id} 
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-[400px]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-cyan-500 hover:text-white transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full border border-white/50" />
                      <span className="text-sm font-medium text-white/90">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-400">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-xs font-bold">{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};
