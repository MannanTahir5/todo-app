import TodoItem from './TodoItem';

export default function TodoList({ todos, onDelete, onToggle, onEdit }) {
  return (
    <ul className="mt-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
