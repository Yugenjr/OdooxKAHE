import React, { useEffect, useState } from 'react'
import { Share2, Copy, User, MapPin, Calendar, DollarSign, ArrowRight, X } from 'lucide-react'
import { traveloopApi } from '@/shared/services/traveloopApi'

interface SharedTrip {
  id: string
  title: string
  author: string
  destination: string
  image: string
  duration: number
  budget: number
  views: number
  description: string
}

const SharedTripsPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<SharedTrip | null>(null)
  const [trips, setTrips] = useState<SharedTrip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      const { data } = await traveloopApi.getPublicTrips()
      const mapped = ((data as any[]) || []).map((trip) => ({
        id: trip.id,
        title: trip.name,
        author: trip.users?.name || trip.users?.[0]?.name || 'Traveler',
        destination: trip.destination || 'Shared trip',
        image:
          trip.cover_photo ||
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
        duration: Math.max(1, Math.ceil((new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24))),
        budget: Number(trip.budget_limit || 0),
        views: 0,
        description: trip.description || 'Shared trip plan',
      }))
      setTrips(mapped)
      setLoading(false)
    }

    loadTrips()
  }, [])

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/app/itinerary?tripId=${id}`
    navigator.clipboard.writeText(link)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] p-6 font-outfit">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Share2 className="w-7 h-7 text-[#e8614a]" />
          <h1 className="text-3xl font-bold">Shared Trips</h1>
        </div>
        <p className="text-white/40 mb-8">Discover and get inspired by trips shared by other travelers</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-full text-white/40 text-center py-10">Loading shared trips...</div>
          ) : trips.length === 0 ? (
            <div className="col-span-full text-white/40 text-center py-10 border border-white/[0.05] rounded-2xl border-dashed">No public trips available yet.</div>
          ) : trips.map((trip) => (
            <div key={trip.id} onClick={() => setSelectedTrip(trip)} className="group cursor-pointer bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#e8614a]/40 transition hover:-translate-y-1 duration-300">
              <div className="relative h-44 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/40 border border-white/20 px-2 py-0.5 rounded-full text-xs text-white/50 font-medium">
                  {trip.views.toLocaleString()} views
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-1 group-hover:text-[#e8614a] transition">{trip.title}</h3>
                <p className="text-white/40 text-xs mb-4 flex items-center gap-1"><User className="w-3 h-3" />by {trip.author}</p>
                <div className="space-y-1.5 text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#e8614a]/60" />{trip.destination}</div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#e8614a]/60" />{trip.duration} days</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#e8614a]/60" />${trip.budget}</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#e8614a]/10 hover:bg-[#e8614a]/25 border border-[#e8614a]/25 text-[#e8614a] text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5">
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedTrip(null)}>
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedTrip(null)} className="absolute top-4 right-4 text-white/40 hover:text-white transition bg-black/50 p-1.5 rounded-full"><X className="w-4 h-4" /></button>
            <img src={selectedTrip.image} alt={selectedTrip.title} className="w-full h-52 object-cover rounded-xl mb-5" />
            
            <h2 className="text-2xl font-bold mb-1 text-[#f0ede8]">{selectedTrip.title}</h2>
            <p className="text-white/40 text-sm mb-4 flex items-center gap-1"><User className="w-3.5 h-3.5" />by {selectedTrip.author}</p>
            
            <p className="text-white/60 text-sm mb-6 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">{selectedTrip.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                ['Destination', selectedTrip.destination], 
                ['Duration', `${selectedTrip.duration} days`], 
                ['Budget', `$${selectedTrip.budget}`], 
                ['Views', selectedTrip.views.toLocaleString()]
              ].map(([label, val]) => (
                <div key={label} className="bg-white/[0.04] p-3 rounded-xl border border-white/[0.05]">
                  <p className="text-[#e8614a]/80 text-xs font-semibold mb-1 uppercase tracking-wider">{label}</p>
                  <p className="font-bold text-sm text-[#f0ede8]">{val}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 pt-2">
              <button onClick={() => handleCopyLink(selectedTrip.id)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.06] hover:bg-white/10 rounded-xl text-sm font-semibold transition border border-white/[0.05]">
                <Copy className="w-4 h-4" />{copied === selectedTrip.id ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="flex-1 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white font-semibold rounded-xl text-sm shadow-lg shadow-[#e8614a]/20 transition">
                Copy This Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SharedTripsPage
