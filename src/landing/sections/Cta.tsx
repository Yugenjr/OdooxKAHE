
import { motion } from 'framer-motion';

export default function Cta() {
  return (
    <section className="section-spacing mt-40 md:mt-32 relative overflow-hidden bg-[#050505] font-outfit border-t border-white/5">
      {/* Background Cinematic Visuals */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent" />
        
        {/* Animated glowing route across the screen */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
          <motion.div 
            className="h-full w-1/4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          />
        </div>
      </div>

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">
            Your next journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-200 glow-text">begins here.</span>
          </h2>
          
          <p className="text-xl text-zinc-400 font-inter mb-10 max-w-xl mx-auto">
            Plan unforgettable travel experiences with intelligence, beauty, and freedom.
          </p>
          
          <button 
            onClick={() => window.location.href = 'http://localhost:5173/login'}
            className="px-10 py-5 bg-white text-black text-lg font-semibold rounded-full hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Launch Traveloop
          </button>
        </motion.div>
      </div>
    </section>
  );
}
