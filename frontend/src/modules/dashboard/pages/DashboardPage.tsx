import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, DollarSign, ArrowRight, Plus } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/utils/supabase'

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
  const user = useAuthStore((state) => state.user)
  const [search, setSearch] = useState('')
  const [liveCities, setLiveCities] = useState<Array<{ id: string; name: string; country: string; estimated_cost_per_day: number | null }>>([])
  const [citiesLoading, setCitiesLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadCities = async () => {
      setCitiesLoading(true)
      const { data, error } = await supabase
        .from('cities')
        .select('id, name, country, estimated_cost_per_day')
        .eq('popular', true)
        .order('popularity_score', { ascending: false })
        .limit(6)

      if (!mounted) return

      if (!error && data) {
        setLiveCities(data)
      }

      setCitiesLoading(false)
    }

    loadCities()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-outfit">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">

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
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            {['Group by', 'Filter', 'Sort by...'].map((label) => (
              <button key={label} className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/50 hover:text-[#f0ede8] hover:bg-white/10 transition whitespace-nowrap">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Cities from Supabase */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold">Live Trending Cities</h2>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          {citiesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-28 rounded-2xl bg-white/[0.03] border border-white/[0.05] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveCities.map((city) => (
                <div key={city.id} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5 group hover:border-[#e8614a]/40 transition duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-[#e8614a] transition">{city.name}</h3>
                      <div className="flex items-center gap-1.5 text-white/50 text-sm">
                        <MapPin className="w-3 h-3 text-[#e8614a]/60" />
                        {city.country}
                      </div>
                    </div>
                    <span className="rounded-md bg-[#e8614a]/10 px-2.5 py-1 text-[10px] font-bold text-[#e8614a] uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/40">Est. cost/day</span>
                    <span className="text-[#f0ede8] font-bold">
                      {city.estimated_cost_per_day ? `₹${city.estimated_cost_per_day}` : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top Regional Selections */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold">Top Regional Selections</h2>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {REGIONAL_SELECTIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/app/trips/create?category=' + encodeURIComponent(item.name))}
                className="relative h-32 rounded-xl overflow-hidden border border-white/[0.07] cursor-pointer group hover:border-[#e8614a]/40 transition"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />
                <span className="absolute bottom-3 left-0 right-0 text-center text-xs font-bold text-white/90 group-hover:text-[#e8614a] transition tracking-wider uppercase">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold">Previous Trips</h2>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PREVIOUS_TRIPS.map((trip) => (
              <div
                key={trip.id}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#e8614a]/40 transition cursor-pointer"
                onClick={() => navigate('/app/trips')}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/40 border border-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-[10px] font-bold text-[#e8614a]">★</span>
                    <span className="text-[10px] text-white/70">{trip.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[15px] mb-3 group-hover:text-[#e8614a] transition">{trip.title}</h3>
                  <div className="space-y-2 text-xs text-white/40 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#e8614a]/60" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#e8614a]/60" />
                      {trip.date}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05]">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-[#e8614a]/60" />
                        <span className="text-white/60">${trip.spent} <span className="text-white/30">/ ${trip.budget}</span></span>
                      </div>
                      <span className="text-white/30 font-medium">{Math.round((trip.spent / trip.budget) * 100)}%</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#e8614a]/10 hover:bg-[#e8614a]/25 border border-[#e8614a]/25 rounded-lg text-xs font-bold text-[#e8614a] transition">
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
          className="flex items-center gap-2 px-6 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white font-bold rounded-full shadow-lg shadow-[#e8614a]/20 transition hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Plan a Trip
        </button>
      </div>
    </div>
  )
}

export default DashboardPage
