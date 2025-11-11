# React Performance Optimization Guide

A comprehensive guide to optimizing React applications, based on hands-on experience and real-world examples from the Todo App project.

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [The Optimization Trinity](#the-optimization-trinity)
3. [When to Optimize](#when-to-optimize)
4. [Identifying Performance Issues](#identifying-performance-issues)
5. [React.memo - Component Memoization](#reactmemo---component-memoization)
6. [useMemo - Value Memoization](#usememo---value-memoization)
7. [useCallback - Function Memoization](#usecallback---function-memoization)
8. [Common Pitfalls](#common-pitfalls)
9. [Decision Tree](#decision-tree)
10. [Real-World Examples](#real-world-examples)
11. [Advanced Techniques](#advanced-techniques)

---

## Core Principles

### The Golden Rules

1. **Profile First, Optimize Second**

   - Don't optimize prematurely
   - Measure actual performance before and after
   - Use console logging, React DevTools, or browser Performance tab

2. **React is Fast by Default**

   - Virtual DOM handles most cases efficiently
   - Only optimize when you have a measured problem
   - "Premature optimization is the root of all evil"

3. **Understand Re-render Triggers**

   - State change in component
   - Props change from parent
   - Parent component re-renders (unless memoized)
   - Context value changes

4. **Reference Equality Matters**
   - `{} !== {}` (new object each time)
   - `[] !== []` (new array each time)
   - `() => {} !== () => {}` (new function each time)
   - React uses `Object.is()` for comparison (similar to `===`)

---

## The Optimization Trinity

Three hooks work together to prevent unnecessary work:

```typescript
// 1. React.memo - Skip component re-renders
const MemoizedComponent = memo(MyComponent);

// 2. useMemo - Cache expensive calculations
const value = useMemo(() => expensiveCalculation(), [deps]);

// 3. useCallback - Stabilize function references
const callback = useCallback(() => doSomething(), [deps]);
```

**Mental Model:**

- **React.memo**: "Don't re-render this component if props haven't changed"
- **useMemo**: "Don't recalculate this value if dependencies haven't changed"
- **useCallback**: "Don't recreate this function if dependencies haven't changed"

---

## When to Optimize

### ✅ Optimize When:

1. **Measured Performance Problem**

   - Component renders take >16ms (60fps threshold)
   - Noticeable lag in UI interactions
   - Profiler shows expensive renders

2. **Expensive Calculations**

   - Filtering/sorting large arrays (1000+ items)
   - Complex mathematical operations
   - Heavy string processing

3. **Frequently Re-rendering Components**

   - Parent renders often but child doesn't need to update
   - Component in a list that renders 100+ times

4. **Large Lists**
   - Rendering many similar items
   - Virtualization may be needed for 1000+ items

### ❌ Don't Optimize When:

1. **No Measured Problem**

   - UI feels responsive
   - Renders complete quickly
   - Users aren't complaining

2. **Cheap Operations**

   - Simple arithmetic (addition, comparison)
   - Accessing object properties
   - Rendering small components

3. **Added Complexity Outweighs Benefits**
   - Code becomes harder to read/maintain
   - Optimization hooks add more overhead than they save

**Quote to Remember:**

> "Make it work, make it right, make it fast - in that order."

---

## Identifying Performance Issues

### Method 1: Console Logging (Quick & Dirty)

```typescript
function MyComponent({ prop1, prop2 }) {
  console.log("MyComponent rendered", { prop1, prop2 });

  return <div>...</div>;
}
```

**What to Look For:**

- Component logging on every parent render (unnecessary)
- Component logging when unrelated props change
- Same log multiple times in quick succession

**Real Example from Todo App:**

```typescript
function TodoStats({ todos }) {
  console.log("TodoStats rendered");
  return <div>Total: {todos.length}</div>;
}

// Type in search input → See "TodoStats rendered" on every keystroke
// Problem identified: TodoStats re-renders when it shouldn't!
```

---

### Method 2: Custom "Why Did You Update" Hook

```typescript
function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  const previousProps = useRef(props);

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps: Record<string, any> = {};

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log("[why-did-you-update]", name, changedProps);
      }
    }

    previousProps.current = props;
  });
}

// Usage
function TodoStats(props) {
  useWhyDidYouUpdate("TodoStats", props);
  return <div>...</div>;
}
```

**Output Example:**

```
[why-did-you-update] TodoStats {
  onRefresh: {
    from: function() {},
    to: function() {}  // Different function reference!
  }
}
```

---

### Method 3: React DevTools Profiler

**Coming Soon:** Will be covered after hands-on profiling session.

---

## React.memo - Component Memoization

### What It Does

Wraps a component to skip re-rendering if props haven't changed (shallow comparison).

**Angular Equivalent:** `ChangeDetectionStrategy.OnPush`

---

### Basic Usage

```typescript
// Without memo - re-renders every time parent renders
function TodoItem({ todo, onToggle }: TodoItemProps) {
  return <div onClick={() => onToggle(todo.id)}>{todo.title}</div>;
}

// With memo - only re-renders if props change
const TodoItem = memo(function TodoItem({ todo, onToggle }: TodoItemProps) {
  return <div onClick={() => onToggle(todo.id)}>{todo.title}</div>;
});

// Or export directly
export default memo(TodoItem);
```

---

### How It Works

**Shallow Comparison:**

```typescript
// React checks:
prevProps.todo === nextProps.todo; // Reference equality
prevProps.onToggle === nextProps.onToggle; // Reference equality

// If both true → Skip re-render
// If any false → Re-render
```

**Problem with Objects/Arrays:**

```typescript
// ❌ New object every render - memo useless
<TodoStats config={{ theme: "dark" }} />;

// ✅ Stable reference - memo works
const config = useMemo(() => ({ theme: "dark" }), []);
<TodoStats config={config} />;
```

---

### Custom Comparison Function

For complex props comparison:

```typescript
const TodoItem = memo(
  function TodoItem({ todo, onToggle }) {
    return <div>...</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props changed (re-render)
    return (
      prevProps.todo.id === nextProps.todo.id &&
      prevProps.todo.completed === nextProps.todo.completed &&
      prevProps.todo.title === nextProps.todo.title
    );
  }
);
```

**⚠️ Warning:** Custom comparisons can be expensive. Use sparingly.

---

### Real Example: TodoStats Component

**Problem:**

```typescript
function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <TodoStats todos={todos} onRefresh={() => console.log("refresh")} />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </>
  );
}
```

**Issue:** TodoStats re-renders on every keystroke in search input!

**Solution:**

```typescript
// Step 1: Memoize component
const MemoizedTodoStats = memo(TodoStats);

// Step 2: Stabilize callback (covered in useCallback section)
const handleRefresh = useCallback(() => {
  console.log("refresh");
}, []);

// Step 3: Use memoized component
<MemoizedTodoStats todos={todos} onRefresh={handleRefresh} />;
```

**Result:** TodoStats only re-renders when `todos` actually changes! ✅

---

## useMemo - Value Memoization

### What It Does

Caches the result of an expensive calculation, recomputing only when dependencies change.

---

### Basic Usage

```typescript
const memoizedValue = useMemo(
  () => {
    // Expensive calculation
    return todos.filter((t) => t.completed).length;
  },
  [todos] // Dependencies
);
```

---

### Common Use Cases

#### 1. Expensive Filtering/Sorting

```typescript
function TodoList({ todos, filter }: TodoListProps) {
  // ❌ Filters on every render (even when todos/filter unchanged)
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // ✅ Only filters when todos or filter changes
  const filteredTodos = useMemo(() => {
    console.log("Filtering todos..."); // See when this runs
    return todos.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });
  }, [todos, filter]);

  return <ul>{filteredTodos.map(/* ... */)}</ul>;
}
```

---

#### 2. Complex Calculations

```typescript
function TodoStats({ todos }: { todos: Todo[] }) {
  // ❌ Recalculates on every render
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    completedPercentage:
      (todos.filter((t) => t.completed).length / todos.length) * 100,
    avgTitleLength:
      todos.reduce((sum, t) => sum + t.title.length, 0) / todos.length,
  };

  // ✅ Only recalculates when todos changes
  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      completedPercentage: todos.length
        ? (todos.filter((t) => t.completed).length / todos.length) * 100
        : 0,
      avgTitleLength: todos.length
        ? todos.reduce((sum, t) => sum + t.title.length, 0) / todos.length
        : 0,
    }),
    [todos]
  );

  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>
        Completed: {stats.completed} ({stats.completedPercentage.toFixed(1)}%)
      </p>
      <p>Avg Length: {stats.avgTitleLength.toFixed(1)}</p>
    </div>
  );
}
```

---

#### 3. Stabilizing Object References

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ New object every render - breaks child's memo
  const config = { theme: "dark", count };

  // ✅ Stable reference unless count changes
  const config = useMemo(() => ({ theme: "dark", count }), [count]);

  return <MemoizedChild config={config} />;
}
```

---

### Real Example: useTodoStats Hook

```typescript
function useTodoStats(todos: Todo[]) {
  return useMemo(() => {
    console.log("Calculating stats..."); // Track when calculation runs

    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const completedPercentage = total ? (completed / total) * 100 : 0;
    const avgTitleLength = total
      ? todos.reduce((sum, t) => sum + t.title.length, 0) / total
      : 0;

    return {
      total,
      completed,
      completedPercentage,
      avgTitleLength,
    };
  }, [todos]);
}

// Usage
function TodoStats({ todos }: { todos: Todo[] }) {
  const stats = useTodoStats(todos);

  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
    </div>
  );
}
```

**Benefits:**

- Calculation runs only when `todos` changes
- Reusable across components
- Clean separation of concerns

---

### When NOT to Use useMemo

```typescript
// ❌ Overkill - simple calculations are cheap
const double = useMemo(() => count * 2, [count]);
const isEven = useMemo(() => count % 2 === 0, [count]);
const uppercase = useMemo(() => text.toUpperCase(), [text]);

// ✅ Just calculate directly
const double = count * 2;
const isEven = count % 2 === 0;
const uppercase = text.toUpperCase();
```

**Rule:** If calculation takes less time than reading this sentence, don't memoize it.

---

## useCallback - Function Memoization

### What It Does

Returns a memoized version of a callback function that only changes when dependencies change.

**Key Insight:** `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`

---

### Basic Usage

```typescript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b] // Re-create function only if a or b changes
);
```

---

### Why It's Needed

**The Problem:**

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ New function every render
  const handleClick = () => {
    console.log("clicked");
  };

  // Child re-renders on every parent render, even though
  // the function does the same thing!
  return <MemoizedChild onClick={handleClick} />;
}
```

**JavaScript Reality:**

```javascript
const fn1 = () => console.log("hello");
const fn2 = () => console.log("hello");

console.log(fn1 === fn2); // false - different references!
```

**The Solution:**

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ Stable function reference
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // No dependencies = never recreated

  // Child only re-renders when actually needed
  return <MemoizedChild onClick={handleClick} />;
}
```

---

### Common Use Cases

#### 1. Callbacks Passed to Memoized Children

```typescript
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ❌ New function every render - breaks memo
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // ✅ Stable function - memo works
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []); // Empty deps because uses updater function

  return todos.map((todo) => (
    <MemoizedTodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
  ));
}
```

---

#### 2. Functions Used in useEffect Dependencies

```typescript
function SearchComponent() {
  const [query, setQuery] = useState("");

  // ❌ Without useCallback - effect runs on every render
  const fetchResults = (q: string) => {
    fetch(`/api/search?q=${q}`).then(/* ... */);
  };

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]); // fetchResults changes every render!

  // ✅ With useCallback - effect only runs when query changes
  const fetchResults = useCallback((q: string) => {
    fetch(`/api/search?q=${q}`).then(/* ... */);
  }, []); // Stable function

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults]); // Only re-runs when query changes
}
```

---

#### 3. Event Handlers in Lists

```typescript
function TodoList({ todos }: { todos: Todo[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ✅ Stable callback for all items
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onSelect={handleSelect} // Same function for all items
      isSelected={todo.id === selectedId}
    />
  ));
}
```

---

### Real Example: Todo App Callbacks

```typescript
function TodoApp() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [searchText, setSearchText] = useState("");

  // ✅ All callbacks are stable
  const handleRefreshStats = useCallback(() => {
    console.log("Stats refreshed manually");
  }, []);

  // Already stable from useTodos hook, but showing pattern
  const handleToggle = useCallback(
    (id: string) => {
      toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  return (
    <>
      <MemoizedTodoStats todos={todos} onRefresh={handleRefreshStats} />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {todos.map((todo) => (
        <MemoizedTodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
```

**Result:**

- Typing in search: No todo items re-render ✅
- Toggling one todo: Only that item re-renders ✅
- Stats only update when todos change ✅

---

### Empty Dependency Array Pattern

**When to Use `[]`:**

Functions that use state updater pattern:

```typescript
// ✅ No dependencies needed - uses updater function
const addTodo = useCallback((title: string) => {
  setTodos((prev) => [...prev, { id: Date.now(), title, completed: false }]);
}, []);

// ❌ Would need todos in dependencies
const addTodo = useCallback(
  (title: string) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  },
  [todos]
); // Recreates function when todos change
```

**Pro Tip:** Prefer updater functions (`prev => ...`) to keep callbacks stable.

---

## Common Pitfalls

### Pitfall 1: Forgetting Dependencies

```typescript
// ❌ Missing userId in dependencies
const fetchUser = useCallback(() => {
  fetch(`/api/users/${userId}`).then(/* ... */);
}, []); // ESLint warning!

// ✅ Include all used values
const fetchUser = useCallback(() => {
  fetch(`/api/users/${userId}`).then(/* ... */);
}, [userId]);
```

**Fix:** Use ESLint plugin `eslint-plugin-react-hooks` to catch this automatically.

---

### Pitfall 2: Inline Objects/Arrays Break Memoization

```typescript
// ❌ New object every render - breaks memo
<MemoizedChild config={{ theme: 'dark' }} />

// ❌ New array every render - breaks memo
<MemoizedChild items={[1, 2, 3]} />

// ✅ Memoize or define outside
const config = useMemo(() => ({ theme: 'dark' }), []);
const items = useMemo(() => [1, 2, 3], []);

// ✅ Or define outside component if static
const STATIC_CONFIG = { theme: 'dark' };
const STATIC_ITEMS = [1, 2, 3];

<MemoizedChild config={STATIC_CONFIG} items={STATIC_ITEMS} />
```

---

### Pitfall 3: Over-Memoization

```typescript
// ❌ Overkill - more overhead than benefit
function SimpleComponent() {
  const value1 = useMemo(() => 1 + 1, []);
  const value2 = useMemo(() => "hello", []);
  const handleClick = useCallback(() => {}, []);

  return (
    <div onClick={handleClick}>
      {value1} {value2}
    </div>
  );
}

// ✅ Keep it simple
function SimpleComponent() {
  const value1 = 1 + 1;
  const value2 = "hello";
  const handleClick = () => {};

  return (
    <div onClick={handleClick}>
      {value1} {value2}
    </div>
  );
}
```

---

### Pitfall 4: Memoizing Component Without Stable Props

```typescript
// ❌ Memo is useless if props keep changing
const MemoizedChild = memo(Child);

function Parent() {
  return (
    <MemoizedChild
      onSomething={() => {}} // New function!
      config={{ theme: "dark" }} // New object!
    />
  );
}

// ✅ Stabilize all props
function Parent() {
  const handleSomething = useCallback(() => {}, []);
  const config = useMemo(() => ({ theme: "dark" }), []);

  return <MemoizedChild onSomething={handleSomething} config={config} />;
}
```

---

## Decision Tree

Use this flowchart to decide which optimization to apply:

```
Is there a measured performance problem?
│
├─ NO → Don't optimize. Keep code simple.
│
└─ YES → What's the issue?
    │
    ├─ Component re-renders unnecessarily
    │   │
    │   ├─ Wrap with React.memo
    │   │
    │   └─ Still re-rendering?
    │       │
    │       └─ Check props: Are they stable?
    │           │
    │           ├─ Objects/Arrays → useMemo
    │           └─ Functions → useCallback
    │
    ├─ Expensive calculation on every render
    │   │
    │   └─ Wrap calculation in useMemo
    │
    └─ Callback prop breaking child's memo
        │
        └─ Wrap callback in useCallback
```

---

## Real-World Examples

### Example 1: TodoStats Component (Complete Solution)

**Initial Code (Unoptimized):**

```typescript
// TodoStats.tsx
function TodoStats({ todos, onRefresh }: TodoStatsProps) {
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    completedPercentage: todos.length
      ? (todos.filter((t) => t.completed).length / todos.length) * 100
      : 0,
    avgTitleLength: todos.length
      ? todos.reduce((sum, t) => sum + t.title.length, 0) / todos.length
      : 0,
  };

  console.log("TodoStats rendered");

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total: {stats.total}</p>
      <p>
        Completed: {stats.completed} ({stats.completedPercentage.toFixed(1)}%)
      </p>
      <p>Avg Length: {stats.avgTitleLength.toFixed(1)}</p>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
}

// App.tsx
function App() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleRefreshStats = () => {
    console.log("refresh");
  };

  return (
    <>
      <TodoStats todos={todos} onRefresh={handleRefreshStats} />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </>
  );
}
```

**Problem:** TodoStats re-renders on every keystroke in search input!

---

**Optimized Code:**

```typescript
// useTodoStats.ts - Extract logic into custom hook
function useTodoStats(todos: Todo[]) {
  return useMemo(() => {
    console.log("Calculating stats...");

    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const completedPercentage = total ? (completed / total) * 100 : 0;
    const avgTitleLength = total
      ? todos.reduce((sum, t) => sum + t.title.length, 0) / total
      : 0;

    return { total, completed, completedPercentage, avgTitleLength };
  }, [todos]);
}

// TodoStats.tsx - Clean component using hook
function TodoStats({ todos, onRefresh }: TodoStatsProps) {
  const stats = useTodoStats(todos);

  console.log("TodoStats rendered");

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total: {stats.total}</p>
      <p>
        Completed: {stats.completed} ({stats.completedPercentage.toFixed(1)}%)
      </p>
      <p>Avg Length: {stats.avgTitleLength.toFixed(1)}</p>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
}

// Memoize component
export default memo(TodoStats);

// App.tsx - Stabilize callback
function App() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleRefreshStats = useCallback(() => {
    console.log("refresh");
  }, []);

  return (
    <>
      <TodoStats todos={todos} onRefresh={handleRefreshStats} />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </>
  );
}
```

**Results:**

- Before: "TodoStats rendered" on every keystroke (10+ logs per second)
- After: "TodoStats rendered" only when todos array changes
- Stats calculation only runs when todos changes
- Clean, reusable code with separated concerns

---

### Example 2: Optimized Todo List with 1000+ Items

```typescript
// TodoItem.tsx - Memoized item component
const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  console.log(`Rendering TodoItem: ${todo.id}`);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

// TodoList.tsx - Optimized list
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Stable callbacks using updater functions
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // No dependencies!

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []); // No dependencies!

  // Expensive filtering - memoized
  const filteredTodos = useMemo(() => {
    console.log("Filtering todos...");
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
```

**Performance Characteristics:**

- Changing filter: Only runs filter logic, no item re-renders
- Toggling one todo: Only that specific item re-renders
- Adding/removing todo: Only affected items re-render
- Handles 1000+ items smoothly

---

### Example 3: AddTodoDialog with Native API

```typescript
// AddTodoDialog.tsx - Optimized dialog
function AddTodoDialog({ isOpen, onClose, onAdd }: AddTodoDialogProps) {
  const [title, setTitle] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  console.log("AddTodoDialog rendered");

  // Native dialog API
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Native backdrop click handling
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        setTitle("");
        onClose();
      }
    };

    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      dialogRef.current?.close();
    }
  };

  return (
    <dialog ref={dialogRef} className="add-todo-dialog">
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          autoFocus
        />
        <button type="submit">Add</button>
      </form>
    </dialog>
  );
}

// Memoize the dialog
export default memo(AddTodoDialog);

// Usage in App
function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addTodo } = useTodos();

  // Stable callbacks
  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);
  const handleAddTodo = useCallback(
    (title: string) => {
      addTodo(title);
    },
    [addTodo]
  );

  return (
    <>
      <button onClick={openDialog}>Add Todo</button>
      <AddTodoDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onAdd={handleAddTodo}
      />
    </>
  );
}
```

**Results:**

- Typing in dialog: Dialog re-renders (expected - local state)
- Typing elsewhere: Dialog doesn't re-render ✅
- Opening/closing: Only dialog re-renders, not entire app ✅

---

## Advanced Techniques

### 1. Code Splitting with React.lazy()

Split large components into separate bundles loaded on demand:

```typescript
import { lazy, Suspense } from "react";

// Instead of regular import:
// import TodoList from './TodoList';

// Use lazy loading:
const TodoList = lazy(() => import("./TodoList"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoList />
    </Suspense>
  );
}
```

**When to Use:**

- Large components not immediately needed
- Route-based code splitting
- Modal dialogs (loaded when opened)
- Heavy chart libraries

---

### 2. Virtual Lists with react-window

For lists with 1000+ items, only render visible items:

```typescript
import { FixedSizeList } from "react-window";

function VirtualTodoList({ todos }: { todos: Todo[] }) {
  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      <TodoItem todo={todos[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600} // Viewport height
      itemCount={todos.length}
      itemSize={50} // Height of each item
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Performance:**

- Before: 10,000 items = 10,000 DOM nodes
- After: Only ~20 DOM nodes (visible items + buffer)

---

### 3. Debouncing with Custom Hook

Delay expensive operations until user stops typing:

```typescript
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call only after user stops typing for 500ms
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }
  }, [debouncedSearchTerm]);

  return (
    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  );
}
```

---

### 4. useTransition (React 18)

Mark updates as non-urgent, keeping UI responsive:

```typescript
import { useTransition } from "react";

function FilteredList({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Update input immediately (urgent)
    setFilter(value);

    // Filter list in background (non-urgent)
    startTransition(() => {
      setFilteredItems(items.filter((item) => item.name.includes(value)));
    });
  };

  return (
    <>
      <input value={filter} onChange={handleChange} />
      {isPending && <span>Filtering...</span>}
      <ul>{filteredItems.map(/* ... */)}</ul>
    </>
  );
}
```

**Benefit:** Input remains responsive even during expensive filtering.

---

### 5. useDeferredValue (React 18)

Defer updating a value to keep UI responsive:

```typescript
import { useDeferredValue } from "react";

function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  // This list filters based on deferred value
  // So typing stays smooth even with slow filtering
  const filteredResults = useMemo(
    () => expensiveFilter(results, deferredQuery),
    [results, deferredQuery]
  );

  return <ul>{filteredResults.map(/* ... */)}</ul>;
}
```

---

## Summary

### Quick Reference

| Problem                            | Solution                             | When to Use                                 |
| ---------------------------------- | ------------------------------------ | ------------------------------------------- |
| Component re-renders unnecessarily | `React.memo`                         | Parent renders often, child doesn't need to |
| Expensive calculation              | `useMemo`                            | Filtering large arrays, complex math        |
| Function prop breaks memo          | `useCallback`                        | Passing callbacks to memoized children      |
| Large lists                        | Virtual scrolling                    | 1000+ items                                 |
| Slow initial load                  | Code splitting                       | Large components not immediately needed     |
| Search input lag                   | Debouncing                           | API calls on keystroke                      |
| UI feels sluggish                  | `useTransition` / `useDeferredValue` | Non-urgent updates                          |

---

### The Optimization Checklist

Before optimizing:

- [ ] Have you measured the actual performance problem?
- [ ] Have you identified which component is slow?
- [ ] Have you verified re-renders with console.log?

When optimizing:

- [ ] Applied React.memo to slow components?
- [ ] Stabilized all props (objects, arrays, functions)?
- [ ] Used useMemo for expensive calculations?
- [ ] Used useCallback for callbacks to memoized children?
- [ ] Checked that dependencies are correct?

After optimizing:

- [ ] Verified improvement with console.log?
- [ ] Tested that functionality still works?
- [ ] Documented why optimization was needed?

---

### Final Thoughts

**Remember:**

1. React is fast by default
2. Measure before optimizing
3. Understand reference equality
4. Use the trinity: memo, useMemo, useCallback
5. Don't optimize prematurely
6. Keep code readable

**Quote to Live By:**

> "Premature optimization is the root of all evil, but measured optimization is the path to greatness."

---

**End of Performance Optimization Guide**

This guide is a living document based on real experience optimizing the Todo App. As new patterns emerge and React evolves, this will be updated.

Happy optimizing! 🚀
