import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Save, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const MOCK_TRIPS = [
  { id: 1, title: 'Summer in Greece', destination: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop', status: 'upcoming' },
  { id: 2, title: 'Nordic Explorer', destination: 'Scandinavia', image: 'https://images.unsplash.com/photo-1531366936336-62fc67463b44?q=80&w=800&auto=format&fit=crop', status: 'upcoming' },
  { id: 3, title: 'Tokyo to Kyoto', destination: 'Japan', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop', status: 'completed' },
  { id: 4, title: 'Paris Getaway', destination: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop', status: 'completed' },
  { id: 5, title: 'Bali Retreat', destination: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop', status: 'completed' },
]

const TripCard: React.FC<{ trip: (typeof MOCK_TRIPS)[0]; onView: () => void }> = ({ trip, onView }) => (
  <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col hover:border-[#e8614a]/30 transition">
    <div className="h-36 overflow-hidden">
      <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
    </div>
    <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
      <div>
        <p className="font-semibold text-sm">{trip.title}</p>
        <p className="text-white/40 text-xs">{trip.destination}</p>
      </div>
      <button onClick={onView} className="w-full py-1.5 border border-white/[0.1] rounded-lg text-sm hover:bg-[#e8614a]/10 hover:border-[#e8614a]/30 hover:text-[#e8614a] transition">
        View
      </button>
    </div>
  </div>
)

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, USA',
    bio: 'Passionate traveler exploring the world one city at a time.',
  })

  const preplanned = MOCK_TRIPS.filter((t) => t.status === 'upcoming')
  const previous = MOCK_TRIPS.filter((t) => t.status === 'completed')

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-outfit">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* User Details */}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-[#e8614a]/30 bg-[#e8614a]/20 flex items-center justify-center text-5xl font-bold text-[#e8614a]">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">User Details</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e8614a] hover:bg-[#d4503a] rounded-lg text-sm font-semibold transition">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="p-1.5 hover:bg-white/[0.07] rounded-lg transition">
                      <X className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e8614a] hover:bg-[#d4503a] rounded-lg text-sm font-semibold transition">
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['name', 'email', 'phone', 'location'] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-xs text-white/40 mb-1 capitalize">{field}</label>
                      <input
                        type="text" value={profile[field]}
                        onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                        className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-white/40 mb-1">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-sm text-white/60">
                  <p><span className="text-white/30">Name:</span> {profile.name}</p>
                  <p><span className="text-white/30">Email:</span> {profile.email}</p>
                  <p><span className="text-white/30">Phone:</span> {profile.phone}</p>
                  <p><span className="text-white/30">Location:</span> {profile.location}</p>
                  <p><span className="text-white/30">Bio:</span> {profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preplanned Trips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Preplanned Trips</h2>
          {preplanned.length === 0 ? (
            <p className="text-white/30 text-sm">No preplanned trips yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {preplanned.map((trip) => (
                <TripCard key={trip.id} trip={trip} onView={() => navigate('/app/trips')} />
              ))}
            </div>
          )}
        </section>

        {/* Previous Trips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Previous Trips</h2>
          {previous.length === 0 ? (
            <p className="text-white/30 text-sm">No previous trips.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previous.map((trip) => (
                <TripCard key={trip.id} trip={trip} onView={() => navigate('/app/trips')} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
