const TripCard = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300">

      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
        alt="Trip"
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold text-white mb-2">
          Bali Adventure
        </h2>

        <p className="text-white/50 mb-4">
          March 12 - March 20
        </p>

        <div className="flex items-center justify-between">

          <span className="text-cyan-400 font-medium">
            5 Destinations
          </span>

          <button className="bg-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-500 transition">
            View
          </button>

        </div>

      </div>

    </div>
  )
}

export default TripCard