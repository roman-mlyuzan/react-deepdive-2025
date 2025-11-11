# Angular ↔ React Rosetta Stone

A comprehensive mapping of Angular concepts to their React equivalents for developers transitioning between frameworks.

---

## Component Architecture

### Component Definition

**Angular:**

```typescript
@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<string>();
}
```

**React:**

```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

function TodoItem({ todo, onToggle }: TodoItemProps) {
  return <div className="todo-item">{/* JSX here */}</div>;
}
```

**Key Differences:**

- Angular: Class-based with decorators
- React: Functional components (modern approach)
- Angular: Separate template files
- React: JSX embedded in component

---

## Data Flow

### Parent to Child Communication

**Angular - @Input():**

```typescript
// Parent
<app-todo-item [todo]="selectedTodo"></app-todo-item>

// Child
@Input() todo!: Todo;
```

**React - Props:**

```typescript
// Parent
<TodoItem todo={selectedTodo} />;

// Child
function TodoItem({ todo }: { todo: Todo }) {}
```

### Child to Parent Communication

**Angular - @Output():**

```typescript
// Parent
<app-todo-item (toggle)="handleToggle($event)"></app-todo-item>

// Child
@Output() toggle = new EventEmitter<string>();
this.toggle.emit(todoId);
```

**React - Callback Props:**

```typescript
// Parent
<TodoItem onToggle={handleToggle} />;

// Child
function TodoItem({ onToggle }: { onToggle: (id: string) => void }) {
  return <button onClick={() => onToggle(todo.id)}>Toggle</button>;
}
```

---

## State Management

### Component State

**Angular:**

```typescript
export class TodoComponent {
  todos: Todo[] = [];

  addTodo(title: string) {
    this.todos.push({ id: Date.now(), title, completed: false });
  }
}
```

**React:**

```typescript
function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), title, completed: false }]);
  };
}
```

**Key Differences:**

- Angular: Direct mutation allowed
- React: **Immutability required** - always create new arrays/objects

### Two-Way Binding

**Angular - [(ngModel)]:**

```typescript
<input [(ngModel)]="searchText" />
```

**React - Controlled Component:**

```typescript
const [searchText, setSearchText] = useState("");

<input value={searchText} onChange={(e) => setSearchText(e.target.value)} />;
```

**Note:** React requires explicit value + onChange (more verbose but more explicit)

---

## Lifecycle Hooks

### Initialization

**Angular - ngOnInit:**

```typescript
ngOnInit() {
  this.loadTodos();
}
```

**React - useEffect with []:**

```typescript
useEffect(() => {
  loadTodos();
}, []); // Empty array = run once on mount
```

### Cleanup

**Angular - ngOnDestroy:**

```typescript
ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

**React - useEffect Cleanup:**

```typescript
useEffect(() => {
  const listener = () => {
    /* ... */
  };
  window.addEventListener("storage", listener);

  return () => {
    window.removeEventListener("storage", listener);
  };
}, []);
```

### Reacting to Changes

**Angular - ngOnChanges:**

```typescript
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    this.loadUserData();
  }
}
```

**React - useEffect with Dependencies:**

```typescript
useEffect(() => {
  loadUserData();
}, [userId]); // Runs when userId changes
```

### Unified Lifecycle Hook

**React's useEffect replaces multiple Angular hooks:**

```typescript
useEffect(() => {
  // ngOnInit - runs on mount

  return () => {
    // ngOnDestroy - runs on unmount
  };
}, [dependency]); // ngOnChanges - runs when dependency changes
```

---

## Dependency Injection & Services

### Shared State/Logic

**Angular - Injectable Service:**

```typescript
@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos$ = new BehaviorSubject<Todo[]>([]);

  getTodos() {
    return this.http.get<Todo[]>('/api/todos');
  }
}

// Component
constructor(private todoService: TodoService) {}
```

**React - Context API:**

```typescript
// Create context
const TodoContext = createContext<TodoContextType | null>(null);

// Provider
function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

// Consumer (custom hook)
function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
}
```

**React - Custom Hook (Alternative):**

```typescript
function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const response = await fetch("/api/todos");
    setTodos(await response.json());
  };

  return { todos, loadTodos };
}

// Usage
const { todos, loadTodos } = useTodos();
```

---

## Content Projection

### Slot-based Content

**Angular - ng-content:**

```typescript
// Child component
<div class="card">
  <ng-content select="[header]"></ng-content>
  <ng-content></ng-content>
  <ng-content select="[footer]"></ng-content>
</div>

// Parent usage
<app-card>
  <h1 header>Title</h1>
  <p>Content</p>
  <button footer>Close</button>
</app-card>
```

**React - children prop:**

```typescript
// Child component
function Card({ header, children, footer }: CardProps) {
  return (
    <div className="card">
      <div className="header">{header}</div>
      <div className="content">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  );
}

// Parent usage
<Card header={<h1>Title</h1>} footer={<button>Close</button>}>
  <p>Content</p>
</Card>;
```

---

## Change Detection & Performance

### Preventing Unnecessary Updates

**Angular - OnPush Strategy:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {}
```

**React - React.memo:**

```typescript
const TodoList = React.memo(({ todos }: TodoListProps) => {
  return (/* ... */);
});

// Or with custom comparison
export default memo(TodoList, (prev, next) => {
  return prev.todos.length === next.todos.length;
});
```

### Optimizing Expensive Calculations

**Angular - Getters (recalculate every CD cycle):**

```typescript
get completedCount(): number {
  return this.todos.filter(t => t.completed).length;
}
```

**React - useMemo:**

```typescript
const completedCount = useMemo(
  () => todos.filter((t) => t.completed).length,
  [todos]
);
```

### Stable Function References

**Angular - Method binding:**

```typescript
// New function reference on every CD cycle
<button (click)="handleClick()">
```

**React - useCallback:**

```typescript
const handleClick = useCallback(() => {
  // Function logic
}, [dependencies]);
```

### List Optimization

**Angular - trackBy:**

```typescript
<div *ngFor="let todo of todos; trackBy: trackByTodoId">

trackByTodoId(index: number, todo: Todo): string {
  return todo.id;
}
```

**React - key prop:**

```typescript
{
  todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
}
```

---

## Conditional Rendering

**Angular - \*ngIf:**

```html
<div *ngIf="isLoading">Loading...</div>
<div *ngIf="error">Error: {{ error }}</div>
<div *ngIf="!isLoading && !error">Content</div>
```

**React - Conditional rendering:**

```typescript
{
  isLoading && <div>Loading...</div>;
}
{
  error && <div>Error: {error}</div>;
}
{
  !isLoading && !error && <div>Content</div>;
}
```

---

## List Rendering

**Angular - \*ngFor:**

```html
<div *ngFor="let todo of todos; let i = index">
  {{ i + 1 }}. {{ todo.title }}
</div>
```

**React - map():**

```typescript
{
  todos.map((todo, index) => (
    <div key={todo.id}>
      {index + 1}. {todo.title}
    </div>
  ));
}
```

---

## Forms

### Simple Input

**Angular - Template-driven:**

```html
<input [(ngModel)]="title" />
```

**Angular - Reactive:**

```typescript
titleControl = new FormControl('');
<input [formControl]="titleControl" />
```

**React - Controlled:**

```typescript
const [title, setTitle] = useState("");

<input value={title} onChange={(e) => setTitle(e.target.value)} />;
```

### Form Submission

**Angular:**

```html
<form (ngSubmit)="onSubmit()">
  <input [(ngModel)]="title" name="title" />
  <button type="submit">Add</button>
</form>
```

**React:**

```typescript
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  addTodo(title);
};

<form onSubmit={handleSubmit}>
  <input value={title} onChange={(e) => setTitle(e.target.value)} />
  <button type="submit">Add</button>
</form>;
```

---

## Styling

**Angular - Component styles:**

```typescript
@Component({
  styleUrls: ['./todo.component.css'],
  // Styles are scoped by default
})
```

**React - Multiple approaches:**

```typescript
// 1. CSS Modules
import styles from './Todo.module.css';
<div className={styles.todoItem} />

// 2. Inline styles
<div style={{ color: 'red', fontSize: '14px' }} />

// 3. CSS-in-JS (styled-components)
const TodoItem = styled.div`
  color: red;
  font-size: 14px;
`;

// 4. Utility classes (Tailwind)
<div className="text-red-500 text-sm" />
```

---

## HTTP Requests

**Angular - HttpClient:**

```typescript
constructor(private http: HttpClient) {}

getTodos(): Observable<Todo[]> {
  return this.http.get<Todo[]>('/api/todos');
}

ngOnInit() {
  this.todoService.getTodos().subscribe(todos => {
    this.todos = todos;
  });
}
```

**React - fetch + useEffect:**

```typescript
const [todos, setTodos] = useState<Todo[]>([]);

useEffect(() => {
  const loadTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  loadTodos();
}, []);
```

---

## Routing (High-level comparison)

**Angular Router:**

```typescript
// Routes config
const routes: Routes = [
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoDetailComponent }
];

// Navigation
this.router.navigate(['/todos', todoId]);

// Route params
constructor(private route: ActivatedRoute) {}
this.route.params.subscribe(params => {
  this.todoId = params['id'];
});
```

**React Router v6:**

```typescript
// Routes config
<Routes>
  <Route path="/todos" element={<TodoList />} />
  <Route path="/todos/:id" element={<TodoDetail />} />
</Routes>;

// Navigation
const navigate = useNavigate();
navigate(`/todos/${todoId}`);

// Route params
const { id } = useParams();
```

---

## Key Philosophical Differences

| Aspect             | Angular                   | React                    |
| ------------------ | ------------------------- | ------------------------ |
| **Architecture**   | Full framework            | Library (UI only)        |
| **Opinion level**  | Highly opinionated        | Minimal opinions         |
| **State updates**  | Mutable (with Zone.js)    | Immutable (required)     |
| **Data flow**      | Two-way binding available | Unidirectional only      |
| **Templates**      | HTML with directives      | JSX (JavaScript + XML)   |
| **Styling**        | Scoped by default         | Choose your approach     |
| **DI system**      | Built-in, powerful        | Context or custom hooks  |
| **Learning curve** | Steeper (more concepts)   | Gentler (fewer concepts) |
| **Bundle size**    | Larger baseline           | Smaller baseline         |
| **Ecosystem**      | Included batteries        | Bring your own batteries |

---

## Mental Model Shifts

### 1. **Immutability is Non-Negotiable**

**Angular (works):**

```typescript
this.todos.push(newTodo); // Direct mutation
```

**React (required):**

```typescript
setTodos((prev) => [...prev, newTodo]); // New array
```

### 2. **Explicit Over Implicit**

**Angular:** Framework handles a lot automatically (change detection, DI)  
**React:** You manage more explicitly (when to re-render, how to share state)

### 3. **Composition Over Configuration**

**Angular:** Configure routing, modules, providers  
**React:** Compose small components and hooks

### 4. **Functions Over Classes**

**Angular:** Class methods, this binding  
**React:** Pure functions, closures, no `this`

---

## Common Gotchas for Angular Developers

### 1. Forgetting Immutability

```typescript
// ❌ Angular habit - mutate directly
setTodos(todos.push(newTodo));

// ✅ React requirement - create new array
setTodos([...todos, newTodo]);
```

### 2. Missing Dependencies in useEffect

```typescript
// ❌ Forgot to include 'userId' in deps
useEffect(() => {
  fetchUser(userId);
}, []); // eslint warning!

// ✅ Include all used values
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### 3. Not Stabilizing Callbacks

```typescript
// ❌ New function every render - breaks child memo
const handleClick = () => console.log("clicked");

// ✅ Stable reference with useCallback
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

### 4. Treating JSX Like HTML Templates

```typescript
// ❌ Trying Angular template syntax
<div *ngIf={show}>Content</div>

// ✅ JavaScript expressions in JSX
{show && <div>Content</div>}
```

---

## When to Use What?

### Choose Angular When:

- Building large enterprise applications
- Team prefers strong opinions and structure
- Need everything included (routing, forms, HTTP, etc.)
- TypeScript-first is critical
- RxJS patterns are valuable

### Choose React When:

- Want flexibility in architecture
- Prefer smaller, composable pieces
- Large ecosystem of third-party libraries appeals
- Simpler mental model preferred
- Team is comfortable making more decisions

---

## Resources for Angular Developers Learning React

- [React Docs](https://react.dev) - Official documentation
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- This repository's examples - Real-world patterns with Angular context

---

**Remember:** Both are excellent tools. The "best" choice depends on your project, team, and preferences. Understanding both makes you a more versatile developer.
