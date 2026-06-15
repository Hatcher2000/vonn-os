import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react'; // <--- Add this back in!
import { useLocalStorage } from '../hooks/useLocalStorage';
const typeStyles = {
    'problem': 'bg-red-100 text-red-700',
    'idea': 'bg-yellow-100 text-yellow-700',
    'obstacle': 'bg-orange-100 text-orange-700',
};
const typeLabels = {
    'problem': '🔴 Problem',
    'idea': '💡 Idea',
    'obstacle': '🚧 Obstacle',
};
const priorityStyles = {
    'high': 'bg-red-50 border-l-4 border-red-500',
    'medium': 'bg-yellow-50 border-l-4 border-yellow-400',
    'low': 'bg-gray-50 border-l-4 border-gray-300',
};
export default function IssuesPage() {
    const [issues, setIssues] = useLocalStorage('issues', []);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('problem');
    const [priority, setPriority] = useState('medium');
    const addIssue = () => {
        if (!title.trim())
            return;
        const newIssue = {
            id: crypto.randomUUID(),
            title,
            type,
            priority,
            solved: false,
            createdAt: new Date(),
        };
        setIssues([...issues, newIssue]);
        setTitle('');
        setType('problem');
        setPriority('medium');
        setShowForm(false);
    };
    const toggleSolved = (id) => {
        setIssues(issues.map(issue => issue.id === id ? { ...issue, solved: !issue.solved } : issue));
    };
    const deleteIssue = (id) => {
        setIssues(issues.filter(issue => issue.id !== id));
    };
    // Sort: unsolved first, then by priority
    const sortedIssues = [...issues].sort((a, b) => {
        if (a.solved !== b.solved)
            return a.solved ? 1 : -1;
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
    });
    return (_jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h2", { className: "text-3xl text-slate-800 font-bold", children: " Focus Areas" }), _jsx("button", { onClick: () => setShowForm(!showForm), className: "px-4 py-2 bg-blue-600 text-white rounded-lg \n                     hover:bg-blue-700 transition-colors font-medium", children: showForm ? 'Cancel' : '+ Add Issue' })] }), _jsx("p", { className: "text-gray-500 mb-8", children: "Identify, discuss, and solve." }), showForm && (_jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm", children: [_jsx("h3", { className: "font-semibold text-lg mb-4", children: "New Issue" }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Issue" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), onKeyDown: (e) => e.key === 'Enter' && addIssue(), placeholder: "Describe the issue...", className: "w-full px-4 py-2 border border-gray-300 rounded-lg \n                           focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type" }), _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg \n                             focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "problem", children: "\uD83D\uDD34 Problem" }), _jsx("option", { value: "idea", children: "\uD83D\uDCA1 Idea" }), _jsx("option", { value: "obstacle", children: "\uD83D\uDEA7 Obstacle" })] })] }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Priority" }), _jsxs("select", { value: priority, onChange: (e) => setPriority(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg \n                             focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "high", children: "\uD83D\uDD25 High" }), _jsx("option", { value: "medium", children: "\u26A1 Medium" }), _jsx("option", { value: "low", children: "\uD83C\uDF3F Low" })] })] })] }), _jsx("button", { onClick: addIssue, className: "w-full py-2 bg-blue-600 text-white rounded-lg \n                         hover:bg-blue-700 transition-colors font-medium", children: "Save Issue" })] })] })), issues.length === 0 && !showForm && (_jsxs("div", { className: "text-center py-16 text-gray-400", children: [_jsx("p", { className: "text-5xl mb-4", children: "\u26A1" }), _jsx("p", { className: "text-lg", children: "No issues yet. Add one above!" })] })), _jsx("ul", { className: "flex flex-col gap-3", children: sortedIssues.map(issue => (_jsx("li", { className: `bg-white rounded-xl p-5 shadow-sm 
                        ${priorityStyles[issue.priority]}
                        ${issue.solved ? 'opacity-50' : ''}`, children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("input", { type: "checkbox", checked: issue.solved, onChange: () => toggleSolved(issue.id), className: "w-5 h-5 accent-blue-600 cursor-pointer shrink-0" }), _jsx("p", { className: `flex-1 font-medium ${issue.solved ? 'line-through text-gray-400' : 'text-gray-800'}`, children: issue.title }), _jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium 
                                ${typeStyles[issue.type]}`, children: typeLabels[issue.type] }), _jsx("button", { onClick: () => deleteIssue(issue.id), className: "text-gray-300 hover:text-red-500 \n                           transition-colors text-xl font-bold shrink-0", children: "\u00D7" })] }) }, issue.id))) }), issues.length > 0 && (_jsxs("p", { className: "text-sm text-gray-400 mt-6", children: [issues.filter(i => i.solved).length, " of ", issues.length, " issues solved"] }))] }));
}
//# sourceMappingURL=IssuesPage.js.map