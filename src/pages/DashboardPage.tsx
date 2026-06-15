import { LayoutDashboard, CheckSquare, Target, Zap, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  // Mock data to preview your platform metrics beautifully
  const overviewStats = [
    { title: 'Task Progress', value: '84%', desc: '12 completed this week', icon: CheckSquare, color: 'text-emerald-400 bg-emerald-500/10' },
    { title: 'Quarterly Rocks', value: '4 / 5', desc: 'On track for Q2 targets', icon: Target, color: 'text-indigo-400 bg-indigo-500/10' },
    { title: 'Active Vitals', value: '3 Issues', desc: '1 high priority roadblock', icon: Zap, color: 'text-amber-400 bg-amber-500/10' },
    { title: 'Scorecard Health', value: '92%', desc: 'KPI targets met smoothly', icon: BarChart2, color: 'text-violet-400 bg-violet-500/10' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div>
        <h1 className="text-4xl font-black tracking-tight text-slate-700">DASHBOARD</h1>
        <p className="text-sm text-slate-800 mt-2 font-medium">Welcome back, Administrator. Here is your enterprise performance breakdown.</p>
      </div>

      {/* Grid Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-xl hover:border-slate-700/50 transition-all duration-300 group">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.title}</span>
                  <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 font-medium flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-400" />
                {stat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Strategic Operational Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {/* Main Strategic Updates Box */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800/60 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <LayoutDashboard className="text-indigo-500" size={20} />
            Strategic Operations Stream
          </h2>
          <div className="mt-6 border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm font-medium">
            No system anomalies detected. All business vectors are functioning within expected parameters.
          </div>
        </div>

        {/* Priority Action Items Radar */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="text-amber-500" size={20} />
              Priority Radar
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Immediate strategic objectives requiring assessment.</p>
          </div>
          <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs font-medium my-6">
            Clear deck. Complete your daily scorecard inputs to update values.
          </div>
          <button className="w-full bg-slate-900 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white transition-all duration-300 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase">
            Initialize System Audit
          </button>
        </div>
      </div>
    </div>
  )
}