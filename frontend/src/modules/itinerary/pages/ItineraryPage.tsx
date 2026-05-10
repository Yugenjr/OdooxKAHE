import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Plus, Trash2, ArrowDown, MapPin } from 'lucide-react'
import { traveloopApi } from '@/shared/services/traveloopApi'

interface Stop {
  id: string
  city: string
  start_date: string
  end_date: string
  description?: string | null
  order?: number | null
}

interface Trip {
  id: string
  name: string
  start_date: string
  end_date: string
}

const ItineraryPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedTripId, setSelectedTripId] = useState('')
  const [stops, setStops] = useState<Stop[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStop, setNewStop] = useState({ city: '', startDate: '', endDate: '', description: '' })

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      const { data } = await traveloopApi.getMyTrips()
      const tripList = Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray((data as any).data) ? (data as any).data : [])
      setTrips(tripList)
      const queryTripId = searchParams.get('tripId') || tripList[0]?.id || ''
      setSelectedTripId(queryTripId)
      setLoading(false)
    }

    loadTrips()
  }, [searchParams])

  useEffect(() => {
    const loadStops = async () => {
      if (!selectedTripId) {
        setStops([])
        return
      }

      const { data } = await traveloopApi.getTripStops(selectedTripId)
      setStops(Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray((data as any).data) ? (data as any).data : []))
    }

    loadStops()
  }, [selectedTripId])

  const selectedTrip = useMemo(() => trips.find((trip) => trip.id === selectedTripId) || trips[0], [selectedTripId, trips])

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
  }

  const handleAddStop = async () => {
    if (!selectedTripId || !newStop.city || !newStop.startDate || !newStop.endDate) return

    await traveloopApi.addTripStop(selectedTripId, {
      city: newStop.city,
      start_date: newStop.startDate,
      end_date: newStop.endDate,
      description: newStop.description,
      order: stops.length + 1,
    })

    const { data } = await traveloopApi.getTripStops(selectedTripId)
    setStops(Array.isArray(data) ? data : (data && typeof data === 'object' && Array.isArray((data as any).data) ? (data as any).data : []))
    setNewStop({ city: '', startDate: '', endDate: '', description: '' })
    setShowAddForm(false)
  }

  const handleRemoveStop = async (id: string) => {
    if (!selectedTripId) return
    await traveloopApi.deleteTripStop(selectedTripId, id)
    setStops((current) => current.filter((stop) => stop.id !== id))
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0d0d0d] text-white/50 flex items-center justify-center">Loading itinerary...</div>
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-outfit">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Search + controls */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search itinerary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            {['Filter stops', 'Sort by date'].map((label) => (
              <button key={label} className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/50 hover:text-[#f0ede8] hover:bg-white/10 transition whitespace-nowrap">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#f0ede8]">Itinerary Planner</h1>
          {selectedTrip && (
            <p className="text-[#e8614a] mt-2 font-medium">Selected trip: {selectedTrip.name}</p>
          )}
        </div>

        {/* Stops List */}
        <div className="space-y-10">
          {stops.map((stop, index) => (
            <div key={stop.id} className="group/day">
              
              {/* Stop label */}
              <div className="flex items-center gap-4 mb-4">
                <div className="px-4 py-1.5 border border-[#e8614a]/40 rounded-lg text-sm font-semibold text-[#e8614a] bg-[#e8614a]/[0.08] flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Stop {index + 1}: {stop.city}
                </div>
                <div className="text-xs font-medium text-white/40">
                  {new Date(stop.start_date).toLocaleDateString()} — {new Date(stop.end_date).toLocaleDateString()}
                </div>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <button
                  onClick={() => handleRemoveStop(stop.id)}
                  className="opacity-0 group-hover/day:opacity-100 text-white/30 hover:text-red-400 transition"
                  title="Remove Stop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[1fr_160px] gap-4 mb-2 px-1">
                <span className="text-xs text-[#e8614a]/60 font-medium">Notes & Description</span>
                <span className="text-xs text-[#e8614a]/60 text-center font-medium">Duration</span>
              </div>

              {/* Stop Row (adapted from Activity Row) */}
              <div>
                <div className="grid grid-cols-[1fr_160px] gap-4 group/row items-start">
                  <div className="w-full px-4 py-3 bg-transparent border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] leading-relaxed min-h-[50px]">
                    {stop.description || <span className="text-white/20 italic">No notes added for this stop...</span>}
                  </div>
                  
                  <div className="px-4 py-3 bg-transparent border border-white/[0.10] rounded-lg text-sm text-[#e8614a] font-semibold text-center">
                    {calculateDays(stop.start_date, stop.end_date)} days
                  </div>
                </div>

                {/* Arrow connector between stops */}
                {index < stops.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowDown className="w-5 h-5 text-[#e8614a]/40" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {stops.length === 0 && !showAddForm && (
            <div className="text-center py-12 text-white/40 border border-white/[0.05] rounded-2xl border-dashed">
              No stops added to this trip yet.
            </div>
          )}
        </div>

        {/* Add Stop Button (Triggers Form) */}
        {!showAddForm && selectedTrip && (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-10 w-full flex items-center justify-center gap-2 py-3.5 border border-white/[0.10] rounded-xl text-sm font-medium text-white/60 hover:text-[#f0ede8] hover:border-[#e8614a]/40 hover:bg-[#e8614a]/[0.06] transition"
          >
            <Plus className="w-4 h-4" /> Add another Stop
          </button>
        )}

        {/* Add New Stop Form Modal */}
        {showAddForm && (
          <div className="mt-8 p-6 bg-[#0d0d0d] border border-[#e8614a]/30 rounded-2xl shadow-[0_0_30px_rgba(232,97,74,0.05)]">
            <h3 className="text-lg font-bold text-[#f0ede8] mb-5">Add New Stop</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <input 
                  type="text" 
                  value={newStop.city} 
                  onChange={(e) => setNewStop({ ...newStop, city: e.target.value })} 
                  placeholder="City Name" 
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] placeholder-white/30 focus:outline-none focus:border-[#e8614a]/50 transition" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" 
                  value={newStop.startDate} 
                  onChange={(e) => setNewStop({ ...newStop, startDate: e.target.value })} 
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:border-[#e8614a]/50 transition [color-scheme:dark]" 
                />
                <input 
                  type="date" 
                  value={newStop.endDate} 
                  onChange={(e) => setNewStop({ ...newStop, endDate: e.target.value })} 
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:border-[#e8614a]/50 transition [color-scheme:dark]" 
                />
              </div>

              <div>
                <textarea 
                  value={newStop.description} 
                  onChange={(e) => setNewStop({ ...newStop, description: e.target.value })} 
                  rows={2} 
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] placeholder-white/30 focus:outline-none focus:border-[#e8614a]/50 transition resize-none" 
                  placeholder="Activity notes, hotel references, or flight details..." 
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddForm(false)} 
                className="flex-1 py-3 border border-white/[0.15] text-white/70 hover:text-white rounded-xl text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStop} 
                className="flex-1 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white rounded-xl text-sm font-semibold shadow-lg shadow-[#e8614a]/20 transition"
              >
                Save Stop
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ItineraryPage
