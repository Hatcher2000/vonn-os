import { useState } from 'react' // <--- Add this back in!
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodosPage() {
  // useState holds your list of todos in memory
  // starts as an empty array []
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])

  // useState for the input field text
  const [inputText, setInputText] = useState('')

  // ADD a new todo
  const addTodo = () => {
    // Don't add if input is empty
    if (!inputText.trim()) return

    const newTodo: Todo = {
      id: crypto.randomUUID(),  // generates a unique ID
      text: inputText,
      completed: false,
      createdAt: new Date(),
    }

    setTodos([...todos, newTodo])  // add to the list
    setInputText('')               // clear the input
  }

  // TOGGLE complete/incomplete
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }  // flip it
        : todo
    ))
  }

  // DELETE a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Add todo when user presses Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Page Header */}
      <h2 className="text-3xl font-bold mb-2"> Action Items</h2>
      <p className="text-gray-500 mb-8">Track your weekly action items.</p>

      {/* Input Row */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new to-do..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors font-medium"
        >
          Add
        </button>
      </div>

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-lg">No to-dos yet. Add one above!</p>
        </div>
      )}

      {/* Todo List */}
      <ul className="flex flex-col gap-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-4 p-4 bg-white 
                       rounded-lg border border-gray-200 shadow-sm"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />

            {/* Todo Text */}
            <span className={`flex-1 text-slate-800 ${
              todo.completed
                ? 'line-through text-slate-400' // Darker strikethrough color
                : ''
            }`}>
              {todo.text}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-300 hover:text-red-500 
                         transition-colors text-xl font-bold"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Footer count — only shows when there are todos */}
      {todos.length > 0 && (
        <p className="text-sm text-gray-400 mt-6">
          {todos.filter(t => t.completed).length} of {todos.length} completed
        </p>
      )}

    </div>
  )
}