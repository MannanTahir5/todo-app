import { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task);
      setTask('');
    } else {
      alert("Task cannot be empty");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        placeholder="Enter your task"
      />
      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black"
      >
        Add
      </button>
    </form>
  );
}
