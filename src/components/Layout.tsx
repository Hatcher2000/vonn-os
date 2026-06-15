import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    // The outer wrapper matches your sidebar (bg-slate-950)
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans">
      <Sidebar />

      {/* The main canvas is now light (bg-slate-50) with dark text (text-slate-900) */}
      <main className="flex-1 h-full overflow-y-auto bg-slate-50 text-slate-900 p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}