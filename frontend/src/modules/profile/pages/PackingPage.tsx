import React, { useState } from 'react'
import { CheckSquare, Plus, Trash2, RotateCcw } from 'lucide-react'

interface ChecklistItem {
  id: number
  name: string
  category: string
  packed: boolean
}

const CATEGORIES = ['Clothing', 'Documents', 'Electronics', 'Toiletries', 'Miscellaneous']

const PackingPage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, name: 'Passport', category: 'Documents', packed: true },
    { id: 2, name: 'Travel Insurance', category: 'Documents', packed: true },
    { id: 3, name: 'Credit Cards', category: 'Documents', packed: false },
    { id: 4, name: 'Shorts', category: 'Clothing', packed: false },
    { id: 5, name: 'T-shirts', category: 'Clothing', packed: true },
    { id: 6, name: 'Phone Charger', category: 'Electronics', packed: true },
    { id: 7, name: 'Laptop', category: 'Electronics', packed: false },
    { id: 8, name: 'Toothbrush', category: 'Toiletries', packed: false },
  ])

  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Miscellaneous')

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Math.max(...items.map((i) => i.id), 0) + 1, name: newItem, category: newCategory, packed: false }])
      setNewItem('')
    }
  }

  const handleTogglePacked = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleReset = () => {
    setItems(items.map((item) => ({ ...item, packed: false })))
  }

  const packedCount = items.filter((item) => item.packed).length
  const packedPercentage = (packedCount / items.length) * 100

  const groupedItems = CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = items.filter((item) => item.category === category)
      return acc
    },
    {} as Record<string, ChecklistItem[]>
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-green-400" />
              <h1 className="text-4xl font-bold">Packing Checklist</h1>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
          <p className="text-white/60">Make sure you don't forget anything!</p>
        </div>

        {/* Progress */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Packing Progress</span>
            <span className="text-2xl font-bold text-indigo-300">
              {packedCount} / {items.length}
            </span>
          </div>
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-cyan-600 transition-all"
              style={{ width: `${packedPercentage}%` }}
            />
          </div>
          <p className="text-white/60 text-sm mt-2">{Math.round(packedPercentage)}% complete</p>
        </div>

        {/* Add Item Form */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Add New Item</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="What do you need to pack?"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddItem}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Checklist by Category */}
        <div className="space-y-6">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-bold mb-3 text-indigo-300">{category}</h3>
              <div className="space-y-2">
                {groupedItems[category] && groupedItems[category].length > 0 ? (
                  groupedItems[category].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-indigo-500/50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => handleTogglePacked(item.id)}
                        className="w-5 h-5 rounded accent-indigo-500 cursor-pointer"
                      />
                      <span className={`flex-1 font-medium ${item.packed ? 'line-through text-white/40' : 'text-white'}`}>
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-white/40 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-white/40 text-sm p-4">No items in this category yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackingPage
