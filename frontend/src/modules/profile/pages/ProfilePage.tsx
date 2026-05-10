import React, { useState } from 'react'
import { Settings, User, Mail, Phone, MapPin, Edit2, Save, Lock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  avatar?: string
}

const ProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, USA',
    bio: 'Passionate traveler and adventure seeker exploring the world one city at a time.',
  })

  const [savedSettings, setSavedSettings] = useState({
    newsletter: true,
    notifications: true,
    publicProfile: true,
    shareAnalytics: false,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-bold">Profile & Settings</h1>
          </div>
          <p className="text-white/60">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-500/40">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">{profile.name}</h2>
                <p className="text-white/60">{profile.email}</p>
                <p className="text-white/40 text-sm mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
              >
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>

          {!isEditing && <p className="text-white/70 mb-4">{profile.bio}</p>}

          {/* Edit Form */}
          {isEditing && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-lg transition"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Preferences</h3>

          <div className="space-y-4">
            {[
              { key: 'newsletter', label: 'Email Newsletter', description: 'Receive travel tips and exclusive offers' },
              { key: 'notifications', label: 'Push Notifications', description: 'Get reminders for your trips' },
              { key: 'publicProfile', label: 'Public Profile', description: 'Allow others to discover your trips' },
              { key: 'shareAnalytics', label: 'Share Analytics', description: 'Help us improve with anonymous data' },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <div>
                  <p className="font-semibold">{setting.label}</p>
                  <p className="text-white/60 text-sm">{setting.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={savedSettings[setting.key as keyof typeof savedSettings]}
                  onChange={(e) =>
                    setSavedSettings({
                      ...savedSettings,
                      [setting.key]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded accent-indigo-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" /> Security
          </h3>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
              <span className="font-semibold">Change Password</span>
              <span className="text-white/40">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
              <span className="font-semibold">Two-Factor Authentication</span>
              <span className="text-white/40">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
              <span className="font-semibold">Active Sessions</span>
              <span className="text-white/40">→</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-600/10 border border-red-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h3>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition text-left border border-red-500/30">
              <span className="font-semibold">Download Your Data</span>
              <span className="text-white/40">→</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition text-left border border-red-500/30"
            >
              <span className="font-semibold">Logout</span>
              <span className="text-white/40">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition text-left border border-red-500/30">
              <span className="font-semibold">Delete Account</span>
              <span className="text-white/40">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
