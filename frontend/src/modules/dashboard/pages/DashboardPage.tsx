import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, DollarSign, ArrowRight, Plus } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const REGIONAL_SELECTIONS = [
  { id: 1, name: 'Adventure', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Honeymoon', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Family', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Shopping', image: 'https://images.unsplash.com/photo-1520975912998-0b4a3c9a0c9f?q=80&w=600&auto=format&fit=crop' },
  { id: 5, name: 'Nightlife', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop' },
]

const PREVIOUS_TRIPS = [
  { id: 1, title: 'Tokyo to Kyoto Adventure', destination: 'Japan', date: 'Mar 15 – Mar 25, 2025', spent: 2180, budget: 2500, rating: 4.9, image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'European Grand Tour', destination: 'Europe', date: 'Apr 1 – Apr 20, 2025', spent: 4200, budget: 4500, rating: 4.8, image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Southeast Asia Explorer', destination: 'Southeast Asia', date: 'May 5 – May 18, 2025', spent: 2650, budget: 2800, rating: 5.0, image: 'https://images.unsplash.com/photo-1537225228614-b4fad35b6789?q=80&w=600&auto=format&fit=crop' },
]

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8]">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Banner */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/[0.07]">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1400&auto=format&fit=crop"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/70 via-[#0d0d0d]/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white drop-shadow">Welcome back, {user?.name || 'Traveler'}!</h2>
            <p className="text-white/60 mt-1 text-sm">Plan your next adventure</p>
          </div>
        </div>

        {/* Search + controls */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search bar ......"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
            />
          </div>
          {['Group by', 'Filter', 'Sort by...'].map((label) => (
            <button key={label} className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/50 hover:text-[#f0ede8] hover:bg-white/10 transition whitespace-nowrap">
              {label}
            </button>
          ))}
        </div>

        {/* Top Regional Selections */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold">Top Regional Selections</h2>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {REGIONAL_SELECTIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/app/trips/create?category=' + encodeURIComponent(item.name))}
                className="relative h-28 rounded-xl overflow-hidden border border-white/[0.07] cursor-pointer group hover:border-[#e8614a]/40 transition"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />
                <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold text-white/80 group-hover:text-[#e8614a] transition">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold">Previous Trips</h2>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {PREVIOUS_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#e8614a]/40 transition cursor-pointer"
                onClick={() => navigate('/app/trips')}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/40 border border-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-[10px] font-bold text-[#e8614a]">★</span>
                    <span className="text-[10px] text-white/70">{trip.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-[#e8614a] transition">{trip.title}</h3>
                  <div className="space-y-1 text-xs text-white/40 mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#e8614a]/60" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#e8614a]/60" />
                      {trip.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3 text-[#e8614a]/60" />
                      ${trip.spent} / ${trip.budget}
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#e8614a]/10 hover:bg-[#e8614a]/25 border border-[#e8614a]/25 rounded-lg text-xs font-semibold text-[#e8614a] transition">
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-30">
        <button
          onClick={() => navigate('/app/trips/create')}
          className="flex items-center gap-2 px-6 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white font-bold rounded-full shadow-lg transition hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Plan a Trip
        </button>
      </div>
    </div>
  )
}
