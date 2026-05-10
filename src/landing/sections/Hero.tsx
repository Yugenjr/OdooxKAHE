import { motion } from 'framer-motion';
import { Plane, Map, Compass, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        font-outfit
        pt-24
        pb-20
        flex
        items-center
        before:absolute
        before:inset-0
        before:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%)]
        before:pointer-events-none
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505] opacity-80 z-10" />

        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />

        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen" />

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505] z-10" />
      </div>

      {/* Main Content */}
      <div className="section-container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-20">

        {/* Left Side */}
        <div className="w-full lg:w-[52%] flex flex-col items-start justify-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />

              <span className="text-xs font-medium tracking-widest text-indigo-200 uppercase">
                Premium Travel OS
              </span>
            </div>

            <h1
              className="
                text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-[84px]
                font-bold
                leading-[0.98]
                tracking-[-0.04em]
                mb-6
                max-w-[11ch]
              "
            >
              Plan journeys,
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-200 glow-text">
                not spreadsheets.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-inter leading-relaxed">
              Design immersive multi-city travel experiences with intelligent
              planning, visual itineraries, collaborative journeys, and
              cinematic exploration.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: 'easeOut',
            }}
            className="flex flex-col sm:flex-row sm:items-center items-stretch gap-4 pt-2 w-full sm:w-auto"
          >
            <button
              onClick={() => (window.location.href = '/app')}
              className="
                w-full
                sm:w-auto
                px-8
                py-4
                bg-white
                text-black
                font-semibold
                rounded-full
                hover:bg-indigo-50
                transition-colors
                duration-300
                flex
                items-center
                justify-center
                space-x-2
                group
              "
            >
              <span>Start Planning</span>

              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="
                w-full
                sm:w-auto
                px-8
                py-4
                bg-white/5
                text-white
                font-semibold
                rounded-full
                hover:bg-white/10
                backdrop-blur-md
                border
                border-white/10
                transition-all
                duration-300
                flex
                items-center
                justify-center
                space-x-2
              "
            >
              <Compass className="w-5 h-5 text-zinc-400" />

              <span>Explore Journeys</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
            className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10 w-full max-w-lg"
          >
            <div>
              <p className="text-3xl font-light text-white mb-1">12k+</p>

              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Journeys Created
              </p>
            </div>

            <div>
              <p className="text-3xl font-light text-white mb-1">140</p>

              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Countries Covered
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="relative hidden lg:flex w-full lg:w-[48%] h-[640px] items-center justify-center overflow-visible">

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.3,
            }}
            className="
              absolute
              right-4
              xl:right-0
              top-1/2
              -translate-y-1/2
              w-[380px]
              xl:w-[420px]
              aspect-[4/5]
              rounded-3xl
              overflow-hidden
              glass-panel
              border
              border-white/10
              shadow-2xl
              p-4
            "
          >
            <div className="w-full h-1/2 rounded-2xl overflow-hidden relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop"
                alt="Tokyo"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

                <span className="text-xs font-medium text-white">
                  Live Route
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium text-white">
                    Tokyo to Kyoto
                  </h3>

                  <p className="text-sm text-zinc-400 font-inter">
                    Shinkansen Route
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-white">2h 15m</p>

                  <p className="text-xs text-zinc-500">Duration</p>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              <div className="flex items-center justify-between text-sm font-inter">
                <div className="flex items-center space-x-2 text-zinc-300">
                  <Plane className="w-4 h-4" />
                  <span>Flight added</span>
                </div>

                <div className="flex items-center space-x-2 text-zinc-300">
                  <Map className="w-4 h-4" />
                  <span>3 Cities</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Airline Card */}
          <motion.div
            initial={{ opacity: 0, y: -50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: 'easeOut',
            }}
            className="
              absolute
              left-0
              xl:-left-8
              top-20
              w-[260px]
              xl:w-[280px]
              p-5
              rounded-2xl
              glass-panel
              backdrop-blur-xl
              border
              border-white/10
              shadow-2xl
            "
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-300 font-medium">JL</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Japan Airlines
                  </p>

                  <p className="text-xs text-zinc-400">
                    JAL 005 • First Class
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-xl font-light text-white">JFK</p>

                <p className="text-xs text-zinc-500">11:30 PM</p>
              </div>

              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent relative">
                  <Plane className="w-4 h-4 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                </div>

                <p className="text-[10px] text-zinc-500 mt-2">
                  14h 20m
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-light text-white">HND</p>

                <p className="text-xs text-zinc-500">02:50 AM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}