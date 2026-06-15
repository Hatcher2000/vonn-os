import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
// Generate last 4 week labels (Oldest to Newest)
const getWeekLabels = () => {
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i * 7);
        weeks.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return weeks;
};
const weeks = getWeekLabels();
export default function ScorecardPage() {
    const [metrics, setMetrics] = useLocalStorage('metrics', []);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [goal, setGoal] = useState('');
    const [unit, setUnit] = useState('');
    const addMetric = () => {
        if (!title.trim() || !goal)
            return;
        const newMetric = {
            id: crypto.randomUUID(),
            title,
            goal: parseFloat(goal),
            unit,
            values: {},
        };
        setMetrics([...metrics, newMetric]);
        setTitle('');
        setGoal('');
        setUnit('');
        setShowForm(false);
    };
    const updateValue = (metricId, week, value) => {
        setMetrics(metrics.map(m => m.id === metricId
            ? { ...m, values: { ...m.values, [week]: value === '' ? null : parseFloat(value) } }
            : m));
    };
    const deleteMetric = (id) => {
        setMetrics(metrics.filter(m => m.id !== id));
    };
    const calculateStats = (metric) => {
        const validValues = Object.values(metric.values).filter((v) => v !== null && !isNaN(v));
        const total = validValues.reduce((sum, val) => sum + val, 0);
        const average = validValues.length > 0 ? total / validValues.length : 0;
        return { total, average, hasData: validValues.length > 0 };
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto text-slate-800", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-3xl font-bold", children: "\uD83D\uDCCA Analytics" }), _jsx("button", { onClick: () => setShowForm(!showForm), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm", children: showForm ? 'Cancel' : '+ Add Metric' })] }), showForm && (_jsxs("div", { className: "bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm", children: [_jsx("h3", { className: "font-semibold text-lg mb-4 text-slate-900", children: "New Metric" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1", children: "Metric Name" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Revenue", className: "w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1", children: "Weekly Goal" }), _jsx("input", { type: "number", value: goal, onChange: (e) => setGoal(e.target.value), placeholder: "e.g. 5000", className: "w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1", children: "Unit Symbol" }), _jsx("input", { type: "text", value: unit, onChange: (e) => setUnit(e.target.value), placeholder: "e.g. $", className: "w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] })] }), _jsx("button", { onClick: addMetric, className: "mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm", children: "Save Metric" })] })), _jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse min-w-[800px]", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50/70 border-b border-slate-200 text-left", children: [_jsx("th", { className: "px-6 py-4 text-xs font-bold text-slate-500 uppercase", children: "Metric" }), _jsx("th", { className: "px-4 py-4 text-xs font-bold text-blue-600 uppercase text-center", children: "Total" }), weeks.map(week => (_jsx("th", { className: "px-3 py-4 text-xs font-bold text-slate-500 uppercase text-center", children: week }, week))), _jsx("th", { className: "px-4 py-4" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100", children: metrics.map(metric => {
                                const { total, average, hasData } = calculateStats(metric);
                                return (_jsxs("tr", { className: "hover:bg-slate-50/40", children: [_jsx("td", { className: "px-6 py-4 font-semibold text-sm", children: metric.title }), _jsx("td", { className: "px-4 py-4 text-center text-sm font-bold", children: hasData ? total.toLocaleString() : '—' }), weeks.map(week => (_jsx("td", { className: "px-3 py-4 text-center", children: _jsx("input", { type: "number", value: metric.values[week] ?? '', onChange: (e) => updateValue(metric.id, week, e.target.value), className: "w-20 text-center py-1 rounded border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-blue-500" }) }, week))), _jsx("td", { className: "px-4 py-4 text-right", children: _jsx("button", { onClick: () => deleteMetric(metric.id), className: "text-slate-300 hover:text-rose-600 font-bold text-lg transition-colors px-2", children: "\u00D7" }) })] }, metric.id));
                            }) })] }) })] }));
}
//# sourceMappingURL=ScorecardPage.js.map