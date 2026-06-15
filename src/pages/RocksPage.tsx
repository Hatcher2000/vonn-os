import { useState } from 'react' // <--- Add this back in!
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Rock {
  id: string
  title: string
  owner: string
  status: 'on-track' | 'off-track' | 'complete'
  dueDate: string
  createdAt: Date
}

// Status badge colors
const statusStyles = {
  'on-track':  'bg-green-100 text-green-700',
  'off-track': 'bg-red-100 text-red-700',
  'complete':  'bg-blue-100 text-blue-700',
}

const statusLabels = {
  'on-track':  '🟢 On Track',
  'off-track': '🔴 Off Track',
  'complete':  '✅ Complete',
}

export default function RocksPage() {
  const [rocks, setRocks] = useLocalStorage<Rock[]>('rocks', [])

  // Form state — one useState per field
  const [title, setTitle]     = useState('')
  const [owner, setOwner]     = useState('')
  const [dueDate, setDueDate] = useState('')

  // Controls whether the Add form is visible
  const [showForm, setShowForm] = useState(false)

  const addRock = () => {
    if (!title.trim() || !owner.trim()) return

    const newRock: Rock = {
      id: crypto.randomUUID(),
      title,
      owner,
      status: 'on-track',  // always starts on-track
      dueDate,
      createdAt: new Date(),
    }

    setRocks([...rocks, newRock])

    // Reset form fields
    setTitle('')
    setOwner('')
    setDueDate('')
    setShowForm(false)
  }

  const updateStatus = (id: string, status: Rock['status']) => {
    setRocks(rocks.map(rock =>
      rock.id === id ? { ...rock, status } : rock
    ))
  }

  const deleteRock = (id: string) => {
    setRocks(rocks.filter(rock => rock.id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold"> Quarterly Goals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Rock'}
        </button>
      </div>
      <p className="text-gray-500 mb-8">Your top priorities this quarter.</p>

      {/* Add Rock Form — only shows when showForm is true */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">New Rock</h3>

          <div className="flex flex-col gap-4">
            {/* Title field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rock Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Launch new website"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Owner field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="e.g. John"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Due Date field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              onClick={addRock}
              className="w-full py-2 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors font-medium"
            >
              Save Rock
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {rocks.length === 0 && !showForm && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🪨</p>
          <p className="text-lg">No rocks yet. Add your first priority!</p>
        </div>
      )}

      {/* Rocks List */}
      <ul className="flex flex-col gap-4">
        {rocks.map(rock => (
          <li
            key={rock.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">

              {/* Left side — title + meta */}
              <div className="flex-1">
                <p className={`font-semibold text-lg ${
                  rock.status === 'complete' ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                  {rock.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  👤 {rock.owner}
                  {rock.dueDate && (
                    <span className="ml-4">📅 {rock.dueDate}</span>
                  )}
                </p>
              </div>

              {/* Right side — status + delete */}
              <div className="flex items-center gap-3">

                {/* Status Dropdown */}
                <select
                  value={rock.status}
                  onChange={(e) => updateStatus(rock.id, e.target.value as Rock['status'])}
                  className={`text-sm px-3 py-1 rounded-full font-medium border-0 
                              cursor-pointer ${statusStyles[rock.status]}`}
                >
                  <option value="on-track">🟢 On Track</option>
                  <option value="off-track">🔴 Off Track</option>
                  <option value="complete">✅ Complete</option>
                </select>

                {/* Delete */}
                <button
                  onClick={() => deleteRock(rock.id)}
                  className="text-gray-300 hover:text-red-500 
                             transition-colors text-xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer count */}
      {rocks.length > 0 && (
        <p className="text-sm text-gray-400 mt-6">
          {rocks.filter(r => r.status === 'complete').length} of {rocks.length} rocks complete
        </p>
      )}

    </div>
  )
}