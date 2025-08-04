import { useState, useEffect } from 'react';

export default function EditModal({ isOpen, onClose, onSave, todo }) {
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    if (todo) setEditedTask(todo.task);
  }, [todo]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedTask)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
