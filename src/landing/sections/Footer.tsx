import { Plane, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] pt-20 mt-20 md:pt-16 md:mt-16 pb-8 font-outfit">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 h-[220px] w-3/4 -translate-x-1/2 bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">

        {/* Top Footer */}
        <div className="flex flex-col items-center justify-between gap-8 pb-12 text-center md:flex-row md:text-left">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20">
              <Plane className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-wide text-white">
              Traveloop
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-400">
            <a
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Product
            </a>

            <a
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Destinations
            </a>

            <a
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Community
            </a>

            <a
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Company
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[{
              icon: Twitter,
              label: 'Twitter',
            }, {
              icon: Instagram,
              label: 'Instagram',
            }, {
              icon: Github,
              label: 'Github',
            }].map(({ icon: Icon, label }, idx) => (
              <a
                key={label}
                href="/"
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ marginTop: 0 }}
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-zinc-500 font-inter md:flex-row md:text-left">

          <p>
            © 2026 Traveloop Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="/"
              className="transition-colors duration-300 hover:text-zinc-300"
            >
              Privacy Policy
            </a>

            <a
              href="/"
              className="transition-colors duration-300 hover:text-zinc-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}