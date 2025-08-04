import { useState } from 'react';
import useTodos from './hooks/todo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';

export default function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodos();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleEditClick = (todo) => {
    setCurrentTodo(todo);
    setModalOpen(true);
  };

  const handleModalSave = (newTask) => {
    updateTodo(currentTodo.id, newTask);
    setModalOpen(false);
    setCurrentTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">📝 ToDo App</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={handleEditClick}
        />
      </div>

      <EditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        todo={currentTodo}
      />
    </div>
  );
}