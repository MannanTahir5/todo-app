import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null); // <-- track which task is being edited

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if(!todos.length) return; // Avoid saving empty todos
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addOrUpdateTask = () => {

    if (editingId) {
      // Update existing task
      const updatedTodos = todos.map(todo =>
        todo.id === editingId ? { ...todo, text: task } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false
      };
      setTodos([...todos, newTask]);
    }

    setTask('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setTask(todoToEdit.text);
    setEditingId(id); // <-- set editing mode
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex justify-center pt-20">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 ToDo App</h1>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded px-3 py-2"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className={`px-4 py-2 rounded text-sky-700 ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-sky-500 hover:bg-sky-600'}`}
            onClick={addOrUpdateTask}
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center gap-2 p-2 rounded border ${todo.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-gray-50'}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="h-4 w-4 cursor-pointer accent-green-500"
              />

              <span
                className="flex-grow cursor-pointer"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>

              <button
                onClick={() => editTodo(todo.id)}
                className="text-sky-500 hover:text-sky-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
