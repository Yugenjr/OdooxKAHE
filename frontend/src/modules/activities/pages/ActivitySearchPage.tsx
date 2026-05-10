import React, { useState } from 'react'
import { Search, MapPin, Clock, DollarSign } from 'lucide-react'

interface Activity { id: number; name: string; category: string; city: string; duration: number; cost: number; image: string; rating: number; description: string }

const ACTIVITIES: Activity[] = [
  { id: 1, name: 'Eiffel Tower Visit', category: 'Sightseeing', city: 'Paris', duration: 2, cost: 25, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop', rating: 4.8, description: 'Visit the iconic Eiffel Tower with skip-the-line tickets.' },
  { id: 2, name: 'Street Food Tour', category: 'Food', city: 'Bangkok', duration: 3, cost: 15, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop', rating: 4.9, description: 'Explore the vibrant street food scene with a local guide.' },
  { id: 3, name: 'Sagrada Familia Tour', category: 'Architecture', city: 'Barcelona', duration: 2.5, cost: 30, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop', rating: 4.7, description: "Guided tour of Gaudí's masterpiece Sagrada Familia." },
  { id: 4, name: 'Broadway Show', category: 'Entertainment', city: 'New York', duration: 3, cost: 120, image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop', rating: 4.8, description: 'Experience a world-class Broadway musical production.' },
  { id: 5, name: 'Desert Safari', category: 'Adventure', city: 'Dubai', duration: 4, cost: 60, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop', rating: 4.6, description: 'Dune bashing, camel rides, and desert camping.' },
  { id: 6, name: 'Sumo Wrestling', category: 'Cultural', city: 'Tokyo', duration: 3, cost: 50, image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=800&auto=format&fit=crop', rating: 4.7, description: 'Watch traditional sumo wrestling tournaments.' },
]

const CATEGORIES = ['All', 'Sightseeing', 'Food', 'Adventure', 'Cultural', 'Entertainment', 'Architecture']

const ActivitySearchPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [maxCost, setMaxCost] = useState(150)

  const filtered = ACTIVITIES.filter(
    (a) =>
      (a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase())) &&
      (category === 'All' || a.category === category) &&
      a.cost <= maxCost
  )

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Activity Search</h1>
        <p className="text-white/40 mb-8">Find amazing activities and experiences</p>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text" placeholder="Search activities, cities..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  category === cat
                    ? 'bg-[#e8614a]/15 text-[#e8614a] border-[#e8614a]/30'
                    : 'text-white/40 border-white/[0.08] hover:text-white/70 hover:bg-white/[0.05]'
                }`}
              >{cat}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-white/40 whitespace-nowrap">Max ${maxCost}</span>
            <input type="range" min="0" max="150" value={maxCost} onChange={(e) => setMaxCost(Number(e.target.value))} className="w-28 accent-[#e8614a]" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div key={a.id} className="group bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#e8614a]/40 transition hover:-translate-y-1 duration-300">
              <div className="relative h-44 overflow-hidden">
                <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/40 border border-white/20 px-2 py-0.5 rounded-full">
                  <span className="text-xs font-bold text-[#e8614a]">★</span>
                  <span className="text-xs text-white/70 ml-1">{a.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-1">{a.name}</h3>
                <p className="text-white/40 text-xs mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />{a.city} · {a.category}</p>
                <div className="flex justify-between text-xs text-white/50 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#e8614a]/60" />{a.duration}h</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-[#e8614a]/60" />₹{a.cost}</span>
                </div>
                <p className="text-white/40 text-xs mb-4 leading-relaxed">{a.description}</p>
                <button className="w-full py-2 bg-[#e8614a]/15 hover:bg-[#e8614a]/30 border border-[#e8614a]/25 text-[#e8614a] text-sm font-semibold rounded-lg transition">
                  Add to Itinerary
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <p className="text-center text-white/30 text-sm py-12">No activities found. Try adjusting your filters.</p>}
      </div>
    </div>
  )
}

export default ActivitySearchPage
