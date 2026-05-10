
import { motion } from 'framer-motion';
import { MapPin, Clock, Coffee, Camera, Train } from 'lucide-react';

const timeline = [
  { day: 1, city: 'Tokyo', action: 'Arrival & Explore', time: '14:00', Icon: Camera, color: 'from-pink-500 to-rose-500' },
  { day: 3, city: 'Kyoto', action: 'Bullet Train', time: '09:30', Icon: Train, color: 'from-indigo-500 to-cyan-500' },
  { day: 5, city: 'Osaka', action: 'Street Food Tour', time: '18:00', Icon: Coffee, color: 'from-amber-500 to-orange-500' },
];

export default function Itinerary() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[#050505] font-outfit">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
              Visual <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">Itinerary Builder</span>
            </h2>
            <p className="text-zinc-400 font-inter text-lg">
              Design your journey like a cinematic storyboard. Drag, drop, and weave your multi-city adventures with unprecedented clarity.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          
          {/* Left: Timeline Cards */}
          <div className="w-full space-y-6 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            {timeline.map((item, idx) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative pl-16 group"
              >
                {/* Timeline Node */}
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${item.color} shadow-lg shadow-${item.color.split('-')[1]}/50 ring-4 ring-[#050505] z-10`} />
                
                {/* Card */}
                <div className="glass-panel p-5 rounded-2xl border border-white/5 group-hover:border-white/20 transition-colors duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-zinc-500 font-medium tracking-wider uppercase mb-2">Day {item.day}</p>
                      <h4 className="text-2xl font-medium text-white">{item.city}</h4>
                    </div>
                    <div className="flex items-center space-x-1 text-zinc-400 bg-white/5 px-2 py-1 rounded-md text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-zinc-300 font-inter text-sm">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <item.Icon className="w-4 h-4" />
                    </div>
                    <p>{item.action}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Map/Visual Preview */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full aspect-[4/3] rounded-3xl glass-panel border border-white/10 overflow-hidden relative"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              
              {/* Fake Map Route Drawing */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M 20 40 Q 40 20 60 50 T 80 30"
                  fill="none"
                  stroke="url(#route-gradient)"
                  strokeWidth="0.5"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="50%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glowing Points */}
              <div className="absolute top-[40%] left-[20%] w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.8)] animate-pulse" />
              <div className="absolute top-[50%] left-[60%] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-[30%] left-[80%] w-3 h-3 rounded-full bg-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.8)] animate-pulse" style={{ animationDelay: '1s' }} />

              {/* Floating UI overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel backdrop-blur-xl p-4 rounded-2xl flex items-center justify-between border border-white/20">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Route Optimized</p>
                    <p className="text-xs text-zinc-400">Saved 4 hours of travel time</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-right">
                  <p className="text-sm font-medium text-white">$450</p>
                  <p className="text-xs text-zinc-400">Total Transport</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
