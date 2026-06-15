import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Target, Zap, BarChart2 } from 'lucide-react';
const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Action Items', path: '/todos', icon: CheckSquare },
    { label: 'Quarterly Goals', path: '/rocks', icon: Target },
    { label: 'Focus Areas', path: '/issues', icon: Zap },
    { label: 'Analytics', path: '/scorecard', icon: BarChart2 },
];
export default function Sidebar() {
    return (_jsxs("aside", { className: "w-72 bg-slate-950 text-slate-200 flex flex-col h-full border-r border-slate-900", children: [_jsxs("div", { className: "p-8 mb-6 flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30", children: "V\u00D8" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-bold text-white tracking-tight text-lg leading-none", children: "Vonn OS" }), _jsx("span", { className: "text-xs text-slate-500 font-medium mt-1", children: "Workspace v1.0" })] })] }), _jsx("nav", { className: "flex-1 px-6 flex flex-col gap-2", children: navItems.map((item) => {
                    const Icon = item.icon;
                    return (_jsxs(NavLink, { to: item.path, 
                        // React Router v7 passes an object with isActive to className
                        className: ({ isActive }) => `flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 group ${isActive
                            ? 'bg-slate-900 text-white border-l-4 border-indigo-500 shadow-md'
                            : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`, children: [_jsx(Icon, { size: 22, strokeWidth: 2.5, className: "text-slate-500 group-[.active]:text-indigo-400 transition-colors duration-300" }), _jsx("span", { children: item.label })] }, item.path));
                }) }), _jsx("div", { className: "p-8 mt-auto border-t border-slate-900/60 bg-slate-950/40", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300", children: "VM" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-bold text-slate-200", children: "Vonn Mercadal" }), _jsx("span", { className: "text-[10px] text-slate-600 font-bold tracking-widest uppercase mt-0.5", children: "Administrator" })] })] }) })] }));
}
//# sourceMappingURL=Sidebar.js.map