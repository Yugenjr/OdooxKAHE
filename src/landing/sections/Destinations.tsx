import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Navigation } from 'lucide-react';

const destinations = [
  {
    id: 1,
    city: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    budget: '$2,400',
    weather: '18°C',
    WeatherIcon: Sun,
    duration: '7 Days',
    activities: ['Temple Run', 'Tea Ceremony', 'Bamboo Forest'],
  },
  {
    id: 2,
    city: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1964&auto=format&fit=crop',
    budget: '$3,100',
    weather: '24°C',
    WeatherIcon: Sun,
    duration: '5 Days',
    activities: ['Sailing', 'Wine Tasting', 'Oia Sunset'],
  },
  {
    id: 3,
    city: 'Reykjavik',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2159&auto=format&fit=crop',
    budget: '$3,800',
    weather: '4°C',
    WeatherIcon: Cloud,
    duration: '6 Days',
    activities: ['Northern Lights', 'Blue Lagoon', 'Glacier Hike'],
  },
  {
    id: 4,
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
    budget: '$4,500',
    weather: '32°C',
    WeatherIcon: Sun,
    duration: '4 Days',
    activities: ['Desert Safari', 'Burj Khalifa', 'Shopping'],
  }
];

export default function Destinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="section-spacing relative overflow-hidden bg-[#050505] font-outfit mt-24 md:mt-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="section-container relative z-10 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
              Explore <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">Destinations</span>
            </h2>
            <p className="text-zinc-400 font-inter max-w-md mb-10 md:mb-14">
              Curated experiences around the globe. Discover your next adventure with our intelligent destination insights.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <button className="text-sm font-medium text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              View All Regions
            </button>
          </motion.div>
        </div>
      </div>

      {/* Grid Area */}
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-8 xl:gap-10">
        {destinations.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -10, rotate: idx % 2 === 0 ? 1 : -1 }}
            className="w-full h-[520px] relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${dest.image})` }}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="glass-panel px-3 py-1.5 rounded-full flex items-center space-x-2">
                  <dest.WeatherIcon className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium text-white">{dest.weather}</span>
                </div>
                <div className="glass-panel px-3 py-1.5 rounded-full">
                  <span className="text-sm font-medium text-white">{dest.duration}</span>
                </div>
              </div>
              
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center space-x-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-400 uppercase tracking-wider">{dest.country}</span>
                </div>
                <h3 className="text-3xl font-semibold text-white mb-4">{dest.city}</h3>
                
                <div className="flex items-center justify-between mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase mb-1">Avg. Budget</p>
                    <p className="text-xl font-medium text-white">{dest.budget}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400 uppercase mb-1">Top Activity</p>
                    <p className="text-sm font-medium text-white">{dest.activities[0]}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-500 mix-blend-overlay" />
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}
