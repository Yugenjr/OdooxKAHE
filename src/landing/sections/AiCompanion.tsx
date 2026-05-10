import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  CloudLightning,
  ArrowRightLeft,
} from 'lucide-react';

export default function AiCompanion() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 font-outfit">

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">

        <div className="flex flex-col items-center gap-20 lg:flex-row lg:items-center mt-8 mb-8">

          {/* LEFT SIDE */}
          <div className="relative flex w-full lg:w-[52%] flex-col gap-6">

            {/* Main AI Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="
                relative
                z-10
                w-full
                md:w-[88%]
                rounded-3xl
                border
                border-white/10
                glass-panel
                p-6
              "
            >
              <div className="mb-4 flex items-center space-x-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                </div>

                <p className="text-sm font-medium text-zinc-200">
                  Traveloop Intelligence
                </p>
              </div>

              <p className="text-lg font-light leading-relaxed text-white md:text-xl">
                "Your Paris to Rome route is inefficient. I've found a
                high-speed rail alternative that saves 3 hours and $120.
                Should I update the itinerary?"
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  className="
                    rounded-xl
                    bg-white
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-black
                    transition-colors
                    hover:bg-zinc-200
                  "
                >
                  Apply Update
                </button>

                <button
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition-colors
                    hover:bg-white/10
                  "
                >
                  Ignore
                </button>
              </div>
            </motion.div>

            {/* Weather Alert Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="
                relative
                z-10
                ml-auto
                w-full
                md:w-[76%]
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                from-black/60
                to-black/40
                glass-panel
                p-5
              "
            >
              <div className="flex items-start space-x-3">

                <CloudLightning className="mt-1 h-5 w-5 shrink-0 text-amber-400" />

                <div>
                  <p className="mb-1 text-sm font-medium text-white">
                    Weather Alert: Rome
                  </p>

                  <p className="font-inter text-sm leading-relaxed text-zinc-400">
                    Heavy rain expected on Day 4. Suggesting indoor museums
                    (Vatican, Pantheon) instead of Colosseum.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-[48%]">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >

              <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-indigo-300">

                <Sparkles className="h-4 w-4" />

                <span className="text-xs font-medium uppercase tracking-widest">
                  AI Companion
                </span>
              </div>

              <h2
                className="
                  mb-6
                  text-4xl
                  font-light
                  leading-[1.05]
                  tracking-[-0.03em]
                  text-white
                  md:text-5xl
                  lg:text-6xl
                "
              >
                An intelligence that
                <br />

                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text font-semibold text-transparent">
                  anticipates your needs.
                </span>
              </h2>

              <p className="mb-12 max-w-xl font-inter text-lg leading-relaxed text-zinc-400">
                Not just a chatbot. Traveloop's AI constantly analyzes your
                route, weather, budget, and local events to quietly suggest
                optimizations that make your journey seamless.
              </p>

              <div className="space-y-10">
                {[
                  {
                    icon: ArrowRightLeft,
                    title: 'Route Optimization',
                    desc: 'Finds faster, cheaper connections automatically.',
                  },
                  {
                    icon: MessageSquare,
                    title: 'Contextual Advice',
                    desc: 'Tailored recommendations based on real-time data.',
                  },
                ].map((feature, idx) => (

                  <div
                    key={idx}
                    className="flex items-start space-x-4"
                  >
                    <div className="glass-panel flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10">

                      <feature.icon className="h-5 w-5 text-zinc-300" />
                    </div>

                    <div>
                      <h4 className="mb-2 text-lg font-medium text-white">
                        {feature.title}
                      </h4>

                      <p className="font-inter text-sm leading-relaxed text-zinc-500">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}