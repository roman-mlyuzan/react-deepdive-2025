import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todoItems", []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleTodo = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !currentStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update todo");

      const updatedTodo: Todo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update todo");
    }
  };

  const removeCompleted = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);
      const results = await Promise.allSettled(
        completedTodos.map((todo) =>
          fetch("https://jsonplaceholder.typicode.com/todos/" + todo.id, {
            method: "DELETE",
          })
        )
      );

      // Find which todos were successfully deleted
      const successfullyDeleted = completedTodos.filter((_todo, index) => {
        const result = results[index];
        return result.status === "fulfilled" && result.value.ok;
      });

      // Remove only successfully deleted todos
      if (successfullyDeleted.length > 0) {
        const deletedIds = new Set(successfullyDeleted.map((t) => t.id));
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => !deletedIds.has(todo.id))
        );
      }

      // Alert if some failed
      if (successfullyDeleted.length < completedTodos.length) {
        alert(`Removed ${successfullyDeleted.length} of 
           ${completedTodos.length} todos`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to remove completed todos");
    }
  };

  const addTodo = useCallback(async (title: string) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, completed: false }),
        }
      );

      if (!response.ok) throw new Error("Failed to add todo");

      const newTodo: Todo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add todo");
    }
  }, []);

  return {
    todos,
    setTodos,
    loading,
    error,
    toggleTodo,
    removeCompleted,
    addTodo,
  };
}
