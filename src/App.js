import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage'; // 1. Added the dashboard import
import TodosPage from './pages/TodosPage';
import RocksPage from './pages/RocksPage';
import IssuesPage from './pages/IssuesPage';
import ScorecardPage from './pages/ScorecardPage';
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "todos", element: _jsx(TodosPage, {}) }), _jsx(Route, { path: "rocks", element: _jsx(RocksPage, {}) }), _jsx(Route, { path: "issues", element: _jsx(IssuesPage, {}) }), _jsx(Route, { path: "scorecard", element: _jsx(ScorecardPage, {}) })] }) }) }));
}
//# sourceMappingURL=App.js.map