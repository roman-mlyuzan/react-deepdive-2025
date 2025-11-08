import { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  const filteredTodos = todos.filter(todo => {
    if (showCompleted) {
      return todo.completed;
    }
    return todo.title.toLowerCase().includes(searchText.toLowerCase())
  });

  const toggleTodo = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !currentStatus })
      })

      if (!response.ok) throw new Error('Failed to update todo')

      const updatedTodo: Todo = await response.json()
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      )
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update todo');
    }
  };

  const filterCompleted = () => {
    setShowCompleted(status => !status);
  }

  const removeCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo =>
        todo.completed);
      const results = await Promise.allSettled(
        completedTodos.map(todo =>

          fetch('https://jsonplaceholder.typicode.com/todos/' +
            todo.id, {
            method: 'DELETE'
          })
        )
      );

      // Find which todos were successfully deleted
      const successfullyDeleted =
        completedTodos.filter((todo, index) => {
          const result = results[index];
          return result.status === 'fulfilled' &&
            result.value.ok;
        });

      // Remove only successfully deleted todos
      if (successfullyDeleted.length > 0) {
        const deletedIds = new
          Set(successfullyDeleted.map(t => t.id));
        setTodos(prevTodos => prevTodos.filter(todo =>
          !deletedIds.has(todo.id)));
      }

      // Alert if some failed
      if (successfullyDeleted.length <
        completedTodos.length) {
        alert(`Removed ${successfullyDeleted.length} of 
  ${completedTodos.length} todos`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to remove completed todos');
    }
  };

  // Initialized only once
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(data => {
        setTodos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, []);

  // Runs on every render
  useEffect(() => {
    console.log('every render');
  });

  // Runs when searchText changes
  useEffect(() => {
    console.log('Search text changed:', searchText);
  }, [searchText]);

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="app-container">
      <h1>My Todos</h1>
      <div className="action-bar">
        <button onClick={() => setTodos([])} className="action-button">Clear All Todos</button>
        <button onClick={() => filterCompleted} className="action-button">Show Completed</button>
        <button onClick={() => removeCompleted} className="action-button"> Remove Completed</button>
      </div>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search todos..."
        className="search-input"
      />
      <div className="stats">
        <span>Total Todos: {todos.length}</span>
        <span>Completed: {todos.filter(todo => todo.completed).length}</span>
      </div>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li onClick={() => toggleTodo(todo.id, todo.completed)} key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span className="todo-checkbox">{todo.completed ? '✅' : '⭕'}</span>
            <span className="todo-title">{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
