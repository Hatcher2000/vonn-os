import { useState } from 'react' // <--- Add this back in!
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Issue {
  id: string
  title: string
  type: 'problem' | 'idea' | 'obstacle'
  priority: 'high' | 'medium' | 'low'
  solved: boolean
  createdAt: Date
}

const typeStyles = {
  'problem':  'bg-red-100 text-red-700',
  'idea':     'bg-yellow-100 text-yellow-700',
  'obstacle': 'bg-orange-100 text-orange-700',
}

const typeLabels = {
  'problem':  '🔴 Problem',
  'idea':     '💡 Idea',
  'obstacle': '🚧 Obstacle',
}

const priorityStyles = {
  'high':   'bg-red-50 border-l-4 border-red-500',
  'medium': 'bg-yellow-50 border-l-4 border-yellow-400',
  'low':    'bg-gray-50 border-l-4 border-gray-300',
}

export default function IssuesPage() {
  const [issues, setIssues] = useLocalStorage<Issue[]>('issues', [])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle]     = useState('')
  const [type, setType]       = useState<Issue['type']>('problem')
  const [priority, setPriority] = useState<Issue['priority']>('medium')

  const addIssue = () => {
    if (!title.trim()) return

    const newIssue: Issue = {
      id: crypto.randomUUID(),
      title,
      type,
      priority,
      solved: false,
      createdAt: new Date(),
    }

    setIssues([...issues, newIssue])
    setTitle('')
    setType('problem')
    setPriority('medium')
    setShowForm(false)
  }

  const toggleSolved = (id: string) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, solved: !issue.solved } : issue
    ))
  }

  const deleteIssue = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id))
  }

  // Sort: unsolved first, then by priority
  const sortedIssues = [...issues].sort((a, b) => {
    if (a.solved !== b.solved) return a.solved ? 1 : -1
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.priority] - order[b.priority]
  })

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl text-slate-800 font-bold"> Focus Areas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Issue'}
        </button>
      </div>
      <p className="text-gray-500 mb-8">Identify, discuss, and solve.</p>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">New Issue</h3>

          <div className="flex flex-col gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addIssue()}
                placeholder="Describe the issue..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type + Priority row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Issue['type'])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="problem">🔴 Problem</option>
                  <option value="idea">💡 Idea</option>
                  <option value="obstacle">🚧 Obstacle</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Issue['priority'])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="high">🔥 High</option>
                  <option value="medium">⚡ Medium</option>
                  <option value="low">🌿 Low</option>
                </select>
              </div>
            </div>

            <button
              onClick={addIssue}
              className="w-full py-2 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors font-medium"
            >
              Save Issue
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {issues.length === 0 && !showForm && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">⚡</p>
          <p className="text-lg">No issues yet. Add one above!</p>
        </div>
      )}

      {/* Issues List */}
      <ul className="flex flex-col gap-3">
        {sortedIssues.map(issue => (
          <li
            key={issue.id}
            className={`bg-white rounded-xl p-5 shadow-sm 
                        ${priorityStyles[issue.priority]}
                        ${issue.solved ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-4">

              {/* Solved checkbox */}
              <input
                type="checkbox"
                checked={issue.solved}
                onChange={() => toggleSolved(issue.id)}
                className="w-5 h-5 accent-blue-600 cursor-pointer shrink-0"
              />

              {/* Title */}
              <p className={`flex-1 font-medium ${
                issue.solved ? 'line-through text-gray-400' : 'text-gray-800'
              }`}>
                {issue.title}
              </p>

              {/* Type badge */}
              <span className={`text-xs px-2 py-1 rounded-full font-medium 
                                ${typeStyles[issue.type]}`}>
                {typeLabels[issue.type]}
              </span>

              {/* Delete */}
              <button
                onClick={() => deleteIssue(issue.id)}
                className="text-gray-300 hover:text-red-500 
                           transition-colors text-xl font-bold shrink-0"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      {issues.length > 0 && (
        <p className="text-sm text-gray-400 mt-6">
          {issues.filter(i => i.solved).length} of {issues.length} issues solved
        </p>
      )}

    </div>
  )
}