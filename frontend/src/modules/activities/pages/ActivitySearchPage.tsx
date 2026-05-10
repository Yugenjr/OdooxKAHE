import React, { useState } from 'react'
import { Briefcase, Search, Filter, MapPin, Clock, DollarSign } from 'lucide-react'

interface Activity {
  id: number
  name: string
  category: string
  city: string
  duration: number
  cost: number
  image: string
  rating: number
  description: string
}

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    name: 'Eiffel Tower Visit',
    category: 'Sightseeing',
    city: 'Paris',
    duration: 2,
    cost: 25,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    description: 'Visit the iconic Eiffel Tower with skip-the-line tickets',
  },
  {
    id: 2,
    name: 'Street Food Tour',
    category: 'Food',
    city: 'Bangkok',
    duration: 3,
    cost: 15,
    image: 'https://images.unsplash.com/photo-1508009603733-e38d8ea67f3a?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'Explore the vibrant street food scene with a local guide',
  },
  {
    id: 3,
    name: 'Sagrada Familia Tour',
    category: 'Architecture',
    city: 'Barcelona',
    duration: 2.5,
    cost: 30,
    image: 'https://images.unsplash.com/photo-1583420694155-2a76f05a6d5d?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    description: 'Guided tour of Gaudí\'s masterpiece Sagrada Familia',
  },
  {
    id: 4,
    name: 'Broadway Show',
    category: 'Entertainment',
    city: 'New York',
    duration: 3,
    cost: 120,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    description: 'Experience a world-class Broadway musical production',
  },
  {
    id: 5,
    name: 'Desert Safari',
    category: 'Adventure',
    city: 'Dubai',
    duration: 4,
    cost: 60,
    image: 'https://images.unsplash.com/photo-1512453328517-10c14091dc57?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    description: 'Experience the magic of the desert with dune bashing and camping',
  },
  {
    id: 6,
    name: 'Sumo Wrestling',
    category: 'Cultural',
    city: 'Tokyo',
    duration: 3,
    cost: 50,
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d4?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    description: 'Watch traditional sumo wrestling tournaments',
  },
]

const CATEGORIES = ['All', 'Sightseeing', 'Food', 'Adventure', 'Cultural', 'Entertainment', 'Architecture']

const ActivitySearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxCost, setMaxCost] = useState(150)

  const filteredActivities = ACTIVITIES.filter(
    (activity) =>
      (activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || activity.category === selectedCategory) &&
      activity.cost <= maxCost
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold">Activity Search</h1>
          </div>
          <p className="text-white/60">Find amazing activities and experiences</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search activities, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-white/80">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white'
                      : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cost Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-white/80">Max Cost: ${maxCost}</label>
            <input
              type="range"
              min="0"
              max="150"
              value={maxCost}
              onChange={(e) => setMaxCost(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 bg-white/5 hover:bg-white/10 transform hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 right-4 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/50 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-yellow-200">★ {activity.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{activity.name}</h3>
                <p className="text-white/60 text-xs mb-4 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {activity.city} • {activity.category}
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between text-white/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span>{activity.duration}h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span>${activity.cost}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4">{activity.description}</p>
                <button className="w-full bg-gradient-to-r from-cyan-600/50 to-blue-600/50 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                  Add to Itinerary
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No activities found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivitySearchPage
