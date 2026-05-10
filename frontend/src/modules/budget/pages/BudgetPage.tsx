import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Section {
  id: number
  title: string
  description: string
  dateRange: string
  budget: string
}

const DEFAULT_SECTIONS: Section[] = [
  {
    id: 1,
    title: 'Section 1:',
    description: 'Flight — Paris to Rome\nRound-trip economy class tickets for 2 passengers. Includes checked baggage and in-flight meals.',
    dateRange: 'Jun 15 to Jun 22',
    budget: '$480',
  },
  {
    id: 2,
    title: 'Section 2:',
    description: 'Hotel — Rome City Centre\n4-star hotel stay for 5 nights near the Colosseum. Breakfast included, free cancellation until Jun 10.',
    dateRange: 'Jun 22 to Jun 27',
    budget: '$750',
  },
  {
    id: 3,
    title: 'Section 3:',
    description: 'Activities & Sightseeing\nVatican Museums, Colosseum guided tour, Borghese Gallery. Pre-booked skip-the-line tickets.',
    dateRange: 'Jun 23 to Jun 26',
    budget: '$210',
  },
]

const BudgetPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS)

  const update = (id: number, field: keyof Section, value: string) =>
    setSections(sections.map((s) => s.id === id ? { ...s, [field]: value } : s))

  const addSection = () =>
    setSections([...sections, {
      id: Date.now(),
      title: `Section ${sections.length + 1}:`,
      description: 'Add details about this section — transport, accommodation, or activity.\nInclude any important notes or booking references here.',
      dateRange: '',
      budget: '',
    }])

  const remove = (id: number) => setSections(sections.filter((s) => s.id !== id))

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8]">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-4">

        {sections.map((section) => (
          <div key={section.id} className="border border-white/[0.10] rounded-2xl p-6 group hover:border-white/[0.16] transition">

            {/* Title */}
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={section.title}
                onChange={(e) => update(section.id, 'title', e.target.value)}
                className="text-base font-bold bg-transparent text-[#f0ede8] focus:outline-none w-full"
              />
              {sections.length > 1 && (
                <button
                  onClick={() => remove(section.id)}
                  className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400 transition ml-2 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Description */}
            <textarea
              value={section.description}
              onChange={(e) => update(section.id, 'description', e.target.value)}
              rows={2}
              className="w-full bg-transparent text-white/50 text-sm focus:outline-none resize-none mb-5 leading-relaxed"
            />

            {/* Date Range + Budget — pill bordered inputs */}
            <div className="flex gap-3">
              <input
                type="text"
                value={section.dateRange}
                onChange={(e) => update(section.id, 'dateRange', e.target.value)}
                placeholder="Date Range:   xxx to yyy"
                className="w-48 px-4 py-2 bg-transparent border border-white/[0.15] rounded-lg text-sm text-white/70 placeholder-white/30 focus:outline-none focus:border-[#e8614a]/50 transition"
              />
              <input
                type="text"
                value={section.budget}
                onChange={(e) => update(section.id, 'budget', e.target.value)}
                placeholder="Budget of this section"
                className="flex-1 px-4 py-2 bg-transparent border border-white/[0.15] rounded-lg text-sm text-white/70 placeholder-white/30 focus:outline-none focus:border-[#e8614a]/50 transition text-center"
              />
            </div>
          </div>
        ))}

        {/* Add another Section */}
        <div className="flex justify-center pt-2">
          <button
            onClick={addSection}
            className="flex items-center gap-2 px-8 py-3 border border-white/[0.12] rounded-xl text-sm text-white/60 hover:text-[#f0ede8] hover:border-[#e8614a]/40 hover:bg-[#e8614a]/[0.06] transition"
          >
            <Plus className="w-4 h-4" />
            Add another Section
          </button>
        </div>

      </div>
    </div>
  )
}

export default BudgetPage
