import { useEffect } from 'react';
import Hero from './sections/Hero';
import Destinations from './sections/Destinations';
import Itinerary from './sections/Itinerary';
import AiCompanion from './sections/AiCompanion';
import Analytics from './sections/Analytics';
import Community from './sections/Community';
import Testimonials from './sections/Testimonials';
import Cta from './sections/Cta';
import Footer from './sections/Footer';
import './landing.css';

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#050505]
        text-white
        font-sans
        antialiased
        selection:bg-indigo-500/30
        selection:text-indigo-200
      "
    >
      <div className="relative flex flex-col">
          <div className="mb-16"><Hero /></div>
          <div className="mb-16"><Destinations /></div>
          <div className="mb-16"><Itinerary /></div>
          <div className="mb-16"><AiCompanion /></div>
          <div className="mb-16"><Analytics /></div>
          <div className="mb-16"><Community /></div>
          <div className="mb-16"><Testimonials /></div>
          <div className="mb-16"><Cta /></div>
          <Footer />
      </div>
    </main>
  );
}