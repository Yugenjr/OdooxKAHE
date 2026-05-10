import React, { useState } from 'react'
import { Briefcase, Plus, Trash2, Edit2, MapPin, Clock, DollarSign } from 'lucide-react'

interface Stop {
  id: number
  city: string
  startDate: string
  endDate: string
  activities: string[]
}

const ItineraryPage: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([
    {
      id: 1,
      city: 'Paris',
      startDate: '2025-06-15',
      endDate: '2025-06-18',
      activities: ['Eiffel Tower', 'Louvre Museum', 'River Cruise'],
    },
    {
      id: 2,
      city: 'Barcelona',
      startDate: '2025-06-18',
      endDate: '2025-06-21',
      activities: ['Sagrada Familia', 'Park Güell', 'Beach Day'],
    },
  ])

  const [newStop, setNewStop] = useState<Stop>({
    id: 0,
    city: '',
    startDate: '',
    endDate: '',
    activities: [],
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddStop = () => {
    if (newStop.city && newStop.startDate && newStop.endDate) {
      setStops([...stops, { ...newStop, id: Math.max(...stops.map((s) => s.id), 0) + 1 }])
      setNewStop({ id: 0, city: '', startDate: '', endDate: '', activities: [] })
      setShowAddForm(false)
    }
  }

  const handleRemoveStop = (id: number) => {
    setStops(stops.filter((stop) => stop.id !== id))
  }

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-bold">Itinerary Builder</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              <Plus className="w-5 h-5" /> Add Stop
            </button>
          </div>
          <p className="text-white/60">Create and manage your multi-city itinerary</p>
        </div>

        {/* Timeline Visualization */}
        <div className="mb-8">
          <div className="space-y-4">
            {stops.map((stop, index) => (
              <div key={stop.id} className="relative">
                {/* Timeline connector */}
                {index < stops.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-indigo-500 to-cyan-500" />
                )}

                {/* Stop card */}
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/40">
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{stop.city}</h3>
                        <div className="flex items-center gap-4 text-white/70 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {calculateDays(stop.startDate, stop.endDate)} days
                          </span>
                          <span>
                            {new Date(stop.startDate).toLocaleDateString()} -{' '}
                            {new Date(stop.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveStop(stop.id)}
                        className="text-white/40 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Activities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/60 mb-2">Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {stop.activities.length > 0 ? (
                          stop.activities.map((activity, idx) => (
                            <span key={idx} className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 rounded-full text-sm text-indigo-200">
                              {activity}
                            </span>
                          ))
                        ) : (
                          <span className="text-white/40 text-sm">No activities added yet</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <button className="text-white/60 hover:text-indigo-300 transition flex items-center gap-2 text-sm">
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Stop Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full p-8">
              <h2 className="text-2xl font-bold mb-6">Add New Stop</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">City</label>
                  <input
                    type="text"
                    value={newStop.city}
                    onChange={(e) => setNewStop({ ...newStop, city: e.target.value })}
                    placeholder="Enter city name"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">Start Date</label>
                    <input
                      type="date"
                      value={newStop.startDate}
                      onChange={(e) => setNewStop({ ...newStop, startDate: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">End Date</label>
                    <input
                      type="date"
                      value={newStop.endDate}
                      onChange={(e) => setNewStop({ ...newStop, endDate: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStop}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition"
                >
                  Add Stop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Trip Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Total Stops</p>
              <p className="text-3xl font-bold">{stops.length}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Total Days</p>
              <p className="text-3xl font-bold">
                {stops.reduce((total, stop) => total + calculateDays(stop.startDate, stop.endDate), 0)}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/60 text-sm mb-1">Total Activities</p>
              <p className="text-3xl font-bold">{stops.reduce((total, stop) => total + stop.activities.length, 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryPage
