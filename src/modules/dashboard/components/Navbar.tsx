import { Bell, Settings, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const [showExplore, setShowExplore] = useState(false)
  const [showTools, setShowTools] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate('/app/dashboard')}
          className="flex items-center gap-4 cursor-pointer"
        >

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/40">
            T
          </div>

          <div>
            <h1 className="text-4xl font-bold text-cyan-300">
              Traveloop
            </h1>

            <p className="text-white/50 text-sm">
              Premium Travel Platform
            </p>
          </div>

        </div>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-white/70 font-medium relative">

          

          {/* My Trips */}
          <button
            onClick={() => navigate('/app/trips')}
            className="hover:text-white transition"
          >
            My Trips
          </button>

          {/* Explore Dropdown */}
          <div className="relative">

            <button
              onClick={() => setShowExplore(!showExplore)}
              className="flex items-center gap-1 hover:text-white transition"
            >
              Explore
              <ChevronDown className="w-4 h-4" />
            </button>

            {showExplore && (
              <div className="absolute top-12 left-0 w-56 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-3 flex flex-col gap-2">

                <button
                  onClick={() => navigate('/app/city-search')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  City Search
                </button>

                <button
                  onClick={() => navigate('/app/activity-search')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Activity Search
                </button>

                <button
                  onClick={() => navigate('/app/shared-trips')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Shared Trips
                </button>

              </div>
            )}

          </div>

          {/* Budget */}
          <button
            onClick={() => navigate('/app/budget')}
            className="hover:text-white transition"
          >
            Budget
          </button>

          {/* Tools Dropdown */}
          <div className="relative">

            <button
              onClick={() => setShowTools(!showTools)}
              className="flex items-center gap-1 hover:text-white transition"
            >
              Tools
              <ChevronDown className="w-4 h-4" />
            </button>

            {showTools && (
              <div className="absolute top-12 left-0 w-64 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-3 flex flex-col gap-2">

                <button
                  onClick={() => navigate('/app/itinerary')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Itinerary Builder
                </button>

                <button
                  onClick={() => navigate('/app/packing')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Packing Checklist
                </button>

                <button
                  onClick={() => navigate('/app/notes')}
                  className="text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  Trip Notes
                </button>

              </div>
            )}

          </div>

          {/* Profile */}
          <button
            onClick={() => navigate('/app/profile')}
            className="hover:text-white transition"
          >
            Profile
          </button>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Notifications */}
          <button className="relative text-white/70 hover:text-white transition">

            <Bell className="w-6 h-6" />

            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />

          </button>

          {/* Settings */}
          <button className="text-white/70 hover:text-white transition">

            <Settings className="w-6 h-6" />

          </button>

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="hidden sm:block">

              <p className="text-white font-semibold">
                {user?.name || 'User'}
              </p>

              <p className="text-white/40 text-sm">
                Premium
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  )
}

export default Navbar