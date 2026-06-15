import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage' // 1. Added the dashboard import
import TodosPage from './pages/TodosPage'
import RocksPage from './pages/RocksPage'
import IssuesPage from './pages/IssuesPage'
import ScorecardPage from './pages/ScorecardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 2. Changed default redirect to point to /dashboard instead of /todos */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* 3. Registered the new dashboard route layout path */}
          <Route path="dashboard" element={<DashboardPage />} />
          
          <Route path="todos"     element={<TodosPage />} />
          <Route path="rocks"     element={<RocksPage />} />
          <Route path="issues"    element={<IssuesPage />} />
          <Route path="scorecard" element={<ScorecardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}