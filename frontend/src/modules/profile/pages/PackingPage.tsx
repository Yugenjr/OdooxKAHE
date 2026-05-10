import React, { useState } from 'react'
import { Search, ChevronDown, Plus, RotateCcw, Share2, Trash2 } from 'lucide-react'

interface ChecklistItem {
  id: number
  name: string
  category: string
  packed: boolean
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 1, name: 'Passport', category: 'Documents', packed: true },
  { id: 2, name: 'Flight Tickets (printed)', category: 'Documents', packed: true },
  { id: 3, name: 'Travel insurance', category: 'Documents', packed: true },
  { id: 4, name: 'Hotel booking confirmation', category: 'Documents', packed: false },
  { id: 5, name: 'Casual Shirts', category: 'Clothing', packed: true },
  { id: 6, name: 'Trousers / jeans', category: 'Clothing', packed: false },
  { id: 7, name: 'Comfortable walking shoes', category: 'Clothing', packed: false },
  { id: 8, name: 'Light jacket / windbreaker', category: 'Clothing', packed: false },
  { id: 9, name: 'Phone charger', category: 'Electronics', packed: true },
  { id: 10, name: 'Universal power adapter', category: 'Electronics', packed: false },
  { id: 11, name: 'Earphone / headphones', category: 'Electronics', packed: false },
]

const CATEGORIES = ['Documents', 'Clothing', 'Electronics']

const PackingPage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_ITEMS)
  const [search, setSearch] = useState('')
  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Documents')

  const toggle = (id: number) => setItems(items.map((i) => i.id === id ? { ...i, packed: !i.packed } : i))
  const remove = (id: number) => setItems(items.filter((i) => i.id !== id))
  const reset = () => setItems(items.map((i) => ({ ...i, packed: false })))

  const handleAdd = () => {
    if (!newItem.trim()) return
    setItems([...items, { id: Date.now(), name: newItem.trim(), category: newCategory, packed: false }])
    setNewItem('')
  }

  const packedCount = items.filter((i) => i.packed).length
  const pct = items.length ? (packedCount / items.length) * 100 : 0

  const filtered = (cat: string) =>
    items.filter((i) => i.category === cat && i.name.toLowerCase().includes(search.toLowerCase()))

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
        <h1 className="text-2xl font-bold mb-4">Packing checklist</h1>

        {/* Trip selector */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-[#f0ede8] transition mb-4">
          <span>Trip: Paris & Rome Adventure</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-white/50 mb-2">Progress: {packedCount}/{items.length} items packed</p>
          <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e8614a] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4 mb-6">
          {CATEGORIES.map((cat) => {
            const catItems = filtered(cat)
            const catPacked = catItems.filter((i) => i.packed).length
            if (catItems.length === 0 && search) return null
            return (
              <div key={cat}>
                {/* Category header */}
                <div className="flex items-center justify-between px-3 py-2 bg-white/[0.06] border border-white/[0.08] rounded-lg mb-2">
                  <span className="text-sm font-semibold text-[#f0ede8]">{cat}</span>
                  <span className="text-xs text-white/40">{catPacked}/{catItems.length}</span>
                </div>

                {/* Items */}
                <div className="space-y-1 pl-1">
                  {catItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] group transition">
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => toggle(item.id)}
                        className="w-4 h-4 rounded cursor-pointer accent-[#e8614a] flex-shrink-0"
                      />
                      <span className={`flex-1 text-sm ${item.packed ? 'line-through text-white/30' : 'text-white/80'}`}>
                        {item.name}
                      </span>
                      <button
                        onClick={() => remove(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Add item inline */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="New item name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/60 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
          >
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#141414]">{c}</option>)}
          </select>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-[#f0ede8] hover:bg-white/10 transition"
          >
            <Plus className="w-4 h-4" /> add item to checklist
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-[#f0ede8] hover:bg-white/10 transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset all
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#e8614a] hover:bg-[#d4503a] rounded-lg text-sm font-semibold transition ml-auto">
            <Share2 className="w-4 h-4" /> Share checklist
          </button>
        </div>
      </div>
    </div>
  )
}

export default PackingPage
