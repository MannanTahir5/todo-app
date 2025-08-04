export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <li className="flex justify-between items-center px-4 py-2 bg-white shadow rounded-md mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5"
        />
        <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800"}>
          {todo.task}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(todo)} className="text-gray-500 hover:text-gray-700">
          ✏️
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700">
          ❌
        </button>
      </div>
    </li>
  );
}
