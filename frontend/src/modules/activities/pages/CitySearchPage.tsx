import React, { useState } from 'react'
import { MapPin, Search, Filter, Star, DollarSign, TrendingUp } from 'lucide-react'

interface City {
  id: number
  name: string
  country: string
  image: string
  costIndex: number
  popularity: number
  description: string
}

const CITIES: City[] = [
  {
    id: 1,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d4?q=80&w=1200&auto=format&fit=crop',
    costIndex: 85,
    popularity: 95,
    description: 'Modern metropolis with ancient temples',
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    costIndex: 90,
    popularity: 98,
    description: 'City of light and romance',
  },
  {
    id: 3,
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603733-e38d8ea67f3a?q=80&w=1200&auto=format&fit=crop',
    costIndex: 45,
    popularity: 88,
    description: 'Vibrant street food and temples',
  },
  {
    id: 4,
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583420694155-2a76f05a6d5d?q=80&w=1200&auto=format&fit=crop',
    costIndex: 75,
    popularity: 92,
    description: 'Gaudí architecture and beaches',
  },
  {
    id: 5,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop',
    costIndex: 95,
    popularity: 99,
    description: 'The city that never sleeps',
  },
  {
    id: 6,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453328517-10c14091dc57?q=80&w=1200&auto=format&fit=crop',
    costIndex: 100,
    popularity: 90,
    description: 'Luxury shopping and desert adventures',
  },
]

const CitySearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [filterCost, setFilterCost] = useState(100)

  const filteredCities = CITIES.filter(
    (city) =>
      (city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
      city.costIndex <= filterCost
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-bold">City Search</h1>
          </div>
          <p className="text-white/60">Discover amazing cities for your next adventure</p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cities or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="text-indigo-400 w-5 h-5" />
            <input
              type="range"
              min="0"
              max="100"
              value={filterCost}
              onChange={(e) => setFilterCost(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-white/60">Cost: ${filterCost}</span>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => setSelectedCity(city)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 bg-white/5 hover:bg-white/10 transform hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-1">{city.name}</h3>
                <p className="text-white/60 text-sm mb-4">{city.country}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span>Cost Index</span>
                    </div>
                    <span className="font-semibold">{city.costIndex}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>Popularity</span>
                    </div>
                    <span className="font-semibold">{city.popularity}%</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-indigo-600/50 to-blue-600/50 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* City Details Modal */}
        {selectedCity && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCity(null)}>
            <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedCity(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition"
              >
                ✕
              </button>
              <img src={selectedCity.image} alt={selectedCity.name} className="w-full h-64 object-cover rounded-lg mb-6" />
              <h2 className="text-3xl font-bold mb-2">{selectedCity.name}</h2>
              <p className="text-white/60 mb-4">{selectedCity.country}</p>
              <p className="text-white/80 mb-6">{selectedCity.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-white/60 text-sm mb-1">Cost Index</div>
                  <div className="text-2xl font-bold">{selectedCity.costIndex}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-white/60 text-sm mb-1">Popularity</div>
                  <div className="text-2xl font-bold">{selectedCity.popularity}%</div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Add to Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CitySearchPage
