import React, { useState } from 'react'
import { MapPin, Search, DollarSign, TrendingUp, X } from 'lucide-react'

interface City { id: number; name: string; country: string; image: string; costIndex: number; popularity: number; description: string }

const CITIES: City[] = [
  { id: 1, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1200&auto=format&fit=crop', costIndex: 85, popularity: 95, description: 'Modern metropolis with ancient temples and world-class cuisine.' },
  { id: 2, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop', costIndex: 90, popularity: 98, description: 'City of light, romance, and iconic architecture.' },
  { id: 3, name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop', costIndex: 45, popularity: 88, description: 'Vibrant street food, temples, and nightlife.' },
  { id: 4, name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop', costIndex: 75, popularity: 92, description: 'Gaudí architecture, beaches, and tapas culture.' },
  { id: 5, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop', costIndex: 95, popularity: 99, description: 'The city that never sleeps — culture, food, and skyline.' },
  { id: 6, name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop', costIndex: 100, popularity: 90, description: 'Luxury shopping, desert adventures, and futuristic skyline.' },
]

const CitySearchPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [filterCost, setFilterCost] = useState(100)
  const [selected, setSelected] = useState<City | null>(null)

  const filtered = CITIES.filter(
    (c) => (c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase())) && c.costIndex <= filterCost
  )

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-7 h-7 text-[#e8614a]" />
          <h1 className="text-3xl font-bold">City Search</h1>
        </div>
        <p className="text-white/40 mb-8">Discover amazing cities for your next adventure</p>

        {/* Search + filter */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text" placeholder="Search cities or countries..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
            />
          </div>
          <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2.5">
            <span className="text-xs text-white/40 whitespace-nowrap">Cost ≤ {filterCost}</span>
            <input type="range" min="0" max="100" value={filterCost} onChange={(e) => setFilterCost(Number(e.target.value))} className="w-28 accent-[#e8614a]" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((city) => (
            <div key={city.id} onClick={() => setSelected(city)} className="group cursor-pointer bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#e8614a]/40 transition hover:-translate-y-1 duration-300">
              <div className="relative h-44 overflow-hidden">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-0.5">{city.name}</h3>
                <p className="text-white/40 text-sm mb-4">{city.country}</p>
                <div className="flex justify-between text-sm mb-4">
                  <span className="flex items-center gap-1.5 text-white/50"><DollarSign className="w-3.5 h-3.5 text-[#e8614a]/70" />Cost {city.costIndex}</span>
                  <span className="flex items-center gap-1.5 text-white/50"><TrendingUp className="w-3.5 h-3.5 text-[#e8614a]/70" />{city.popularity}%</span>
                </div>
                <button className="w-full py-2 bg-[#e8614a]/15 hover:bg-[#e8614a]/30 border border-[#e8614a]/25 text-[#e8614a] text-sm font-semibold rounded-lg transition">
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/40 hover:text-white transition"><X className="w-5 h-5" /></button>
            <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover rounded-xl mb-5" />
            <h2 className="text-2xl font-bold mb-1">{selected.name}</h2>
            <p className="text-white/40 text-sm mb-3">{selected.country}</p>
            <p className="text-white/60 text-sm mb-5">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/[0.05] p-3 rounded-lg"><p className="text-white/40 text-xs mb-1">Cost Index</p><p className="text-xl font-bold">{selected.costIndex}</p></div>
              <div className="bg-white/[0.05] p-3 rounded-lg"><p className="text-white/40 text-xs mb-1">Popularity</p><p className="text-xl font-bold">{selected.popularity}%</p></div>
            </div>
            <button className="w-full py-2.5 bg-[#e8614a] hover:bg-[#d4503a] text-white font-semibold rounded-lg transition">Add to Trip</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitySearchPage
