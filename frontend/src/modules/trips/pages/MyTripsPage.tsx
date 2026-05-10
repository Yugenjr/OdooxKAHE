import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'

const TRIPS = [
  { id: 1, title: 'Paris & Rome Adventure', destination: 'France & Italy', start: 'Jun 15, 2025', end: 'Jun 27, 2025', status: 'ongoing', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'Summer in Greece', destination: 'Santorini, Greece', start: 'Jul 10, 2025', end: 'Jul 18, 2025', status: 'upcoming', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'Nordic Explorer', destination: 'Scandinavia', start: 'Aug 1, 2025', end: 'Aug 12, 2025', status: 'upcoming', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, title: 'Tokyo to Kyoto Adventure', destination: 'Japan', start: 'Mar 15, 2025', end: 'Mar 25, 2025', status: 'completed', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, title: 'Southeast Asia Explorer', destination: 'Thailand & Bali', start: 'Jan 5, 2025', end: 'Jan 18, 2025', status: 'completed', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop' },
]

export const MyTripsPage: React.FC = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filter = (status: string) =>
    TRIPS.filter((t) =>
      t.status === status &&
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.destination.toLowerCase().includes(search.toLowerCase()))
    )

  const ongoing = filter('ongoing')
  const upcoming = filter('upcoming')
  const completed = filter('completed')

  const TripCard = ({ trip }: { trip: typeof TRIPS[0] }) => (
    <div
      onClick={() => navigate('/app/trips/create')}
      className="relative border border-white/[0.12] rounded-2xl overflow-hidden cursor-pointer hover:border-[#e8614a]/40 transition group h-32"
    >
      <img src={trip.image} alt={trip.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <p className="text-center text-white font-semibold text-base group-hover:text-[#e8614a] transition">{trip.title}</p>
        <p className="text-center text-white/50 text-sm mt-1">{trip.destination} &nbsp;·&nbsp; {trip.start} – {trip.end}</p>
      </div>
    </div>
  )

  const Section = ({ label, trips }: { label: string; trips: typeof TRIPS }) => {
    if (trips.length === 0) return null
    return (
      <section>
        <h2 className="text-xl font-bold mb-3 text-[#e8614a]">{label}</h2>
        <div className="space-y-3">
          {trips.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8]">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

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

        <Section label="Ongoing" trips={ongoing} />
        <Section label="Up-coming" trips={upcoming} />
        <Section label="Completed" trips={completed} />

        {ongoing.length === 0 && upcoming.length === 0 && completed.length === 0 && (
          <p className="text-center text-white/30 text-sm py-12">No trips found.</p>
        )}

      </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-30">
        <button
          onClick={() => navigate('/app/trips/create')}
          className="flex items-center gap-2 px-6 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white font-bold rounded-full shadow-lg transition hover:scale-105"
        >
          <Plus className="w-5 h-5" /> New Trip
        </button>
      </div>
    </div>
  )
}
