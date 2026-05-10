import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Calendar, ArrowRight, Edit2, Trash2, Plus, MoreVertical } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';

const MOCK_TRIPS = [
  {
    id: 1,
    title: 'Summer in Greece',
    destination: 'Santorini, Greece',
    startDate: 'Jun 15, 2025',
    endDate: 'Jun 22, 2025',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Nordic Explorer',
    destination: 'Scandinavia',
    startDate: 'Jul 1, 2025',
    endDate: 'Jul 12, 2025',
    image: 'https://images.unsplash.com/photo-1531366936336-62fc67463b44?q=80&w=800&auto=format&fit=crop',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Tokyo to Kyoto Adventure',
    destination: 'Japan',
    startDate: 'Mar 15, 2025',
    endDate: 'Mar 25, 2025',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
    status: 'completed'
  }
];

export const MyTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredTrips = filter === 'all' 
    ? MOCK_TRIPS 
    : MOCK_TRIPS.filter(trip => trip.status === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-outfit">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="bg-[#050505]/50 backdrop-blur-2xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
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
                <a href="#" className="text-white hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group relative">
                  <span>My Trips</span>
                  <span className="w-1 h-1 bg-cyan-500 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2" />
                </a>
                <a href="/app/inspiration" onClick={(e) => { e.preventDefault(); navigate('/app/inspiration'); }} className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>Inspiration</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Profile */}
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">My Trips</h1>
            <p className="text-white/60 text-lg">Manage, view, and share all your incredible journeys.</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/app/trips/create')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-2xl font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Trip</span>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
          </motion.button>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          {(['all', 'upcoming', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                filter === f 
                ? 'bg-white/10 text-white border border-white/20' 
                : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Trips Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTrips.map((trip) => (
            <motion.div 
              key={trip.id}
              variants={itemVariants}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => navigate(`/app/trips/${trip.id}`)}>
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold border ${
                    trip.status === 'upcoming' 
                    ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/30' 
                    : 'bg-green-500/20 text-green-200 border-green-500/30'
                  }`}>
                    {trip.status.toUpperCase()}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors cursor-pointer" onClick={() => navigate(`/app/trips/${trip.id}`)}>
                  {trip.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>{trip.startDate} - {trip.endDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => navigate(`/app/trips/${trip.id}`)}
                    className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};
