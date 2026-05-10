


import React from 'react';

const bgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

export const LoginPage: React.FC = () => {
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
              Travel <span className="inline-block align-middle">✈️</span>
              <br />EXPLORE<br />HORIZONS
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 drop-shadow">
              Where Your Dream Destinations Become Reality
            </h2>
            <p className="text-lg md:text-xl drop-shadow max-w-md">
              Embark on a journey where every corner of the world is within your reach
            </p>
          </div>

          {/* Right: Glassmorphism login card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-lg shadow-2xl p-8 sm:p-10 border border-white/30 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h3>
                <p className="text-white/80 font-medium">Please sign in to your account</p>
              </div>

              <form className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/50 transition-all"
                    placeholder="Enter your email id"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5 mt-4">
                  <label htmlFor="password" className="text-sm font-semibold text-white">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-white placeholder-white/50 pr-12 transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 cursor-pointer hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/30 text-blue-500 focus:ring-blue-500 bg-white/10" />
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">Remember Me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-200 hover:text-white hover:underline transition-colors">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 text-lg mt-6"
                >
                  Login
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
                <span>Continue with Google</span>
              </button>
              
              <p className="mt-8 text-center text-white/80 text-sm">
                Not registered yet?{' '}
                <a href="#" className="text-blue-200 font-bold hover:text-white hover:underline transition-colors">Create an account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
