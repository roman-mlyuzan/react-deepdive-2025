# Common Pitfalls - React Learning Journey

Mistakes I encountered, why they happened, and how to avoid them. Documented for future reference and to help other developers.

---

## Table of Contents

1. [State Management Pitfalls](#state-management-pitfalls)
2. [useEffect Pitfalls](#useeffect-pitfalls)
3. [Performance Pitfalls](#performance-pitfalls)
4. [Event Handling Pitfalls](#event-handling-pitfalls)
5. [Props & Re-rendering Pitfalls](#props--re-rendering-pitfalls)
6. [TypeScript Pitfalls](#typescript-pitfalls)
7. [Async Pitfalls](#async-pitfalls)

---

## State Management Pitfalls

### ❌ Pitfall 1: Mutating State Directly

**The Mistake:**

```typescript
// Coming from Angular, this felt natural
const [todos, setTodos] = useState<Todo[]>([]);

const addTodo = (todo: Todo) => {
  todos.push(todo); // ❌ Direct mutation - React won't detect change!
  setTodos(todos); // ❌ Same reference, no re-render
};
```

**Why It Fails:**
React uses reference equality (`===`) to detect changes. Mutating an array keeps the same reference, so React thinks nothing changed.

**The Fix:**

```typescript
const addTodo = (todo: Todo) => {
  setTodos([...todos, todo]); // ✅ New array reference
  // or
  setTodos((prev) => [...prev, todo]); // ✅ Safer with updater function
};
```

**Angular Context:**
In Angular, you can do `this.todos.push(todo)` and change detection picks it up. React requires immutability.

---

### ❌ Pitfall 2: Using State Immediately After Setting It

**The Mistake:**

```typescript
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ❌ Still logs 0, not 1!
};
```

**Why It Fails:**
State updates are asynchronous. The new value isn't available until the next render.

**The Fix:**

```typescript
// Option 1: Use the updated value in the next render
const handleClick = () => {
  setCount(count + 1);
};

useEffect(() => {
  console.log(count); // ✅ Logs updated value
}, [count]);

// Option 2: Calculate what you need
const handleClick = () => {
  const newCount = count + 1;
  setCount(newCount);
  console.log(newCount); // ✅ Use calculated value
};
```

---

### ❌ Pitfall 3: State Update Based on Previous State

**The Mistake:**

```typescript
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
  setCount(count + 1); // ❌ Still only increments by 1!
};
```

**Why It Fails:**
Both calls use the same `count` value from the current render. The second call doesn't see the first update.

**The Fix:**

```typescript
const increment = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1); // ✅ Now increments by 2
};
```

**Rule:** Use updater function when new state depends on old state.

---

## useEffect Pitfalls

### ❌ Pitfall 4: Missing Dependencies

**The Mistake:**

```typescript
const [userId, setUserId] = useState(1);

useEffect(() => {
  fetchUser(userId); // Uses userId
}, []); // ❌ Missing userId in dependencies!
```

**Why It Fails:**
Effect runs once on mount, then never again. When `userId` changes, the stale value is still used.

**The Fix:**

```typescript
useEffect(() => {
  fetchUser(userId);
}, [userId]); // ✅ Re-run when userId changes
```

**Pro Tip:** Install ESLint plugin `eslint-plugin-react-hooks` - it catches this automatically!

---

### ❌ Pitfall 5: Infinite Loop with useEffect

**The Mistake:**

```typescript
const [data, setData] = useState([]);

useEffect(() => {
  fetchData().then((result) => setData(result));
}, [data]); // ❌ Infinite loop!
```

**Why It Fails:**

1. Effect runs, fetches data, sets state
2. State change triggers re-render
3. Re-render sees `data` changed, runs effect again
4. Goto step 2 → infinite loop

**The Fix:**

```typescript
// Option 1: Fetch once on mount
useEffect(() => {
  fetchData().then((result) => setData(result));
}, []); // ✅ Empty array = run once

// Option 2: Depend on something that doesn't change every render
useEffect(() => {
  fetchData(userId).then((result) => setData(result));
}, [userId]); // ✅ Only re-fetch when userId changes
```

---

### ❌ Pitfall 6: Forgetting Cleanup Functions

**The Mistake:**

```typescript
useEffect(() => {
  const listener = () => console.log("Storage changed");
  window.addEventListener("storage", listener);
  // ❌ No cleanup - memory leak!
}, []);
```

**Why It Fails:**
When component unmounts, the event listener stays attached. With multiple mount/unmount cycles, you accumulate listeners.

**The Fix:**

```typescript
useEffect(() => {
  const listener = () => console.log("Storage changed");
  window.addEventListener("storage", listener);

  return () => {
    window.removeEventListener("storage", listener); // ✅ Cleanup
  };
}, []);
```

**Rule:** If you set up something (listener, subscription, timer), clean it up in the return function.

---

### ❌ Pitfall 7: useEffect for Every Render

**The Mistake:**

```typescript
useEffect(() => {
  console.log("Component rendered");
}); // ❌ No dependency array - runs on EVERY render!
```

**Why It's a Problem:**
This defeats optimization efforts. Every re-render (even unrelated state changes) triggers the effect.

**When It's Actually Needed:**
Almost never in production code. Useful only for debugging.

**Better Approach:**

```typescript
// Be specific about when to run
useEffect(() => {
  console.log("Search term changed:", searchTerm);
}, [searchTerm]); // ✅ Only log when searchTerm changes
```

---

## Performance Pitfalls

### ❌ Pitfall 8: Not Memoizing Callbacks Passed to Memoized Children

**The Mistake:**

```typescript
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => console.log("clicked"); // ❌ New function every render

  return <MemoizedChild onClick={handleClick} />; // Child re-renders anyway!
};

const MemoizedChild = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click</button>;
});
```

**Why It Fails:**
`React.memo` checks if props changed. `handleClick` is a new function reference every render, so `onClick` prop "changed" → child re-renders.

**The Fix:**

```typescript
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // ✅ Stable function reference

  return <MemoizedChild onClick={handleClick} />;
};
```

**Real Example from Todo App:**
This exact issue broke TodoStats optimization until we wrapped `handleRefreshStats` in `useCallback`.

---

### ❌ Pitfall 9: Memoizing Everything (Premature Optimization)

**The Mistake:**

```typescript
const SimpleComponent = () => {
  const value1 = useMemo(() => 1 + 1, []); // ❌ Overkill
  const value2 = useMemo(() => "hello", []); // ❌ Overkill
  const handleClick = useCallback(() => {}, []); // ❌ Maybe overkill

  return (
    <div onClick={handleClick}>
      {value1} {value2}
    </div>
  );
};
```

**Why It's a Problem:**
`useMemo` and `useCallback` have overhead. For cheap operations, they make things slower, not faster.

**The Fix:**

```typescript
const SimpleComponent = () => {
  const value1 = 1 + 1; // ✅ Just compute it
  const value2 = "hello"; // ✅ Primitive values are cheap
  const handleClick = () => {}; // ✅ Only memoize if passed to memoized child

  return (
    <div onClick={handleClick}>
      {value1} {value2}
    </div>
  );
};
```

**Rule:** Profile first, optimize second. Only memoize when:

1. Calculation is expensive (filtering large arrays, complex math)
2. Prop is passed to a memoized component
3. You've measured a performance problem

---

### ❌ Pitfall 10: Forgetting to Memoize Objects/Arrays in useMemo

**The Mistake:**

```typescript
const stats = useMemo(() => {
  return {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
  };
}, [todos]);

// Later...
const someValue = useMemo(() => {
  return calculateSomething(stats); // stats is new object every time!
}, [stats]); // ❌ Always re-runs because stats reference changes
```

**Why It Fails:**
`useMemo` returns a new object reference even if the values inside are the same.

**The Fix:**

```typescript
// Option 1: Return stable primitive values
const total = useMemo(() => todos.length, [todos]);
const completed = useMemo(
  () => todos.filter((t) => t.completed).length,
  [todos]
);

// Option 2: Deep comparison (expensive, use sparingly)
const stats = useMemo(
  () => ({
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
  }),
  [todos]
);

// Use a library for deep equality or compare individual values
const someValue = useMemo(() => {
  return calculateSomething(stats);
}, [stats.total, stats.completed]); // ✅ Compare values, not object
```

---

## Event Handling Pitfalls

### ❌ Pitfall 11: Forgetting to Prevent Default in Forms

**The Mistake:**

```typescript
const handleSubmit = () => {
  addTodo(title);
  // ❌ Form submits, page reloads!
};

return <form onSubmit={handleSubmit}>...</form>;
```

**Why It Fails:**
HTML forms submit by default, causing page reload.

**The Fix:**

```typescript
const handleSubmit = (e: FormEvent) => {
  e.preventDefault(); // ✅ Stop default form behavior
  addTodo(title);
};
```

---

### ❌ Pitfall 12: Calling Functions Immediately in onClick

**The Mistake:**

```typescript
<button onClick={handleClick()}>Click</button> // ❌ Calls immediately!
```

**Why It Fails:**
This calls `handleClick()` during render and passes its return value to `onClick`. You want to pass the function itself.

**The Fix:**

```typescript
// Option 1: Pass function reference
<button onClick={handleClick}>Click</button> // ✅

// Option 2: Arrow function if you need arguments
<button onClick={() => handleClick(id)}>Click</button> // ✅

// Option 3: Bind (less common in modern React)
<button onClick={handleClick.bind(null, id)}>Click</button>
```

---

## Props & Re-rendering Pitfalls

### ❌ Pitfall 13: Inline Object/Array Props Break Memoization

**The Mistake:**

```typescript
const Parent = () => {
  return (
    <MemoizedChild
      config={{ theme: "dark" }} // ❌ New object every render
      items={[1, 2, 3]} // ❌ New array every render
    />
  );
};
```

**Why It Fails:**
Each render creates new objects/arrays. `React.memo` sees different references → child re-renders.

**The Fix:**

```typescript
const Parent = () => {
  const config = useMemo(() => ({ theme: "dark" }), []); // ✅
  const items = useMemo(() => [1, 2, 3], []); // ✅

  // Or define outside component if static
  return <MemoizedChild config={config} items={items} />;
};

// Even better - define outside if truly static
const STATIC_CONFIG = { theme: "dark" };
const STATIC_ITEMS = [1, 2, 3];

const Parent = () => {
  return <MemoizedChild config={STATIC_CONFIG} items={STATIC_ITEMS} />; // ✅
};
```

---

### ❌ Pitfall 14: Passing Entire Parent State When Child Needs Subset

**The Mistake:**

```typescript
const Parent = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  // Child only needs todos, but gets everything
  return <TodoList state={{ todos, filter, theme }} />; // ❌
};
```

**Why It's a Problem:**
Child re-renders when ANY part of state changes (even unrelated `theme`).

**The Fix:**

```typescript
const Parent = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  return <TodoList todos={todos} />; // ✅ Only pass what's needed
};
```

---

## TypeScript Pitfalls

### ❌ Pitfall 15: Not Typing useState with Complex Types

**The Mistake:**

```typescript
const [user, setUser] = useState(null); // ❌ Type is 'null', can't assign User later
```

**Why It Fails:**
TypeScript infers the type as `null`. When you try to set a user object later, type error!

**The Fix:**

```typescript
const [user, setUser] = useState<User | null>(null); // ✅ Union type

// Or with initial value
const [user, setUser] = useState<User>({
  id: "",
  name: "",
  email: "",
});
```

---

### ❌ Pitfall 16: Any Type in Event Handlers

**The Mistake:**

```typescript
const handleChange = (e: any) => {
  // ❌ Loses type safety
  setTitle(e.target.value);
};
```

**The Fix:**

```typescript
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  // ✅
  setTitle(e.target.value);
};

// Or for forms
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  // ✅
  e.preventDefault();
};
```

---

## Async Pitfalls

### ❌ Pitfall 17: Not Handling Errors in Async Operations

**The Mistake:**

```typescript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data); // ❌ What if fetch fails?
  };

  fetchData();
}, []);
```

**The Fix:**

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/todos");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false); // ✅ Always runs
    }
  };

  fetchData();
}, []);
```

---

### ❌ Pitfall 18: Setting State After Component Unmounts

**The Mistake:**

```typescript
useEffect(() => {
  fetchData().then((data) => {
    setData(data); // ❌ Component might be unmounted!
  });
}, []);
```

**Why It Fails:**
If component unmounts before fetch completes, you'll try to update state on unmounted component → warning.

**The Fix:**

```typescript
useEffect(() => {
  let isMounted = true; // ✅ Track mount status

  fetchData().then((data) => {
    if (isMounted) {
      setData(data); // ✅ Only update if still mounted
    }
  });

  return () => {
    isMounted = false; // ✅ Cleanup
  };
}, []);

// Modern approach: AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/todos", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setTodos(data))
    .catch((err) => {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    });

  return () => controller.abort(); // ✅ Cancel request on unmount
}, []);
```

---

### ❌ Pitfall 19: Using async Functions Directly in useEffect

**The Mistake:**

```typescript
useEffect(async () => {
  // ❌ useEffect cannot be async!
  const data = await fetchData();
  setData(data);
}, []);
```

**Why It Fails:**
`useEffect` expects either nothing or a cleanup function to be returned. `async` functions return a Promise.

**The Fix:**

```typescript
useEffect(() => {
  const loadData = async () => {
    const data = await fetchData();
    setData(data);
  };

  loadData(); // ✅ Call async function inside
}, []);

// Or with IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

---

## React-Specific Gotchas

### ❌ Pitfall 20: Modifying children Prop

**The Mistake:**

```typescript
function Container({ children }: { children: ReactNode }) {
  children.forEach((child) => {
    // ❌ Can't iterate ReactNode like this
  });
}
```

**The Fix:**

```typescript
import { Children, cloneElement, isValidElement } from "react";

function Container({ children }: { children: ReactNode }) {
  const modifiedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { className: "modified" });
    }
    return child;
  });

  return <div>{modifiedChildren}</div>;
}
```

---

### ❌ Pitfall 21: Keys in Lists

**The Mistake:**

```typescript
// ❌ Using index as key
{
  todos.map((todo, index) => <TodoItem key={index} todo={todo} />);
}

// ❌ No key at all
{
  todos.map((todo) => <TodoItem todo={todo} />);
}
```

**Why It Fails:**
Index keys cause issues when list order changes. React can't track which items moved/changed.

**The Fix:**

```typescript
{
  todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} /> // ✅ Stable, unique key
  ));
}
```

**Rule:** Use stable, unique identifiers. If your data has no ID, generate one when creating items.

---

## Debugging Tips

### Finding Performance Issues

```typescript
// Add console logs to track renders
function MyComponent({ prop1, prop2 }) {
  console.log("MyComponent rendered", { prop1, prop2 });

  // Or use this pattern
  useEffect(() => {
    console.log("Component updated");
  });

  return <div>...</div>;
}
```

### Understanding Why Component Re-rendered

```typescript
// Custom hook to log prop changes
function useWhyDidYouUpdate(name: string, props: any) {
  const previousProps = useRef<any>();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps: any = {};

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
function MyComponent(props) {
  useWhyDidYouUpdate("MyComponent", props);
  return <div>...</div>;
}
```

---

## Summary: Key Takeaways

1. **Always think immutability** - Never mutate state directly
2. **Use updater functions** - When new state depends on old state
3. **Complete dependency arrays** - Include everything you use in useEffect
4. **Clean up side effects** - Remove listeners, cancel requests, clear timers
5. **Memoize strategically** - Profile first, optimize second
6. **Stabilize callbacks** - Use useCallback for functions passed to memoized children
7. **Handle async properly** - Try/catch, cleanup, avoid state updates after unmount
8. **Type everything** - Use proper TypeScript types for safety
9. **Use unique keys** - Never use index for keys in dynamic lists
10. **Debug systematically** - Console logs, React DevTools, custom hooks

---

**These mistakes aren't failures - they're learning opportunities.** Document them, understand why they happened, and you'll become a better React developer.
