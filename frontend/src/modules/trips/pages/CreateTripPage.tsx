import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { traveloopApi } from '@/shared/services/traveloopApi'

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
  const user = useAuthStore((state) => state.user)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    tripName: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSuggestionClick = (destinationName: string) => {
    setFormData({ ...formData, destination: destinationName })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await traveloopApi.createTrip({
        name: formData.tripName,
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        description: formData.description,
        cover_photo: null,
        budget_limit: null,
        is_public: false,
      })
      navigate('/app/trips')
    } catch (error) {
      console.error('Failed to create trip', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-outfit">
      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate('/app/trips')}
          className="flex items-center gap-2 text-white/40 hover:text-[#f0ede8] mb-6 transition group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Plan a new trip form */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-5 text-[#f0ede8]">Plan a new trip</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Trip Name */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm font-semibold text-white/60 flex-shrink-0">Trip Name:</label>
              <input
                type="text"
                name="tripName"
                value={formData.tripName}
                onChange={handleChange}
                placeholder="e.g. European Summer Backpacking"
                required
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
              />
            </div>

            {/* Destination */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm font-semibold text-white/60 flex-shrink-0">Destination:</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Paris, Rome, Bali"
                required
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
              />
            </div>

            {/* Start Date */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm font-semibold text-white/60 flex-shrink-0">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition [color-scheme:dark]"
              />
            </div>

            {/* End Date */}
            <div className="flex items-center gap-4">
              <label className="w-36 text-sm font-semibold text-white/60 flex-shrink-0">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition [color-scheme:dark]"
              />
            </div>

            {/* Description */}
            <div className="flex items-start gap-4 pt-2">
              <label className="w-36 text-sm font-semibold text-white/60 flex-shrink-0 pt-2">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What's the vibe of this trip? Any main goals?"
                rows={3}
                className="flex-1 px-3 py-2 bg-transparent border border-white/[0.12] rounded-lg text-sm text-[#f0ede8] placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3 bg-[#e8614a] hover:bg-[#d4503a] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#e8614a]/20 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Trip'}
            </button>
          </form>
        </div>

        {/* Suggestions */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
          <h2 className="text-sm font-bold text-white/60 mb-4">Suggestion for Places to Visit / Activities to perform</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SUGGESTIONS.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSuggestionClick(s.name)}
                className="relative h-36 rounded-xl overflow-hidden border border-white/[0.08] cursor-pointer group hover:border-[#e8614a]/40 transition"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-bold text-white group-hover:text-[#e8614a] transition tracking-wide">{s.name}</p>
                  <p className="text-[10px] font-medium text-white/50">{s.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateTripPage
