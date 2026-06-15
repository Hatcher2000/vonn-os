import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
export default function Layout() {
    return (_jsxs("div", { className: "flex h-screen w-screen bg-slate-950 overflow-hidden font-sans", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 h-full overflow-y-auto bg-slate-50 text-slate-900 p-10", children: _jsx("div", { className: "max-w-7xl mx-auto space-y-8", children: _jsx(Outlet, {}) }) })] }));
}
//# sourceMappingURL=Layout.js.map