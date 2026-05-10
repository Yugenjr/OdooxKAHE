import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const bgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80'

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Mock signup
    setLoading(true)
    setTimeout(() => {
      // Create mock user
      const mockUser = {
        id: Math.random().toString(36).substring(7),
        email: email,
        name: name,
      }

      // Set auth state
      setUser(mockUser)
      setToken('mock-token-' + Date.now())

      // Redirect to dashboard
      navigate('/app/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay for color tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a1c71]/80 via-[#d76d77]/70 to-[#ffaf7b]/70 z-0" />

      {/* Main content wrapper */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-7xl flex items-center justify-between gap-12">
          {/* Left: Big travel text */}
          <div className="flex-1 flex flex-col justify-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
              Join the <span className="inline-block align-middle">🌍</span>
              <br />Travel <br />Community
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 drop-shadow">
              Create Your Travel Adventure
            </h2>
            <p className="text-lg md:text-xl drop-shadow max-w-md">
              Sign up today and start planning your next amazing journey with Traveloop
            </p>
          </div>

          {/* Right: Glassmorphism signup card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-lg shadow-2xl p-8 sm:p-10 border border-white/30 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h3>
                <p className="text-white/80 font-medium">Join Traveloop today</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-white">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/50 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/50 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-semibold text-white">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/50 pr-12 transition-all"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 cursor-pointer hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-semibold text-white">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/50 pr-12 transition-all"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 cursor-pointer hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer group pt-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/30 text-blue-500 focus:ring-blue-500 bg-white/10" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">I agree to the Terms of Service</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 text-lg mt-6"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-white/20" />
                <span className="mx-4 text-white/70 text-sm font-medium">or</span>
                <div className="flex-grow h-px bg-white/20" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 py-3.5 rounded-xl transition-all duration-300 text-white font-semibold"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span>Sign up with Google</span>
              </button>

              <p className="mt-8 text-center text-white/80 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-blue-200 font-bold hover:text-white hover:underline transition-colors">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
