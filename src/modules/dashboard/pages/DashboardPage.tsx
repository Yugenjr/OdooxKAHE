import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Settings, MapPin, Clock, ArrowRight, Sparkles, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { motion, AnimatePresence } from 'framer-motion'

// Categories with multiple sample destinations per category
type Category = {
  id: number
  name: string
  image: string
  accent?: string
  featured: {
    name: string
    country: string
    image: string
    price: number
  }
  samples: { name: string; country: string; image: string }[]
}

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Adventure',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    featured: {
      name: 'Patagonia Trek',
      country: 'Chile',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
      price: 18900,
    },
    samples: [
      { name: 'New Zealand', country: 'NZ', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop' },
      { name: 'Peru', country: 'Peru', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 2,
    name: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    featured: {
      name: 'Maldives Escape',
      country: 'Maldives',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      price: 27200,
    },
    samples: [
      { name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
      { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 3,
    name: 'Family',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    featured: {
      name: 'Orlando Fun',
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      price: 9800,
    },
    samples: [
      { name: 'Orlando', country: 'USA', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop' },
      { name: 'Disneyland', country: 'USA', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 4,
    name: 'Shopping',
    image: 'https://images.unsplash.com/photo-1520975912998-0b4a3c9a0c9f?q=80&w=1200&auto=format&fit=crop',
    featured: {
      name: 'Milan Fashion',
      country: 'Italy',
      image: 'https://images.unsplash.com/photo-1520975912998-0b4a3c9a0c9f?q=80&w=1200&auto=format&fit=crop',
      price: 7600,
    },
    samples: [
      { name: 'Milan', country: 'Italy', image: 'https://images.unsplash.com/photo-1520975912998-0b4a3c9a0c9f?q=80&w=600&auto=format&fit=crop' },
      { name: 'Dubai Mall', country: 'UAE', image: 'https://images.unsplash.com/photo-1520975912998-0b4a3c9a0c9f?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 5,
    name: 'Nightlife',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
    featured: {
      name: 'Ibiza Nights',
      country: 'Spain',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      price: 13250,
    },
    samples: [
      { name: 'Ibiza', country: 'Spain', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop' },
      { name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop' },
    ],
  },
]

const RECENT_TRIPS = [
  {
    id: 1,
    title: 'Tokyo to Kyoto Adventure',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop',
    destination: 'Japan',
    date: 'Mar 15 - Mar 25, 2025',
    budget: 2500,
    spent: 2180,
    rating: 4.9,
  },
  {
    id: 2,
    title: 'European Grand Tour',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
    destination: 'Europe',
    date: 'Apr 1 - Apr 20, 2025',
    budget: 4500,
    spent: 4200,
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Southeast Asia Explorer',
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad35b6789?q=80&w=600&auto=format&fit=crop',
    destination: 'Southeast Asia',
    date: 'May 5 - May 18, 2025',
    budget: 2800,
    spent: 2650,
    rating: 5.0,
  },
]

const UPCOMING_TRIPS = [
  {
    id: 1,
    title: 'Summer in Greece',
    destination: 'Greece',
    startDate: 'Jun 15, 2025',
    days: 7,
    budget: 3500,
  },
  {
    id: 2,
    title: 'Nordic Explorer',
    destination: 'Scandinavia',
    startDate: 'Jul 1, 2025',
    days: 12,
    budget: 5000,
  },
]

// HeroCard component for the large featured category with crossfade animation
const HeroCard: React.FC<{
  selectedId: number
  categories: Category[]
}> = ({ selectedId, categories }) => {
  const navigate = useNavigate()
  const category = categories.find((c) => c.id === selectedId) || categories[0]

  return (
    <div className="w-full h-full relative bg-black/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={category.id}
          src={category.featured.image}
          alt={category.featured.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute left-8 bottom-8 z-20 max-w-2xl">
        <p className="text-xs text-indigo-200 uppercase tracking-widest mb-2">{category.name}</p>
        <h3 className="text-5xl font-extrabold leading-tight mb-3">{category.featured.name}</h3>
        <p className="text-white/80 mb-6">Explore curated {category.name.toLowerCase()} experiences across the world.</p>

        <div className="flex items-center gap-4 mb-6">
          {category.samples.slice(0, 3).map((s) => (
            <span key={s.name} className="px-3 py-1 bg-white/10 rounded-full text-sm">{s.name}</span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-white/60">Starts from</p>
            <p className="text-3xl font-bold text-yellow-300">₹ {category.featured.price}</p>
          </div>
          <button
            onClick={() => navigate(`/app/trips/create?category=${encodeURIComponent(category.name)}`)}
            className="bg-white text-black rounded-full px-6 py-3 font-semibold shadow-md"
          >
            Explore Now →
          </button>
        </div>
      </div>
    </div>
  )
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const [groupBy, setGroupBy] = useState('region')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedId, setSelectedId] = useState(CATEGORIES[0].id)

  const handlePlanTrip = () => {
    navigate('/app/trips/create')
  }

  const handleViewTrip = (tripId: number) => {
    navigate(`/app/trips/${tripId}`)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0">
        {/* Gradient border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        
        <div className="bg-[#050505]/50 backdrop-blur-2xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/50">
                    T
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-indigo-200 group-hover:via-blue-200 group-hover:to-cyan-200 transition-all duration-300">Traveloop</span>
                  <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Premium Travel Platform</p>
                </div>
              </div>

              {/* Center Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>Explore</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>My Trips</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>Inspiration</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <button className="relative p-3 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                  <Bell className="w-5 h-5 text-white/70 group-hover:text-white group-hover:text-indigo-400 transition-colors" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Settings */}
                <button className="p-3 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                  <Settings className="w-5 h-5 text-white/70 group-hover:text-white group-hover:text-indigo-400 transition-colors" />
                </button>

                {/* Profile Menu */}
                <button className="relative ml-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-xs font-bold group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-all">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col items-start text-xs">
                      <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{user?.name || 'User'}</span>
                      <span className="text-white/50 text-xs">Premium</span>
                    </div>
                  </div>
                  <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm py-2 min-w-max shadow-xl">
                    <button className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      Preferences
                    </button>
                    <div className="h-px bg-white/10 my-2" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                      Logout
                    </button>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accent line animation */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'Traveler'}!</h1>
              <p className="text-white/60 text-lg">Continue planning your next adventure or explore new destinations</p>
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <div className="mb-12 rounded-3xl overflow-hidden h-64 bg-gradient-to-r from-indigo-600/30 via-blue-600/20 to-cyan-600/30 border border-white/10 backdrop-blur-sm relative group">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
            alt="Banner"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-[#050505]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/40 text-xl">Discover Your Next Adventure</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
              <input
                type="text"
                placeholder="Search for destinations, dates, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              <option value="region">Group by</option>
              <option value="region">Region</option>
              <option value="date">Date</option>
              <option value="budget">Budget</option>
            </select>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300">
              Filter
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              <option value="recent">Sort by...</option>
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </section>

        {/* Quick Stats / Budget Highlights */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold">Total Budget</h3>
            </div>
            <p className="text-3xl font-bold mb-2">$9,800</p>
            <p className="text-white/60 text-sm">Across 2 upcoming trips</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold">Total Spent</h3>
            </div>
            <p className="text-3xl font-bold mb-2">$9,030</p>
            <p className="text-white/60 text-sm">On 3 completed trips</p>
          </div>
        </section>

        {/* Upcoming Trips */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold">Upcoming Trips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {UPCOMING_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{trip.title}</h3>
                    <p className="text-white/60 text-sm">{trip.destination}</p>
                  </div>
                  <Calendar className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Start Date</span>
                    <span className="font-semibold">{trip.startDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Duration</span>
                    <span className="font-semibold">{trip.days} days</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Budget</span>
                    <span className="font-semibold text-green-400">${trip.budget.toLocaleString()}</span>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-indigo-600/50 to-blue-600/50 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Regional Selections / Featured Categories */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Top Regional Selections</h2>
          </div>

          {/* Featured hero + vertical categories */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            {/* Large hero card (left) */}
            <div className="lg:col-span-3 rounded-3xl overflow-hidden relative border border-white/10 bg-white/3">
              <HeroCard selectedId={selectedId} categories={CATEGORIES} />
            </div>

            {/* Vertical categories (right) */}
            <div className="col-span-1 flex flex-col gap-4 items-stretch">
                {CATEGORIES.map((cat) => {
                  const isActive = cat.id === selectedId
                  return (
                    <motion.div
                      key={cat.id}
                      onMouseEnter={() => setSelectedId(cat.id)}
                      onFocus={() => setSelectedId(cat.id)}
                      onMouseLeave={() => setSelectedId(CATEGORIES[0].id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate(`/app/trips/create?category=${encodeURIComponent(cat.name)}`)
                        }
                      }}
                      className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer flex items-center justify-center`}
                      style={{ height: '220px' }}
                      initial={{ scale: 1 }}
                      animate={{ scale: isActive ? 1.05 : 1 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                      tabIndex={0}
                      aria-label={cat.name}
                    >
                      <motion.img
                        src={cat.image}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        animate={{ scale: isActive ? 1.08 : 1.0 }}
                        transition={{ duration: 0.6 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />

                      <div className="relative z-10 text-white font-bold text-lg tracking-wider flex items-center justify-center" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                        {cat.name.toUpperCase()}
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key={`overlay-${cat.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/30 flex items-end p-4"
                          >
                            <div className="text-white">
                              <div className="text-sm font-semibold">{cat.featured.name}</div>
                              <div className="text-xs text-white/70">from ₹{cat.featured.price}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                    </motion.div>
                  )
                })}
            </div>
          </div>
        </section>

        {/* Recent Trips / Previous Trips */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold">Previous Trips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 bg-white/5 hover:bg-white/10 transform hover:scale-105"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/50 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-xs font-bold text-yellow-200">★</span>
                    <span className="text-xs font-semibold text-yellow-200">{trip.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-indigo-300 transition-colors">{trip.title}</h3>
                  <div className="space-y-3 text-sm text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs">{trip.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-xs">${trip.spent} / ${trip.budget}</span>
                      </div>
                      <span className="text-xs text-white/50">{Math.round((trip.spent / trip.budget) * 100)}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewTrip(trip.id)}
                    className="w-full bg-gradient-to-r from-indigo-600/50 to-blue-600/50 hover:from-indigo-600 hover:to-blue-600 text-white text-sm font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Plan a Trip Button */}
      <div className="fixed bottom-8 right-8 z-30">
        <button
          onClick={handlePlanTrip}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full blur-lg group-hover:blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300" />
          <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg transform group-hover:scale-110">
            <span className="text-2xl">+</span>
            <span>Plan a Trip</span>
          </div>
        </button>
      </div>
    </div>
  )
}
