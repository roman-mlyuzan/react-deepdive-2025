import type { Todo } from "../types/todo";

type Props = {
  todos: Todo[];
  toggleTodo: (id: number, currentStatus: boolean) => void;
};

export default function TodoList({ todos, toggleTodo }: Props) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          onClick={() => toggleTodo(todo.id, todo.completed)}
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <span className="todo-checkbox">{todo.completed ? "✅" : "⭕"}</span>
          <span className="todo-title">{todo.title}</span>
        </li>
      ))}
    </ul>
  );
}
