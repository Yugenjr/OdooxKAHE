import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Briefcase, Plus, Trash2, Edit2, Clock } from 'lucide-react'
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
    setStops((data as Stop[]) || [])
    setNewStop({ city: '', startDate: '', endDate: '', description: '' })
    setShowAddForm(false)
  }

  const handleRemoveStop = async (id: string) => {
    if (!selectedTripId) return
    await traveloopApi.deleteTripStop(selectedTripId, id)
    setStops((current) => current.filter((stop) => stop.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-bold">Itinerary Builder</h1>
            </div>
            <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 px-6 py-2 rounded-lg font-semibold transition">
              <Plus className="w-5 h-5" /> Add Stop
            </button>
          </div>
          <p className="text-white/60">Create and manage your multi-city itinerary</p>
          {selectedTrip && <p className="text-white/40 text-sm mt-2">Selected trip: {selectedTrip.name}</p>}
        </div>

        {loading ? (
          <div className="text-white/60">Loading itinerary...</div>
        ) : (
          <div className="mb-8">
            <div className="space-y-4">
              {stops.map((stop, index) => (
                <div key={stop.id} className="relative">
                  {index < stops.length - 1 && <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-indigo-500 to-cyan-500" />}

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center pt-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/40">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{stop.city}</h3>
                          <div className="flex items-center gap-4 text-white/70 text-sm">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{calculateDays(stop.start_date, stop.end_date)} days</span>
                            <span>{new Date(stop.start_date).toLocaleDateString()} - {new Date(stop.end_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveStop(stop.id)} className="text-white/40 hover:text-red-400 transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white/60 mb-2">Notes</h4>
                        <div className="flex flex-wrap gap-2">
                          {stop.description ? (
                            <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 rounded-full text-sm text-indigo-200">{stop.description}</span>
                          ) : (
                            <span className="text-white/40 text-sm">No notes added yet</span>
                          )}
                        </div>
                      </div>

                      <button className="text-white/60 hover:text-indigo-300 transition flex items-center gap-2 text-sm">
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full p-8">
              <h2 className="text-2xl font-bold mb-6">Add New Stop</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">City</label>
                  <input type="text" value={newStop.city} onChange={(e) => setNewStop({ ...newStop, city: e.target.value })} placeholder="Enter city name" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">Start Date</label>
                    <input type="date" value={newStop.startDate} onChange={(e) => setNewStop({ ...newStop, startDate: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">End Date</label>
                    <input type="date" value={newStop.endDate} onChange={(e) => setNewStop({ ...newStop, endDate: e.target.value })} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">Description</label>
                  <textarea value={newStop.description} onChange={(e) => setNewStop({ ...newStop, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition resize-none" placeholder="Optional notes for this stop" />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition">
                  Cancel
                </button>
                <button onClick={handleAddStop} className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition">
                  Add Stop
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Trip Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4"><p className="text-white/60 text-sm mb-1">Total Stops</p><p className="text-3xl font-bold">{stops.length}</p></div>
            <div className="bg-white/5 rounded-lg p-4"><p className="text-white/60 text-sm mb-1">Total Days</p><p className="text-3xl font-bold">{stops.reduce((total, stop) => total + calculateDays(stop.start_date, stop.end_date), 0)}</p></div>
            <div className="bg-white/5 rounded-lg p-4"><p className="text-white/60 text-sm mb-1">Notes</p><p className="text-3xl font-bold">{stops.filter((stop) => stop.description).length}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryPage
