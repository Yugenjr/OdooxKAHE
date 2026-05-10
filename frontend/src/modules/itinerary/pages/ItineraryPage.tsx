import React, { useState } from 'react'
import { Search, Plus, Trash2, ArrowDown } from 'lucide-react'

interface ActivityRow {
  id: number
  activity: string
  expense: string
}

interface Day {
  id: number
  label: string
  rows: ActivityRow[]
}

const DEFAULT_DAYS: Day[] = [
  {
    id: 1,
    label: 'Day 1',
    rows: [
      { id: 1, activity: 'Arrive at Rome Fiumicino Airport, check into hotel', expense: '₹0' },
      { id: 2, activity: 'Lunch at Trastevere neighbourhood', expense: '₹2,900' },
      { id: 3, activity: 'Evening walk — Colosseum & Roman Forum exterior', expense: '₹0' },
    ],
  },
  {
    id: 2,
    label: 'Day 2',
    rows: [
      { id: 1, activity: 'Vatican Museums & Sistine Chapel guided tour', expense: '₹5,400' },
      { id: 2, activity: 'St. Peter\'s Basilica & Square', expense: '₹0' },
      { id: 3, activity: 'Dinner near Piazza Navona', expense: '₹3,750' },
    ],
  },
  {
    id: 3,
    label: 'Day 3',
    rows: [
      { id: 1, activity: 'Colosseum & Palatine Hill skip-the-line tour', expense: '₹4,600' },
      { id: 2, activity: 'Borghese Gallery visit (pre-booked)', expense: '₹2,500' },
      { id: 3, activity: 'Trevi Fountain & Spanish Steps stroll', expense: '₹0' },
    ],
  },
]

const ItineraryPage: React.FC = () => {
  const [days, setDays] = useState<Day[]>(DEFAULT_DAYS)
  const [search, setSearch] = useState('')

  const updateRow = (dayId: number, rowId: number, field: keyof ActivityRow, value: string) =>
    setDays(days.map((d) =>
      d.id === dayId
        ? { ...d, rows: d.rows.map((r) => r.id === rowId ? { ...r, [field]: value } : r) }
        : d
    ))

  const addRow = (dayId: number) =>
    setDays(days.map((d) =>
      d.id === dayId
        ? { ...d, rows: [...d.rows, { id: Date.now(), activity: '', expense: '' }] }
        : d
    ))

  const removeRow = (dayId: number, rowId: number) =>
    setDays(days.map((d) =>
      d.id === dayId
        ? { ...d, rows: d.rows.filter((r) => r.id !== rowId) }
        : d
    ))

  const addDay = () =>
    setDays([...days, {
      id: Date.now(),
      label: `Day ${days.length + 1}`,
      rows: [{ id: Date.now(), activity: '', expense: '' }],
    }])

  const removeDay = (dayId: number) => setDays(days.filter((d) => d.id !== dayId))

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8]">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Search + controls */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search bar ......"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
            />
          </div>
          {['Group by', 'Filter', 'Sort by...'].map((label) => (
            <button key={label} className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/50 hover:text-[#f0ede8] hover:bg-white/10 transition whitespace-nowrap">
              {label}
            </button>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-8">Itinerary for a selected place</h1>

        {/* Days */}
        <div className="space-y-10">
          {days.map((day) => (
            <div key={day.id} className="group/day">
              {/* Day label */}
              <div className="flex items-center gap-4 mb-4">
                <div className="px-4 py-1.5 border border-[#e8614a]/40 rounded-lg text-sm font-semibold text-[#e8614a] bg-[#e8614a]/[0.08]">
                  {day.label}
                </div>
                <div className="flex-1 h-px bg-white/[0.06]" />
                {days.length > 1 && (
                  <button
                    onClick={() => removeDay(day.id)}
                    className="opacity-0 group-hover/day:opacity-100 text-white/30 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[1fr_160px] gap-4 mb-2 px-1">
                <span className="text-xs text-[#e8614a]/60 text-center font-medium">Physical Activity</span>
                <span className="text-xs text-[#e8614a]/60 text-center font-medium">Expense</span>
              </div>

              {/* Activity rows */}
              <div className="space-y-1">
                {day.rows.map((row, idx) => (
                  <div key={row.id}>
                    <div className="grid grid-cols-[1fr_160px] gap-4 group/row items-center">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={row.activity}
                          onChange={(e) => updateRow(day.id, row.id, 'activity', e.target.value)}
                          placeholder="Enter activity..."
                          className="w-full px-4 py-2.5 bg-transparent border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/40 transition"
                        />
                        {day.rows.length > 1 && (
                          <button
                            onClick={() => removeRow(day.id, row.id)}
                            className="opacity-0 group-hover/row:opacity-100 text-white/25 hover:text-red-400 transition flex-shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={row.expense}
                        onChange={(e) => updateRow(day.id, row.id, 'expense', e.target.value)}
                        placeholder="₹0"
                        className="px-4 py-2.5 bg-transparent border border-white/[0.10] rounded-lg text-sm text-[#f0ede8] placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/40 transition text-center"
                      />
                    </div>

                    {/* Arrow connector between rows */}
                    {idx < day.rows.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="w-4 h-4 text-[#e8614a]/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add row */}
              <button
                onClick={() => addRow(day.id)}
                className="mt-3 flex items-center gap-1.5 text-xs text-white/30 hover:text-[#e8614a] transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add activity
              </button>
            </div>
          ))}
        </div>

        {/* Add Day */}
        <button
          onClick={addDay}
          className="mt-10 w-full flex items-center justify-center gap-2 py-3 border border-white/[0.10] rounded-xl text-sm text-white/50 hover:text-[#f0ede8] hover:border-[#e8614a]/40 hover:bg-[#e8614a]/[0.06] transition"
        >
          <Plus className="w-4 h-4" /> Add another Day
        </button>

      </div>
    </div>
  )
}

export default ItineraryPage
