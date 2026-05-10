
import { motion } from 'framer-motion';
import { PieChart, TrendingDown } from 'lucide-react';

export default function Analytics() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[#050505] font-outfit border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#050505] to-[#050505]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
              Immersive <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">Budget Analytics</span>
            </h2>
            <p className="text-zinc-400 font-inter text-lg">
              Understand your travel spending through beautiful, interactive visual storytelling. No more boring spreadsheets.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Main Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Total Projected Cost</p>
                <h3 className="text-4xl font-light text-white">$4,250<span className="text-xl text-zinc-500">.00</span></h3>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center space-x-2 text-emerald-400">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">12% under budget</span>
              </div>
            </div>

            {/* Fake Abstract Chart Visual */}
            <div className="h-48 w-full relative flex items-end justify-between gap-2 opacity-80">
              {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                  className="w-full bg-gradient-to-t from-cyan-500/20 to-cyan-400 rounded-t-sm relative group cursor-pointer"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs py-1 px-2 rounded font-medium">
                    ${h * 10}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          </motion.div>

          {/* Breakdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <PieChart className="w-5 h-5 text-indigo-400" />
                <h4 className="text-lg font-medium text-white">Breakdown</h4>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Flights', value: '45%', color: 'bg-indigo-400' },
                  { label: 'Hotels', value: '30%', color: 'bg-cyan-400' },
                  { label: 'Food', value: '15%', color: 'bg-emerald-400' },
                  { label: 'Activities', value: '10%', color: 'bg-amber-400' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">{item.label}</span>
                      <span className="text-white">{item.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: item.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                        className={`h-full ${item.color} rounded-full`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
