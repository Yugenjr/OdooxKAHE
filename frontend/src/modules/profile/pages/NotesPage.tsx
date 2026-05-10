import React, { useState } from 'react'
import { BookOpen, Plus, Trash2, Edit2, Calendar } from 'lucide-react'

interface Note {
  id: number
  title: string
  content: string
  date: string
  day?: string
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Paris Arrival',
      content: 'Arrived at CDG airport. Hotel check-in at 3 PM. Book restaurant for dinner tonight.',
      date: '2025-06-15',
      day: 'Day 1',
    },
    {
      id: 2,
      title: 'Eiffel Tower Visit',
      content: 'Book tickets in advance. Best time: early morning or sunset. Bring water and comfortable shoes.',
      date: '2025-06-16',
      day: 'Day 2',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '', date: '', day: '' })

  const handleAddNote = () => {
    if (formData.title && formData.content) {
      if (editingId) {
        setNotes(notes.map((note) => (note.id === editingId ? { ...formData, id: editingId } : note)))
        setEditingId(null)
      } else {
        setNotes([...notes, { ...formData, id: Math.max(...notes.map((n) => n.id), 0) + 1 }])
      }
      setFormData({ title: '', content: '', date: '', day: '' })
      setShowForm(false)
    }
  }

  const handleEdit = (note: Note) => {
    setFormData(note)
    setEditingId(note.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const sortedNotes = [...notes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl font-bold">Trip Notes & Journal</h1>
            </div>
            {!showForm && (
              <button
                onClick={() => {
                  setFormData({ title: '', content: '', date: '', day: '' })
                  setEditingId(null)
                  setShowForm(true)
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" /> New Note
              </button>
            )}
          </div>
          <p className="text-white/60">Keep track of important details, reminders, and memories</p>
        </div>

        {/* Add/Edit Note Form */}
        {showForm && (
          <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Note' : 'New Note'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Note title"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">Day (Optional)</label>
                  <input
                    type="text"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    placeholder="e.g., Day 1"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your note here..."
                  rows={5}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ title: '', content: '', date: '', day: '' })
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-lg transition"
                >
                  {editingId ? 'Update' : 'Save'} Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-4">
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note) => (
              <div key={note.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{note.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                      {note.day && <span>{note.day}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-white/40 hover:text-indigo-300 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-white/40 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-white/80 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60">No notes yet. Create your first note!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotesPage
