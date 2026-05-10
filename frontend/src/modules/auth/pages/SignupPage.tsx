import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Plane, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

const bgUrl = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in required fields (First Name, Last Name, Email)');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: `${formData.firstName} ${formData.lastName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          city: formData.city,
          country: formData.country,
          additional_info: formData.additionalInfo,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.session?.user) {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email || formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
      })
      setToken(data.session.access_token)
      navigate('/app/dashboard')
    } else {
      setError('Account created. Please check your email to confirm the account before logging in.')
      navigate('/login')
    }

    setLoading(false)
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center font-outfit overflow-y-auto"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay for color tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505] z-0" />

      {/* Main content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-8">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left: Big travel text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center text-white hidden lg:flex"
          >
            <h1 className="text-5xl md:text-6xl xl:text-[5rem] font-bold leading-[1.1] mb-6 drop-shadow-lg tracking-tight">
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
            <p className="text-lg drop-shadow max-w-md text-white/80">
              Join our community and embark on a journey where every corner of the world is within your reach.
            </p>
          </motion.div>

          {/* Right: Glassmorphism signup card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1 flex items-center justify-center w-full my-auto"
          >
            <div className="w-full max-w-[600px] rounded-[1.5rem] bg-white/10 backdrop-blur-md shadow-2xl p-6 sm:p-8 border border-white/20 transition-all duration-300 hover:border-white/30 hover:bg-white-[0.12]">
              
              <div className="text-center mb-5">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">Create Account</h3>
                <p className="text-white/80 font-medium text-sm">Join Traveloop today</p>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Photo Upload Circle */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/40 flex flex-col items-center justify-center cursor-pointer hover:border-white/80 hover:bg-white/5 transition-all group">
                    <Camera className="w-5 h-5 text-white/50 group-hover:text-white/80 mb-0.5" />
                    <span className="text-[10px] text-white/50 group-hover:text-white/80">Photo</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-white/90 ml-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all"
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-white/90 ml-1">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white text-sm placeholder-white/40 transition-all resize-none"
                    placeholder="Additional Information ...."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563eb] hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 text-base mt-2"
                >
                  {loading ? 'Registering...' : 'Register Users'}
                </button>
              </form>

              <p className="mt-5 text-center text-white/80 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-blue-300 font-bold hover:text-white hover:underline transition-colors">Login here</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
