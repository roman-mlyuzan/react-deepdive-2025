import { useEffect, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import "./App.css";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const { todos, loading, error, toggleTodo, removeCompleted, setTodos } =
    useTodos();

  const [searchText, setSearchText] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return showCompleted ? matchesSearch && todo.completed : matchesSearch;
  });

  const filterCompleted = () => {
    setShowCompleted((status) => !status);
  };

  // Runs on every render
  useEffect(() => {
    console.log("every render");
  });

  // Runs when searchText changes
  useEffect(() => {
    console.log("Search text changed:", searchText);
  }, [searchText]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <ThemeToggle />
      <h1>My Todos</h1>
      <div className="action-bar">
        <button onClick={() => setTodos([])} className="action-button">
          Clear All Todos
        </button>
        <button onClick={filterCompleted} className="action-button">
          Show Completed
        </button>
        <button onClick={removeCompleted} className="action-button">
          {" "}
          Remove Completed
        </button>
      </div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search todos..."
        className="search-input"
      />
      <div className="stats">
        <span>Total Todos: {todos.length}</span>
        <span>Completed: {todos.filter((todo) => todo.completed).length}</span>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            onClick={() => toggleTodo(todo.id, todo.completed)}
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span className="todo-checkbox">
              {todo.completed ? "✅" : "⭕"}
            </span>
            <span className="todo-title">{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
