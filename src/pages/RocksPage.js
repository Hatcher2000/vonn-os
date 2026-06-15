import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react'; // <--- Add this back in!
import { useLocalStorage } from '../hooks/useLocalStorage';
// Status badge colors
const statusStyles = {
    'on-track': 'bg-green-100 text-green-700',
    'off-track': 'bg-red-100 text-red-700',
    'complete': 'bg-blue-100 text-blue-700',
};
const statusLabels = {
    'on-track': '🟢 On Track',
    'off-track': '🔴 Off Track',
    'complete': '✅ Complete',
};
export default function RocksPage() {
    const [rocks, setRocks] = useLocalStorage('rocks', []);
    // Form state — one useState per field
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');
    const [dueDate, setDueDate] = useState('');
    // Controls whether the Add form is visible
    const [showForm, setShowForm] = useState(false);
    const addRock = () => {
        if (!title.trim() || !owner.trim())
            return;
        const newRock = {
            id: crypto.randomUUID(),
            title,
            owner,
            status: 'on-track', // always starts on-track
            dueDate,
            createdAt: new Date(),
        };
        setRocks([...rocks, newRock]);
        // Reset form fields
        setTitle('');
        setOwner('');
        setDueDate('');
        setShowForm(false);
    };
    const updateStatus = (id, status) => {
        setRocks(rocks.map(rock => rock.id === id ? { ...rock, status } : rock));
    };
    const deleteRock = (id) => {
        setRocks(rocks.filter(rock => rock.id !== id));
    };
    return (_jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h2", { className: "text-3xl font-bold", children: " Quarterly Goals" }), _jsx("button", { onClick: () => setShowForm(!showForm), className: "px-4 py-2 bg-blue-600 text-white rounded-lg \n                     hover:bg-blue-700 transition-colors font-medium", children: showForm ? 'Cancel' : '+ Add Rock' })] }), _jsx("p", { className: "text-gray-500 mb-8", children: "Your top priorities this quarter." }), showForm && (_jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm", children: [_jsx("h3", { className: "font-semibold text-lg mb-4", children: "New Rock" }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Rock Title" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Launch new website", className: "w-full px-4 py-2 border border-gray-300 rounded-lg \n                           focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Owner" }), _jsx("input", { type: "text", value: owner, onChange: (e) => setOwner(e.target.value), placeholder: "e.g. John", className: "w-full px-4 py-2 border border-gray-300 rounded-lg \n                           focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Due Date" }), _jsx("input", { type: "date", value: dueDate, onChange: (e) => setDueDate(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg \n                           focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsx("button", { onClick: addRock, className: "w-full py-2 bg-blue-600 text-white rounded-lg \n                         hover:bg-blue-700 transition-colors font-medium", children: "Save Rock" })] })] })), rocks.length === 0 && !showForm && (_jsxs("div", { className: "text-center py-16 text-gray-400", children: [_jsx("p", { className: "text-5xl mb-4", children: "\uD83E\uDEA8" }), _jsx("p", { className: "text-lg", children: "No rocks yet. Add your first priority!" })] })), _jsx("ul", { className: "flex flex-col gap-4", children: rocks.map(rock => (_jsx("li", { className: "bg-white border border-gray-200 rounded-xl p-5 shadow-sm", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: `font-semibold text-lg ${rock.status === 'complete' ? 'line-through text-gray-400' : 'text-gray-800'}`, children: rock.title }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: ["\uD83D\uDC64 ", rock.owner, rock.dueDate && (_jsxs("span", { className: "ml-4", children: ["\uD83D\uDCC5 ", rock.dueDate] }))] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("select", { value: rock.status, onChange: (e) => updateStatus(rock.id, e.target.value), className: `text-sm px-3 py-1 rounded-full font-medium border-0 
                              cursor-pointer ${statusStyles[rock.status]}`, children: [_jsx("option", { value: "on-track", children: "\uD83D\uDFE2 On Track" }), _jsx("option", { value: "off-track", children: "\uD83D\uDD34 Off Track" }), _jsx("option", { value: "complete", children: "\u2705 Complete" })] }), _jsx("button", { onClick: () => deleteRock(rock.id), className: "text-gray-300 hover:text-red-500 \n                             transition-colors text-xl font-bold", children: "\u00D7" })] })] }) }, rock.id))) }), rocks.length > 0 && (_jsxs("p", { className: "text-sm text-gray-400 mt-6", children: [rocks.filter(r => r.status === 'complete').length, " of ", rocks.length, " rocks complete"] }))] }));
}
//# sourceMappingURL=RocksPage.js.map