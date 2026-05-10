import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const SUGGESTIONS = [
  { id: 1, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
  { id: 5, name: 'Patagonia', country: 'Chile', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop' },
  { id: 6, name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
]

export const CreateTripPage: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ startDate: '', place: '', tripStart: '', endDate: '' })

  const set = (field: keyof typeof form, value: string) => setForm({ ...form, [field]: value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/app/trips')
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8]">
      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate('/app/trips')}
          className="flex items-center gap-2 text-white/40 hover:text-[#f0ede8] mb-6 transition group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Plan a new trip form */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 mb-6">
          <h2 className="text-base font-semibold mb-5 text-[#f0ede8]">Plan a new trip</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Start Date */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm text-white/60 flex-shrink-0">Start Date:</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => set('startDate', e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            {/* Select a Place */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm text-white/60 flex-shrink-0">Select a Place:</label>
              <input
                type="text"
                value={form.place}
                onChange={(e) => set('place', e.target.value)}
                placeholder="e.g. Paris, Rome, Bali"
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
              />
            </div>

            {/* Trip Start Date */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm text-white/60 flex-shrink-0">Start Date:</label>
              <input
                type="date"
                value={form.tripStart}
                onChange={(e) => set('tripStart', e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            {/* End Date */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm text-white/60 flex-shrink-0">End Date:</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => set('endDate', e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-[#e8614a] hover:bg-[#d4503a] rounded-lg text-sm font-semibold transition"
            >
              Create Trip
            </button>
          </form>
        </div>

        {/* Suggestions */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white/60 mb-4">Suggestion for Places to Visit / Activities to perform</h2>

          <div className="grid grid-cols-3 gap-3">
            {SUGGESTIONS.map((s) => (
              <div
                key={s.id}
                onClick={() => setForm({ ...form, place: s.name })}
                className="relative h-36 rounded-xl overflow-hidden border border-white/[0.08] cursor-pointer group hover:border-[#e8614a]/40 transition"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-xs font-semibold text-white group-hover:text-[#e8614a] transition">{s.name}</p>
                  <p className="text-[10px] text-white/50">{s.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
