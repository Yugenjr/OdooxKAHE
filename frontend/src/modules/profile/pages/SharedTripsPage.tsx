import React, { useEffect, useState } from 'react'
import { Share2, Copy, User, MapPin, Calendar, DollarSign, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold">Shared Trips</h1>
          </div>
          <p className="text-white/60">Discover and get inspired by trips shared by other travelers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-white/60">Loading shared trips...</div>
          ) : trips.length === 0 ? (
            <div className="col-span-full text-white/60">No public trips available yet.</div>
          ) : trips.map((trip) => (
            <div key={trip.id} onClick={() => setSelectedTrip(trip)} className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 bg-white/5 hover:bg-white/10 transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{trip.title}</h3>
                <p className="text-white/60 text-sm mb-4 flex items-center gap-1"><User className="w-3 h-3" /> by {trip.author}</p>

                <div className="space-y-2 text-sm text-white/70 mb-4">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-400" /><span>{trip.destination}</span></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-400" /><span>{trip.duration} days</span></div>
                    <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400" /><span>${trip.budget}</span></div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-600/50 to-blue-600/50 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedTrip && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTrip(null)}>
            <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-2xl w-full p-8 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedTrip(null)} className="absolute top-4 right-4 text-white/60 hover:text-white transition">✕</button>

              <img src={selectedTrip.image} alt={selectedTrip.title} className="w-full h-64 object-cover rounded-lg mb-6" />

              <h2 className="text-3xl font-bold mb-2">{selectedTrip.title}</h2>
              <p className="text-white/60 mb-4 flex items-center gap-2"><User className="w-4 h-4" /> by {selectedTrip.author}</p>

              <p className="text-white/80 mb-6">{selectedTrip.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg"><div className="text-white/60 text-sm mb-1">Destination</div><div className="font-bold">{selectedTrip.destination}</div></div>
                <div className="bg-white/5 p-4 rounded-lg"><div className="text-white/60 text-sm mb-1">Duration</div><div className="font-bold">{selectedTrip.duration} days</div></div>
                <div className="bg-white/5 p-4 rounded-lg"><div className="text-white/60 text-sm mb-1">Budget</div><div className="font-bold">${selectedTrip.budget}</div></div>
                <div className="bg-white/5 p-4 rounded-lg"><div className="text-white/60 text-sm mb-1">Views</div><div className="font-bold">{selectedTrip.views}</div></div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleCopyLink(selectedTrip.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
                  <Copy className="w-4 h-4" />
                  {copied === selectedTrip.id ? 'Copied!' : 'Copy Link'}
                </button>
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition">
                  Copy This Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SharedTripsPage
