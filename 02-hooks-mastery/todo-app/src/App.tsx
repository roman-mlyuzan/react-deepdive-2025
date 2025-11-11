import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import AddTodoDialog from "./components/AddTodoDialog";
import { ThemeToggle } from "./components/ThemeToggle";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import { useTodos } from "./hooks/useTodos";

function App() {
  const {
    todos,
    loading,
    error,
    toggleTodo,
    removeCompleted,
    setTodos,
    addTodo,
  } = useTodos();

  const [searchText, setSearchText] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return showCompleted ? matchesSearch && todo.completed : matchesSearch;
    });
  }, [todos, searchText, showCompleted]);

  const filterCompleted = () => {
    setShowCompleted((status) => !status);
  };

  const handleRefreshStats = useCallback(() => {
    console.log("Stats refreshed manually");
    // Maybe fetch fresh data from server?
  }, []);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleAddTodo = useCallback((title: string) => {
    addTodo(title);
  }, []);

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
      <TodoStats todos={todos} onRefresh={handleRefreshStats} />
      <h1>My Todos</h1>
      <button onClick={openDialog} className="btn-add-todo">
        ➕ Add New Todo
      </button>
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
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
      <AddTodoDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onAdd={handleAddTodo}
      />
    </div>
  );
}

export default App;
