import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';

const bgUrl = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    // Mock login
    setLoading(true);
    setTimeout(() => {
      // Create mock user
      const mockUser = {
        id: Math.random().toString(36).substring(7),
        email: email,
        name: email.split('@')[0],
      };

      // Set auth state
      setUser(mockUser);
      setToken('mock-token-' + Date.now());

      // Redirect to dashboard
      navigate('/app/dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center font-outfit"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay for color tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505] z-0" />

      {/* Main content wrapper */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-8 py-12 min-h-screen">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Big travel text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center text-white"
          >
            <h1 className="text-6xl md:text-[5rem] font-bold leading-[1.1] mb-6 drop-shadow-lg tracking-tight">
              Travel{' '}
              <motion.div
                className="inline-block"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0],
                  rotate: [-12, -4, -12]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Plane className="w-12 h-12 md:w-16 md:h-16 text-blue-200 transform -translate-y-2 -rotate-12" />
              </motion.div>
              <br />EXPLORE <br />HORIZONS
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow text-white/90">
              Where Your Dream Destinations Become Reality
            </h2>
            <p className="text-lg md:text-xl drop-shadow max-w-md text-white/80">
              Embark on a journey where every corner of the world is within your reach
            </p>
          </motion.div>

          {/* Right: Glassmorphism login card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1 flex items-center justify-center w-full"
          >
            <div className="w-full max-w-md rounded-[2rem] bg-white/10 backdrop-blur-md shadow-2xl p-8 sm:p-10 border border-white/20 transition-all duration-300 hover:border-white/30 hover:bg-white-[0.12]">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h3>
                <p className="text-white/80 font-medium">Please sign in to your account</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-white/90">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/40 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-semibold text-white/90">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/40 pr-12 transition-all"
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/30 text-blue-500 focus:ring-blue-500 bg-white/10" />
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">Remember Me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-200 hover:text-white hover:underline transition-colors">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563eb] hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 text-lg mt-2"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-white/20" />
                <span className="mx-4 text-white/70 text-sm font-medium">or</span>
                <div className="flex-grow h-px bg-white/20" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 py-3.5 rounded-xl transition-all duration-300 text-white font-semibold"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <p className="mt-8 text-center text-white/80 text-sm">
                Not registered yet?{' '}
                <a href="/signup" className="text-blue-300 font-bold hover:text-white hover:underline transition-colors">Create an account</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
