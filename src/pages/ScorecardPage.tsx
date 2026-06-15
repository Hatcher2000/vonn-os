import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Metric {
  id: string
  title: string
  goal: number
  unit: string
  values: Record<string, number | null>
}

// Generate last 4 week labels (Oldest to Newest)
const getWeekLabels = () => {
  const weeks = []
  for (let i = 3; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i * 7)
    weeks.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
  }
  return weeks
}

const weeks = getWeekLabels()

export default function ScorecardPage() {
  const [metrics, setMetrics] = useLocalStorage<Metric[]>('metrics', [])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle]   = useState('')
  const [goal, setGoal]     = useState('')
  const [unit, setUnit]     = useState('')

  const addMetric = () => {
    if (!title.trim() || !goal) return
    const newMetric: Metric = {
      id: crypto.randomUUID(),
      title,
      goal: parseFloat(goal),
      unit,
      values: {},
    }
    setMetrics([...metrics, newMetric])
    setTitle(''); setGoal(''); setUnit('');
    setShowForm(false)
  }

  const updateValue = (metricId: string, week: string, value: string) => {
    setMetrics(metrics.map(m =>
      m.id === metricId
        ? { ...m, values: { ...m.values, [week]: value === '' ? null : parseFloat(value) } }
        : m
    ))
  }

  const deleteMetric = (id: string) => {
    setMetrics(metrics.filter(m => m.id !== id))
  }

  const calculateStats = (metric: Metric) => {
    const validValues = Object.values(metric.values).filter((v): v is number => v !== null && !isNaN(v))
    const total = validValues.reduce((sum, val) => sum + val, 0)
    const average = validValues.length > 0 ? total / validValues.length : 0
    
    return { total, average, hasData: validValues.length > 0 }
  }

  return (
    <div className="max-w-7xl mx-auto text-slate-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">📊 Analytics</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
          {showForm ? 'Cancel' : '+ Add Metric'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-slate-900">New Metric</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Metric Name</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Revenue" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Weekly Goal</label>
              <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. 5000" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Unit Symbol</label>
              <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g. $" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>
          <button onClick={addMetric} className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">Save Metric</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200 text-left">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Metric</th>
              <th className="px-4 py-4 text-xs font-bold text-blue-600 uppercase text-center">Total</th>
              {weeks.map(week => (
                <th key={week} className="px-3 py-4 text-xs font-bold text-slate-500 uppercase text-center">{week}</th>
              ))}
              <th className="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {metrics.map(metric => {
              const { total, average, hasData } = calculateStats(metric)
              return (
                <tr key={metric.id} className="hover:bg-slate-50/40">
                  <td className="px-6 py-4 font-semibold text-sm">{metric.title}</td>
                  <td className="px-4 py-4 text-center text-sm font-bold">
                    {hasData ? total.toLocaleString() : '—'}
                  </td>
                  {weeks.map(week => (
                    <td key={week} className="px-3 py-4 text-center">
                       <input
                          type="number"
                          value={metric.values[week] ?? ''}
                          onChange={(e) => updateValue(metric.id, week, e.target.value)}
                          className="w-20 text-center py-1 rounded border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-blue-500"
                        />
                    </td>
                  ))}
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => deleteMetric(metric.id)} className="text-slate-300 hover:text-rose-600 font-bold text-lg transition-colors px-2">×</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}