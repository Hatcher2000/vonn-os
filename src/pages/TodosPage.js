import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react'; // <--- Add this back in!
import { useLocalStorage } from '../hooks/useLocalStorage';
export default function TodosPage() {
    // useState holds your list of todos in memory
    // starts as an empty array []
    const [todos, setTodos] = useLocalStorage('todos', []);
    // useState for the input field text
    const [inputText, setInputText] = useState('');
    // ADD a new todo
    const addTodo = () => {
        // Don't add if input is empty
        if (!inputText.trim())
            return;
        const newTodo = {
            id: crypto.randomUUID(), // generates a unique ID
            text: inputText,
            completed: false,
            createdAt: new Date(),
        };
        setTodos([...todos, newTodo]); // add to the list
        setInputText(''); // clear the input
    };
    // TOGGLE complete/incomplete
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id
            ? { ...todo, completed: !todo.completed } // flip it
            : todo));
    };
    // DELETE a todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    // Add todo when user presses Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            addTodo();
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h2", { className: "text-3xl font-bold mb-2", children: " Action Items" }), _jsx("p", { className: "text-gray-500 mb-8", children: "Track your weekly action items." }), _jsxs("div", { className: "flex gap-3 mb-8", children: [_jsx("input", { type: "text", value: inputText, onChange: (e) => setInputText(e.target.value), onKeyDown: handleKeyDown, placeholder: "Add a new to-do...", className: "flex-1 px-4 py-2 rounded-lg border border-gray-300 \n                     focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { onClick: addTodo, className: "px-6 py-2 bg-blue-600 text-white rounded-lg \n                     hover:bg-blue-700 transition-colors font-medium", children: "Add" })] }), todos.length === 0 && (_jsxs("div", { className: "text-center py-16 text-gray-400", children: [_jsx("p", { className: "text-5xl mb-4", children: "\uD83D\uDCCB" }), _jsx("p", { className: "text-lg", children: "No to-dos yet. Add one above!" })] })), _jsx("ul", { className: "flex flex-col gap-3", children: todos.map(todo => (_jsxs("li", { className: "flex items-center gap-4 p-4 bg-white \n                       rounded-lg border border-gray-200 shadow-sm", children: [_jsx("input", { type: "checkbox", checked: todo.completed, onChange: () => toggleTodo(todo.id), className: "w-5 h-5 accent-blue-600 cursor-pointer" }), _jsx("span", { className: `flex-1 text-slate-800 ${todo.completed
                                ? 'line-through text-slate-400' // Darker strikethrough color
                                : ''}`, children: todo.text }), _jsx("button", { onClick: () => deleteTodo(todo.id), className: "text-gray-300 hover:text-red-500 \n                         transition-colors text-xl font-bold", children: "\u00D7" })] }, todo.id))) }), todos.length > 0 && (_jsxs("p", { className: "text-sm text-gray-400 mt-6", children: [todos.filter(t => t.completed).length, " of ", todos.length, " completed"] }))] }));
}
//# sourceMappingURL=TodosPage.js.map