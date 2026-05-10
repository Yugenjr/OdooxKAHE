import React, { useState } from 'react'
import { Search, Plus, Trash2, Edit2, ChevronDown } from 'lucide-react'

interface Note {
  id: number
  title: string
  content: string
  date: string
  stop: string
  day: string
}

const MOCK_NOTES: Note[] = [
  { id: 1, title: 'Hotel check-in details - Rome stop', content: 'check in after 2pm, room 302, breakfast included (7-10am)', date: 'June 14 2025', stop: 'Rome', day: 'Day 3' },
  { id: 2, title: 'Hotel check-in details - Rome stop', content: 'check in after 2pm, room 302, breakfast included (7-10am)', date: 'June 14 2025', stop: 'Rome', day: 'Day 3' },
  { id: 3, title: 'Hotel check-in details - Rome stop', content: 'check in after 2pm, room 302, breakfast included (7-10am)', date: 'June 14 2025', stop: 'Rome', day: 'Day 3' },
]

type Tab = 'All' | 'by Day' | 'by Stop'

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<Tab>('All')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '', date: '', stop: '', day: '' })

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = () => {
    if (!formData.title || !formData.content) return
    if (editingId !== null) {
      setNotes(notes.map((n) => n.id === editingId ? { ...formData, id: editingId } : n))
    } else {
      setNotes([...notes, { ...formData, id: Date.now() }])
    }
    setShowForm(false)
    setEditingId(null)
    setFormData({ title: '', content: '', date: '', stop: '', day: '' })
  }

  const handleEdit = (note: Note) => {
    setFormData(note)
    setEditingId(note.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => setNotes(notes.filter((n) => n.id !== id))

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
          {(['Group by', 'Filter', 'Sort by...'] as const).map((label) => (
            <button key={label} className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-[#f0ede8] hover:bg-white/10 transition whitespace-nowrap">
              {label}
            </button>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-5">Trip notes</h1>

        {/* Trip selector + Add Note */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-[#f0ede8] transition">
            <span>Paris & Rome Adventure</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setFormData({ title: '', content: '', date: '', stop: '', day: '' }); setEditingId(null); setShowForm(true) }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#e8614a] hover:bg-[#d4503a] rounded-lg text-sm font-semibold transition"
          >
            <Plus className="w-4 h-4" /> Add Note
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(['All', 'by Day', 'by Stop'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition border ${
                tab === t
                  ? 'bg-[#e8614a]/15 text-[#e8614a] border-[#e8614a]/30'
                  : 'text-white/40 border-white/[0.08] hover:text-white/70 hover:bg-white/[0.05]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="mb-6 bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 space-y-3">
            <input
              type="text" placeholder="Note title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
            />
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Stop (e.g. Rome)" value={formData.stop}
                onChange={(e) => setFormData({ ...formData, stop: e.target.value })}
                className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
              />
              <input type="text" placeholder="Day (e.g. Day 3)" value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
              />
              <input type="text" placeholder="Date (e.g. June 14 2025)" value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition"
              />
            </div>
            <textarea
              placeholder="Write your note here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-[#f0ede8] placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#e8614a]/50 transition resize-none"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-white/[0.06] hover:bg-white/10 rounded-lg text-sm transition">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-[#e8614a] hover:bg-[#d4503a] rounded-lg text-sm font-semibold transition">
                {editingId !== null ? 'Update' : 'Save'} Note
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-12">No notes yet. Add your first note!</p>
          ) : (
            filtered.map((note) => (
              <div key={note.id} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 hover:border-[#e8614a]/25 transition group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#f0ede8] mb-1">{note.title}</h3>
                    <p className="text-white/50 text-sm mb-2">{note.content}</p>
                    <p className="text-white/30 text-xs">
                      {note.day && <span>{note.day}: </span>}
                      {note.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleEdit(note)} className="p-1.5 text-white/40 hover:text-[#e8614a] transition rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(note.id)} className="p-1.5 text-white/40 hover:text-red-400 transition rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NotesPage
