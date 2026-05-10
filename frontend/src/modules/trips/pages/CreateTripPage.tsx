import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ArrowLeft, Camera, Calendar, MapPin, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { motion } from 'framer-motion'
import { traveloopApi } from '@/shared/services/traveloopApi'

export const CreateTripPage: React.FC = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-outfit">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <header className="relative z-20 sticky top-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="bg-[#050505]/50 backdrop-blur-2xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => navigate('/app/dashboard')}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/50">
                    T
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">Traveloop</span>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <button onClick={() => navigate('/app/dashboard')} className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>Dashboard</span>
                </button>
                <button onClick={() => navigate('/app/trips')} className="text-white hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group relative">
                  <span>My Trips</span>
                  <span className="w-1 h-1 bg-cyan-500 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2" />
                </button>
                <button onClick={() => navigate('/app/inspiration')} className="text-white/70 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center gap-2 group">
                  <span>Inspiration</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button className="relative p-3 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                  <Bell className="w-5 h-5 text-white/70 group-hover:text-white group-hover:text-indigo-400 transition-colors" />
                </button>
                <button className="relative ml-2 p-2 hover:bg-white/10 rounded-lg transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-500/50">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onClick={() => navigate('/app/trips')} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to My Trips</span>
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-10 text-center">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Design Your Next Adventure
          </h1>
          <p className="text-white/60 text-lg">Give your trip a name, select dates, and let's start building your dream itinerary.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full h-48 md:h-64 rounded-2xl border-2 border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/50 z-0" />
                <Camera className="w-10 h-10 text-white/40 group-hover:text-indigo-400 transition-colors mb-3 z-10" />
                <p className="text-white/60 font-medium z-10">Upload a stunning cover photo</p>
                <p className="text-white/40 text-sm mt-1 z-10">JPEG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Trip Name</label>
                <input type="text" name="tripName" value={formData.tripName} onChange={handleChange} placeholder="e.g. European Summer Backpacking" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 text-white placeholder-white/30 transition-all text-lg" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Primary Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Where are you heading?" className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 text-white placeholder-white/30 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 text-white transition-all [&::-webkit-calendar-picker-indicator]:invert" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 text-white transition-all [&::-webkit-calendar-picker-indicator]:invert" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">Trip Description / Goals</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="What's the vibe of this trip? Any main goals?" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 text-white placeholder-white/30 transition-all resize-none" />
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full relative group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 text-lg">
                <span>Start Planning Itinerary</span>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default CreateTripPage
