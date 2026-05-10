import React, { useState } from 'react'
import {
  MapPin,
  Search,
  Filter,
  Star,
  IndianRupee,
  TrendingUp,
  X,
  CheckCircle
} from 'lucide-react'

interface City {
  id: number
  name: string
  country: string
  image: string
  costIndex: number
  popularity: number
  description: string
  estimatedBudget: number
}

const CITIES: City[] = [
  {
    id: 1,
    name: 'Tokyo',
    country: 'Japan',
    image:
      'https://images.unsplash.com/photo-1540959375944-7049f642e9d4?q=80&w=1200&auto=format&fit=crop',
    costIndex: 85,
    popularity: 95,
    estimatedBudget: 180000,
    description:
      'Modern metropolis with ancient temples and incredible food culture.'
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    costIndex: 90,
    popularity: 98,
    estimatedBudget: 220000,
    description:
      'Romantic city filled with iconic landmarks and rich history.'
  },
  {
    id: 3,
    name: 'Bangkok',
    country: 'Thailand',
    image:
      'https://images.unsplash.com/photo-1508009603733-e38d8ea67f3a?q=80&w=1200&auto=format&fit=crop',
    costIndex: 45,
    popularity: 88,
    estimatedBudget: 65000,
    description:
      'Affordable paradise with vibrant nightlife and street food.'
  },
  {
    id: 4,
    name: 'Barcelona',
    country: 'Spain',
    image:
      'https://images.unsplash.com/photo-1583420694155-2a76f05a6d5d?q=80&w=1200&auto=format&fit=crop',
    costIndex: 75,
    popularity: 92,
    estimatedBudget: 160000,
    description:
      'Beautiful beaches, Gaudí architecture and amazing culture.'
  },
  {
    id: 5,
    name: 'New York',
    country: 'USA',
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop',
    costIndex: 95,
    popularity: 99,
    estimatedBudget: 250000,
    description:
      'The city that never sleeps with endless entertainment.'
  },
  {
    id: 6,
    name: 'Dubai',
    country: 'UAE',
    image:
      'https://images.unsplash.com/photo-1512453328517-10c14091dc57?q=80&w=1200&auto=format&fit=crop',
    costIndex: 100,
    popularity: 90,
    estimatedBudget: 200000,
    description:
      'Luxury experiences, skyscrapers and desert adventures.'
  },

  // NEW CITIES
  {
    id: 7,
    name: 'Chennai',
    country: 'India',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop',
    costIndex: 35,
    popularity: 80,
    estimatedBudget: 30000,
    description:
      'Cultural capital of South India with beaches and temples.'
  },
  {
    id: 8,
    name: 'Bali',
    country: 'Indonesia',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    costIndex: 55,
    popularity: 94,
    estimatedBudget: 85000,
    description:
      'Tropical paradise perfect for beaches and relaxation.'
  },
  {
    id: 9,
    name: 'Singapore',
    country: 'Singapore',
    image:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop',
    costIndex: 80,
    popularity: 93,
    estimatedBudget: 140000,
    description:
      'Futuristic city with world-class attractions and food.'
  },
  {
    id: 10,
    name: 'Seoul',
    country: 'South Korea',
    image:
      'https://images.unsplash.com/photo-1538485399081-7c8973d8d8b1?q=80&w=1200&auto=format&fit=crop',
    costIndex: 70,
    popularity: 91,
    estimatedBudget: 125000,
    description:
      'K-culture hotspot with shopping, nightlife and traditions.'
  }
]

const CitySearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] =
    useState<City | null>(null)

  const [filterCost, setFilterCost] =
    useState(100)

  const [tripCities, setTripCities] = useState<
    City[]
  >([])

  const [showSuccess, setShowSuccess] =
    useState(false)

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const handleAddToTrip = (city: City) => {
    const alreadyAdded = tripCities.find(
      (c) => c.id === city.id
    )

    if (alreadyAdded) return

    setTripCities((prev) => [...prev, city])

    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
    }, 2000)
  }

  const filteredCities = CITIES.filter(
    (city) =>
      (city.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        city.country
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      city.costIndex <= filterCost
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-indigo-400" />

            <h1 className="text-4xl font-bold">
              City Search
            </h1>
          </div>

          <p className="text-white/60">
            Discover amazing cities for your next
            adventure
          </p>
        </div>

        {/* Added Cities */}
        {tripCities.length > 0 && (
          <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Added To Trip
            </h2>

            <div className="flex flex-wrap gap-3">
              {tripCities.map((city) => (
                <div
                  key={city.id}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-sm font-semibold"
                >
                  {city.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search + Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search cities or countries..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4">
            <Filter className="text-indigo-400 w-5 h-5" />

            <input
              type="range"
              min="0"
              max="100"
              value={filterCost}
              onChange={(e) =>
                setFilterCost(
                  Number(e.target.value)
                )
              }
              className="flex-1"
            />

            <span className="text-sm text-white/60">
              Cost Index: {filterCost}
            </span>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => {
            const added = tripCities.find(
              (c) => c.id === city.id
            )

            return (
              <div
                key={city.id}
                className="group rounded-3xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 bg-white/5 hover:bg-white/10 hover:scale-[1.02]"
              >
                {/* Image */}
                <div
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() =>
                    setSelectedCity(city)
                  }
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold">
                      {city.name}
                    </h3>

                    <p className="text-white/70">
                      {city.country}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-white/60 text-sm mb-5">
                    {city.description}
                  </p>

                  <div className="space-y-3">
                    {/* Budget */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-400" />

                        <span className="text-sm">
                          Estimated Budget
                        </span>
                      </div>

                      <span className="font-bold text-green-400">
                        {formatCurrency(
                          city.estimatedBudget
                        )}
                      </span>
                    </div>

                    {/* Cost */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />

                        <span className="text-sm">
                          Cost Index
                        </span>
                      </div>

                      <span className="font-semibold">
                        {city.costIndex}
                      </span>
                    </div>

                    {/* Popularity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />

                        <span className="text-sm">
                          Popularity
                        </span>
                      </div>

                      <span className="font-semibold">
                        {city.popularity}%
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() =>
                      handleAddToTrip(city)
                    }
                    disabled={!!added}
                    className={`w-full mt-5 font-semibold py-3 rounded-xl transition-all duration-300 ${
                      added
                        ? 'bg-green-600/30 text-green-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:scale-105'
                    }`}
                  >
                    {added
                      ? 'Added To Trip'
                      : 'Add To Trip'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal */}
        {selectedCity && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() =>
              setSelectedCity(null)
            }
          >
            <div
              className="relative bg-[#0d0d0d] rounded-3xl border border-white/10 max-w-3xl w-full p-8"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* Close */}
              <button
                onClick={() =>
                  setSelectedCity(null)
                }
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {/* Image */}
              <img
                src={selectedCity.image}
                alt={selectedCity.name}
                className="w-full h-72 object-cover rounded-2xl mb-6"
              />

              {/* Info */}
              <h2 className="text-4xl font-bold mb-2">
                {selectedCity.name}
              </h2>

              <p className="text-white/60 mb-5">
                {selectedCity.country}
              </p>

              <p className="text-white/80 mb-8 leading-relaxed">
                {selectedCity.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div className="text-white/60 text-sm mb-2">
                    Estimated Budget
                  </div>

                  <div className="text-2xl font-bold text-green-400">
                    {formatCurrency(
                      selectedCity.estimatedBudget
                    )}
                  </div>
                </div>

                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div className="text-white/60 text-sm mb-2">
                    Cost Index
                  </div>

                  <div className="text-2xl font-bold">
                    {selectedCity.costIndex}
                  </div>
                </div>

                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div className="text-white/60 text-sm mb-2">
                    Popularity
                  </div>

                  <div className="text-2xl font-bold">
                    {selectedCity.popularity}%
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  handleAddToTrip(selectedCity)
                }
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
              >
                Add To Trip
              </button>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
            <CheckCircle className="w-5 h-5" />

            <span className="font-semibold">
              City added to trip successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CitySearchPage