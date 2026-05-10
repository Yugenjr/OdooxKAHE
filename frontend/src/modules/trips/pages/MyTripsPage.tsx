import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Trash2 } from 'lucide-react'
import { traveloopApi } from '@/shared/services/traveloopApi'

type Trip = {
  id: string
  name: string
  destination?: string | null
  description?: string | null
  start_date: string
  end_date: string
  cover_photo?: string | null
}

export const MyTripsPage: React.FC = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      const { data } = await traveloopApi.getMyTrips()
      setTrips(Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray((data as any).data) ? (data as any).data : []))
      setLoading(false)
    }

    loadTrips()
  }, [])

  const handleDeleteTrip = async (e: React.MouseEvent, tripId: string) => {
    e.stopPropagation()
    await traveloopApi.deleteTrip(tripId)
    setTrips((current) => current.filter((trip) => trip.id !== tripId))
  }

  const mappedTrips = useMemo(() => {
    const now = new Date()

    return trips
      .map((trip) => {
        const startDate = new Date(trip.start_date)
        const endDate = new Date(trip.end_date)
        
        let status = 'upcoming'
        if (endDate < now) status = 'completed'
        else if (startDate <= now && endDate >= now) status = 'ongoing'

        return {
          ...trip,
          status,
          title: trip.name,
          destinationLabel: trip.destination || trip.description || 'Trip',
          image: trip.cover_photo || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
          startStr: startDate.toLocaleDateString(),
          endStr: endDate.toLocaleDateString(),
        }
      })
      .filter((t) => 
        t.title.toLowerCase().includes(search.toLowerCase()) || 
        t.destinationLabel.toLowerCase().includes(search.toLowerCase())
      )
  }, [search, trips])

  const ongoing = mappedTrips.filter((t) => t.status === 'ongoing')
  const upcoming = mappedTrips.filter((t) => t.status === 'upcoming')
  const completed = mappedTrips.filter((t) => t.status === 'completed')

  const TripCard = ({ trip }: { trip: any }) => (
    <div
      onClick={() => navigate(`/app/itinerary?tripId=${trip.id}`)}
      className="relative border border-white/[0.12] rounded-2xl overflow-hidden cursor-pointer hover:border-[#e8614a]/40 transition group h-32"
    >
      <img src={trip.image} alt={trip.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <p className="text-center text-white font-semibold text-base group-hover:text-[#e8614a] transition">{trip.title}</p>
        <p className="text-center text-white/50 text-sm mt-1">{trip.destinationLabel} &nbsp;·&nbsp; {trip.startStr} – {trip.endStr}</p>
      </div>

      <button
        onClick={(e) => handleDeleteTrip(e, trip.id)}
        className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-red-500/80 rounded-full text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )

  const Section = ({ label, tripsList }: { label: string; tripsList: typeof mappedTrips }) => {
    if (tripsList.length === 0) return null
    return (
      <section>
        <h2 className="text-xl font-bold mb-3">{label}</h2>
        <div className="space-y-3">
          {tripsList.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
      </section>
    )
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0d0d0d] text-white/50 flex flex-col items-center justify-center">Loading your trips...</div>
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-outfit">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

        {/* Search + controls */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search trips..."
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

        <Section label="Ongoing" tripsList={ongoing} />
        <Section label="Upcoming" tripsList={upcoming} />
        <Section label="Completed" tripsList={completed} />

        {ongoing.length === 0 && upcoming.length === 0 && completed.length === 0 && (
          <div className="text-center py-16 border border-white/[0.05] rounded-3xl border-dashed">
            <p className="text-white/40 text-sm mb-4">No trips found. Time to start planning!</p>
            <button
              onClick={() => navigate('/app/trips/create')}
              className="px-6 py-2.5 bg-[#e8614a]/10 hover:bg-[#e8614a]/20 border border-[#e8614a]/30 text-[#e8614a] rounded-lg text-sm font-semibold transition"
            >
              Plan Your First Trip
            </button>
          </div>
        )}

      </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-30">
        <button
          onClick={() => navigate('/app/trips/create')}
          className="flex items-center gap-2 px-6 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white font-bold rounded-full shadow-lg shadow-[#e8614a]/20 transition hover:scale-105"
        >
          <Plus className="w-5 h-5" /> New Trip
        </button>
      </div>
    </div>
  )
}

export default MyTripsPage
