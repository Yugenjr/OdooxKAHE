import React, { useState } from 'react'
import { Share2, Copy, User, MapPin, Calendar, DollarSign, ArrowRight, X } from 'lucide-react'

interface SharedTrip { id: number; title: string; author: string; destination: string; image: string; duration: number; budget: number; views: number; description: string }

const SHARED_TRIPS: SharedTrip[] = [
  { id: 1, title: 'Epic Paris & Rome Adventure', author: 'Sarah Johnson', destination: 'Europe', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop', duration: 14, budget: 4500, views: 3240, description: 'An unforgettable 2-week journey through the most romantic cities in Europe.' },
  { id: 2, title: 'Southeast Asia 3 Weeks', author: 'Mike Chen', destination: 'Southeast Asia', image: 'https://images.unsplash.com/photo-1537225228614-b4fad35b6789?q=80&w=800&auto=format&fit=crop', duration: 21, budget: 3200, views: 5120, description: 'Budget-friendly exploration of Thailand, Cambodia, and Vietnam.' },
  { id: 3, title: 'New Zealand Road Trip', author: 'Emma Davis', destination: 'New Zealand', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop', duration: 10, budget: 3800, views: 2890, description: 'North and South Island adventure with hiking and scenic drives.' },
  { id: 4, title: 'Japan Cultural Experience', author: 'Alex Park', destination: 'Japan', image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d4?q=80&w=800&auto=format&fit=crop', duration: 12, budget: 4200, views: 4560, description: 'Traditional temples, modern cities, and authentic cuisine.' },
  { id: 5, title: 'Maldives Honeymoon', author: 'Sophie & Mark', destination: 'Maldives', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', duration: 7, budget: 5500, views: 6780, description: 'Luxury island resort experience with water activities and relaxation.' },
]

const SharedTripsPage: React.FC = () => {
  const [selected, setSelected] = useState<SharedTrip | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const handleCopy = (id: number) => {
    navigator.clipboard.writeText(`${window.location.origin}/shared-trip/${id}`)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Share2 className="w-7 h-7 text-[#e8614a]" />
          <h1 className="text-3xl font-bold">Shared Trips</h1>
        </div>
        <p className="text-white/40 mb-8">Discover and get inspired by trips shared by other travelers</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SHARED_TRIPS.map((trip) => (
            <div key={trip.id} onClick={() => setSelected(trip)} className="group cursor-pointer bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#e8614a]/40 transition hover:-translate-y-1 duration-300">
              <div className="relative h-44 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/40 border border-white/20 px-2 py-0.5 rounded-full text-xs text-white/50">
                  {trip.views.toLocaleString()} views
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-1 group-hover:text-[#e8614a] transition">{trip.title}</h3>
                <p className="text-white/40 text-xs mb-4 flex items-center gap-1"><User className="w-3 h-3" />by {trip.author}</p>
                <div className="space-y-1.5 text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#e8614a]/60" />{trip.destination}</div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-[#e8614a]/60" />{trip.duration} days</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-3 h-3 text-[#e8614a]/60" />${trip.budget}</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#e8614a]/15 hover:bg-[#e8614a]/30 border border-[#e8614a]/25 text-[#e8614a] text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5">
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white/40 hover:text-white transition"><X className="w-5 h-5" /></button>
            <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover rounded-xl mb-5" />
            <h2 className="text-2xl font-bold mb-1">{selected.title}</h2>
            <p className="text-white/40 text-sm mb-3 flex items-center gap-1"><User className="w-3.5 h-3.5" />by {selected.author}</p>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[['Destination', selected.destination], ['Duration', `${selected.duration} days`], ['Budget', `$${selected.budget}`], ['Views', selected.views.toLocaleString()]].map(([label, val]) => (
                <div key={label} className="bg-white/[0.05] p-3 rounded-lg">
                  <p className="text-white/40 text-xs mb-1">{label}</p>
                  <p className="font-bold text-sm">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleCopy(selected.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.06] hover:bg-white/10 rounded-lg text-sm transition">
                <Copy className="w-4 h-4" />{copied === selected.id ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="flex-1 py-2.5 bg-[#e8614a] hover:bg-[#d4503a] text-white font-semibold rounded-lg text-sm transition">
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
