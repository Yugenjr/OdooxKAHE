
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Traveloop feels less like software and more like a private travel concierge. It completely changed how I plan my monthly trips.",
    author: "James W.",
    role: "Digital Nomad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    text: "The budget analytics are breathtaking. For the first time, I actually enjoy looking at how much I'm spending across different cities.",
    author: "Sophia L.",
    role: "Travel Photographer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    text: "Cloning a community itinerary to Tokyo and letting the AI optimize my transport saved me literally days of research.",
    author: "Michael T.",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[#050505] font-outfit">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Loved by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">Modern Explorers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors duration-300 relative group"
            >
              <Quote className="w-8 h-8 text-white/20 mb-6" />

              <p className="text-zinc-300 font-inter text-lg leading-relaxed mb-12 relative z-10">
                "{item.text}"
              </p>

              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div>
                  <h4 className="text-white font-medium">{item.author}</h4>
                  <p className="text-sm text-zinc-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
