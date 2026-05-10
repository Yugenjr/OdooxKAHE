
import { motion } from 'framer-motion';
import { Heart, Share2, Bookmark } from 'lucide-react';

const stories = [
  {
    id: 1,
    author: 'Elena R.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1498566113564-b64db59a35d7?q=80&w=800&auto=format&fit=crop',
    title: 'Italian Riviera Escape',
    copies: '12k',
    rotation: -6,
    zIndex: 10,
    offset: 'translate-x-0 translate-y-0 md:translate-x-0 md:translate-y-0'
  },
  {
    id: 2,
    author: 'Marcus T.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop',
    title: 'Venice in Winter',
    copies: '8.4k',
    rotation: 4,
    zIndex: 20,
    offset: '-translate-x-4 translate-y-6 md:translate-x-24 md:translate-y-12'
  },
  {
    id: 3,
    author: 'Sarah J.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
    title: 'Parisian Cafe Hop',
    copies: '15k',
    rotation: -2,
    zIndex: 30,
    offset: 'translate-x-4 -translate-y-6 md:translate-x-48 md:-translate-y-8'
  }
];

export default function Community() {
  return (
    <section className="section-spacing relative overflow-hidden bg-[#050505] font-outfit">
      <div className="section-container relative z-10">
        <div className="flex flex-col gap-16">
          
          {/* Left: Copy */}
          <div className="w-full lg:w-1/3 z-40 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                Explore <br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300">Shared Journeys</span>
              </h2>
              <p className="text-zinc-400 font-inter text-lg mb-8 leading-relaxed">
                Discover world-class itineraries crafted by modern explorers. Clone, customize, and make their perfect trip your own with a single click.
              </p>
              
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                <span>View Community Gallery</span>
              </button>
            </motion.div>
          </div>
          {/* Right: Polaroid Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
              {stories.map((story, idx) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="w-full bg-white p-3 pb-6 rounded-lg shadow-2xl shadow-black/50"
                >
                  <div className="w-full aspect-[4/5] overflow-hidden rounded mb-4 relative group">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-3">
                      <img src={story.avatar} alt={story.author} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-black font-semibold text-lg font-outfit mb-2">{story.title}</p>
                        <p className="text-zinc-500 text-sm font-inter">by {story.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-zinc-400">
                      <Bookmark className="w-3 h-3" />
                      <span className="text-xs font-medium">{story.copies}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
