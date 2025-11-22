# React Deep Dive 2025

A systematic exploration of React patterns and best practices from an experienced Angular developer's perspective.

## About

I'm a senior front-end developer with 7+ years of TypeScript/JavaScript experience, specializing in Angular (versions 5-19). While I have prior React exposure, I'm now working through React fundamentals to advanced patterns methodically—ensuring zero gaps and building production-ready expertise.

This repository documents my learning journey, comparative insights between Angular and React, and serves as a comprehensive reference for future projects.

## Purpose

Rather than learning React casually, I'm taking a structured approach to:

- Build a strong foundation by revisiting core concepts
- Document patterns, gotchas, and best practices
- Create reusable reference materials
- Develop portfolio-worthy projects
- Prepare for senior-level React interviews

The public documentation serves multiple purposes: it reinforces learning through teaching, provides accountability, and helps other developers making similar transitions.

## Repository Structure

### 📁 [01-fundamentals-review/](./01-fundamentals-review)

Core React concepts through hands-on projects.

**Projects:**

- **[Tic-Tac-Toe](./01-fundamentals-review/tic-tac-toe)** ✅ Complete
  - Component composition and props flow
  - State management with `useState`
  - Immutability patterns
  - Lifting state up
  - Time travel implementation

**Key Learnings:**

- React's immutability requirements vs. Angular's mutable updates
- Lifting state pattern as an alternative to Angular services
- Derived state calculations to avoid synchronization bugs
- Understanding React's reconciliation through keys in lists

### 📁 [02-hooks-mastery/](./02-hooks-mastery)

Deep dive into React Hooks and side effects.

**Projects:**

- **[Todo App](./02-hooks-mastery/todo-app)** ✅ Complete

  - Data fetching with `useEffect` and dependency arrays
  - Search/filter functionality with controlled inputs
  - Bulk delete with `Promise.allSettled()` for graceful error handling

  - **Custom Hooks Implementation:**

    - `useTodos` - Encapsulates todo CRUD operations, API calls, and loading state management
    - `useLocalStorage` - Syncs React state with localStorage and provides cross-tab synchronization
    - `useTodoStats` - Memoized statistics calculations demonstrating performance optimization

  - **Theme Toggle** - Demonstrates `useLocalStorage` in practice with persistent theme switchin

- **Performance Optimization:**

  - Component memoization with `React.memo`
  - Calculation caching with `useMemo`
  - Callback stabilization with `useCallback`
  - Statistics panel with optimized re-render behavior

  - **UI Patterns:**

  - Native `<dialog>` element for modals with backdrop handling
  - Form validation and controlled inputs
  - Optimistic UI updates

- **[Superhero HQ](./02-hooks-mastery/superhero-hq)** ✅ Complete
  - Demonstrates Context API for sharing state across components
  - Eliminates prop drilling through Provider/Consumer pattern
  - Custom hook pattern (`useHero`) for clean context consumption

**Key Learnings:**

- React's `useEffect()` as unified lifecycle hook (ngOnInit + ngOnChanges + ngOnDestroy)
- Dependency array patterns: `[]` (mount only), `[deps]` (on change), none (every render)
- Controlled inputs pattern for form handling and real-time filtering
- Extracting reusable logic into custom hooks for separation of concerns
- Updater function patterns: `setState(value)` and `setState(prev => value)`
- useEffect cleanup functions to prevent memory leaks (removing event listeners on unmount)
- Context API pattern for sharing state without prop drilling (React's answer to Angular DI)
- Cross-tab synchronization using browser's `storage` event API
- **Performance optimization trio:** `useMemo`, `useCallback`, and `React.memo` working together
- Understanding when NOT to optimize (avoiding premature optimization)
- Identifying unnecessary re-renders through console logging and Strict Mode behavior
- Native browser APIs: `<dialog>` element with `showModal()`, backdrop clicks, ESC key handling

**Focus Areas:**

- Understanding `useEffect` dependency arrays
- Managing side effects and cleanup
- Creating custom hooks for common patterns
- Performance optimization with `useMemo` and `useCallback`

### 📁 [03-production-project/](./03-production-project)

**Finance Dashboard** - Full-featured personal finance management application

**Status:** ✅ Complete (Days 8-10)

**Tech Stack:**

- React 19 + TypeScript + Vite
- React Query (TanStack Query v5) - Server state management
- React Router - Client-side routing
- React Hook Form + Zod - Form validation
- Recharts - Data visualization
- TailwindCSS - Styling
- Zustand - Client state (toasts)

**Key Features:**

- Transaction CRUD with smart caching
- Dashboard with interactive charts
- Reports with date filtering and CSV export
- Virtual scrolling for 3000+ transactions
- Error boundaries and empty states
- Toast notifications
- Protected routes with authentication

**Advanced Patterns Implemented:**

- React Query mutations with cache invalidation
- Custom hooks (`useTransactionsQuery`, `useTransactionMutations`)
- Performance optimization with `useMemo` and `React.memo`
- Smart vs Presentational component architecture
- Form lifecycle control (reset on success, persist on error)
- Virtual scrolling with @tanstack/react-virtual
- CSS Grid for perfect column alignment

**What I Learned:**

- Server state management best practices
- Performance at scale (handling large datasets)
- Production-ready error handling
- TypeScript generics and utility types
- Clean architecture patterns in React

### 📁 [docs/](./docs)

- **[Angular ↔ React Rosetta Stone](./docs/angular-react-rosetta-stone.md)** - Direct concept mappings between frameworks
- **[Common Pitfalls](./docs/common-pitfalls.md)** - Mistakes to avoid and solutions
- **[Performance Optimization Guide](./docs/performance-optimization.md)** - Comprehensive optimization strategies

**Contents:**

- **[Angular ↔ React Rosetta Stone](./docs/angular-react-rosetta-stone.md)** - Direct concept mappings between frameworks
- **[Common Pitfalls](./docs/common-pitfalls.md)** - Mistakes to avoid and solutions
- **[Interview Prep](./docs/interview-prep.md)** - Common questions with detailed answers

## Learning Timeline

**Days 1-2: Fundamentals** ✅ Complete

- ✅ Tic-tac-toe game (component composition, state management, immutability)

**Days 3-5: Hooks Mastery** ✅ Complete

- ✅ Todo app with `useEffect` and API integration
- ✅ Custom hooks (`useTodos`, `useLocalStorage`)
- ✅ Context API (Superhero HQ project)
- ✅ Cross-tab synchronization

**Days 6-7: Performance Optimization** ✅ Complete

- ✅ Component memoization with `React.memo`
- ✅ Calculation optimization with `useMemo`
- ✅ Callback stabilization with `useCallback`
- ✅ Custom hooks for reusable logic (`useTodoStats`)
- ✅ Native `<dialog>` API integration
- ✅ Understanding re-render patterns and optimization strategies

**Days 8-10: Production Project - Finance Dashboard** ✅ Complete

- ✅ Full CRUD with React Router and protected routes
- ✅ Form handling with React Hook Form + Zod validation
- ✅ Data visualization with Recharts
- ✅ React Query for server state management
- ✅ Performance optimization for 3000+ items
- ✅ Virtual scrolling implementation
- ✅ Error boundaries and professional UX patterns
- ✅ Toast notifications with Zustand
- ✅ TypeScript throughout with proper types

**Day 11: Next.js App Router Fundamentals** ✅ Complete

- Understanding Next.js philosophy and problems it solves
- Server Components vs Client Components
- File-based routing with App Router
- Dynamic routes with `[slug]` parameters
- Component architecture and refactoring
- Blog application with:
  - Home page with post list (Server Component)
  - Individual blog posts (dynamic routes)
  - About page (static route)
  - Interactive Like button (Client Component)
  - Shared layout with navigation
  - Reusable components (Container, PostCard, SiteHeader)

**Day 12: Server Actions, Loading & Error Handling** ✅ Complete

- **Server Actions:**
  - `"use server"` directive and proper file organization
  - `useActionState` hook for form state management
  - Form validation with error handling
  - Preserving user input on validation errors using `defaultValue`
  - Form reset on success with pure `key` prop pattern
  - Progressive enhancement (forms work without JavaScript)
  - Cache invalidation with `revalidatePath`

- **Loading States (Suspense Boundaries):**
  - Root `loading.tsx` with skeleton UI for home page
  - Route-specific `loading.tsx` for blog posts
  - Animated loading skeletons with `animate-pulse`
  - Automatic Suspense boundaries in Next.js App Router

- **Error Handling:**
  - Error boundary with `error.tsx` (Client Component)
  - Error logging with `useEffect`
  - User-friendly error messages with retry functionality
  - Custom 404 page with `not-found.tsx`

- **Comment System Implementation:**
  - Server Action for creating comments
  - Client Component form with state preservation
  - TypeScript with optional properties pattern
  - Loading states with `isPending`

- **Key Learnings:**
  - React 19 purity rules (no `Date.now()` in render)
  - Uncontrolled inputs vs controlled inputs
  - DRY patterns with helper functions
  - Avoided over-engineering with discriminated unions
  - Next.js special files: `loading.tsx`, `error.tsx`, `not-found.tsx`
  - Error boundaries must be Client Components

**Day 13: Advanced Next.js Patterns** ✅ Complete

- **Dynamic Metadata & SEO:**
  - Title templates with `%s` placeholder pattern
  - Open Graph tags for social media sharing (Facebook, LinkedIn)
  - Twitter Card metadata
  - Per-page dynamic metadata with `generateMetadata`
  - Article-specific metadata (publishedTime, authors)

- **Streaming with Suspense:**
  - Progressive page rendering (post renders, then comments stream in)
  - Created CommentsSkeleton loading UI
  - Wrapped async Server Components in Suspense boundaries
  - Improved perceived performance

- **Parallel Data Fetching:**
  - Refactored data model from `postId` to `slug` for parallel queries
  - Fetching post and comments simultaneously
  - Understanding parallelization constraints (dependent vs independent requests)
  - Using React's `use()` hook pattern with promises

- **Key Learnings:**
  - Metadata hierarchy: root layout → page-level
  - When parallel fetching works vs sequential dependencies
  - Data model design impacts performance (slug-based > id-based for this use case)
  - `useOptimistic` hook concept (decided overkill for simple comment form)
  - Tradeoffs between complexity and actual UX improvements

**Next: Production-Ready Patterns** ⏳ Ready to start

- Route handlers (API endpoints)
- Middleware and authentication
- Database integration (Prisma/Drizzle)
- Deployment optimization
- Real production project

## Key Insights: Angular → React

### Architectural Differences

**State Management:**

- **Angular:** Services with RxJS observables, dependency injection, two-way binding with `[(ngModel)]`
- **React:** Props drilling or Context API, unidirectional data flow, controlled components

**Component Model:**

- **Angular:** Class-based with decorators (`@Component`, `@Input`, `@Output`)
- **React:** Functional components with hooks (modern approach)

**Change Detection:**

- **Angular:** Zone.js automatic change detection, mutable updates supported
- **React:** Immutable updates required, virtual DOM diffing with reference equality

**Ecosystem:**

- **Angular:** Opinionated framework with built-in solutions (routing, forms, HTTP client)
- **React:** Minimal library focused on UI, compose your own architecture

### Pattern Equivalents

**Dependency Injection & Services:**

- **Angular:** Injectable services accessed via DI
- **React:** Context API with Provider/Consumer pattern

**Content Projection:**

- **Angular:** `<ng-content>` for component slots
- **React:** `children` prop for component composition

### What's Working Well

- JSX feels natural after the initial learning curve
- Functional components with hooks are elegant and concise
- The explicit nature of state updates prevents hidden bugs
- Large ecosystem provides solutions for most needs

### What Requires Adjustment

- Immutability is non-negotiable (Angular allows mutations)
- Need to choose and integrate additional libraries (routing, state management)
- `useEffect` dependency arrays require careful attention
- Props drilling can become verbose without Context or state management

## Progress Tracking

| Phase                    | Status        | Completion | Current Focus               |
| ------------------------ | ------------- | ---------- | --------------------------- |
| Fundamentals Review      | ✅ Complete   | 100%       | -                           |
| Hooks Mastery            | ✅ Complete   | 100%       | -                           |
| Performance Optimization | ✅ Complete   | 100%       | -                           |
| Production Project       | ✅ Complete   | 100%       | Finance Dashboard           |
| Next.js App Router       | ✅ Complete   | 100%       | Blog with Server Components |
| Server Actions & UX      | ✅ Complete   | 100%       | Forms, Loading, Errors      |
| Advanced Next.js         | ✅ Complete   | 100%       | Metadata, Streaming, Parallel Fetching |
| Production Patterns      | ⏳ In Progress | 0%         | API Routes, Auth, DB        |

## Technical Stack

**Mastered:**

- React 19 with Hooks
- TypeScript (comprehensive typing)
- Vite (build tool)
- React Router v6 (client-side routing)
- React Query v5 (TanStack Query)
- React Hook Form + Zod
- Zustand (lightweight state)
- TailwindCSS
- @tanstack/react-virtual
- Next.js 16 (App Router, Server Components, Server Actions)
- File-based routing and dynamic routes
- Form state management with useActionState
- Progressive enhancement patterns
- Dynamic metadata & SEO optimization
- Streaming with Suspense boundaries
- Parallel data fetching patterns

**Currently Learning:**

- Production-ready Next.js patterns
- Route handlers (API endpoints)
- Authentication & middleware
- Database integration (Prisma/Drizzle)

## Resources

**Primary Learning:**

- [React Official Documentation](https://react.dev) - Main learning resource
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- Claude AI - Technical instructor providing detailed explanations and code review

**Community & Reference:**

- React Discord community
- Stack Overflow for specific issues
- GitHub repositories of well-architected React projects

## Goals

- ✅ Solidify React fundamentals with comprehensive understanding
- ✅ Master Hooks patterns and create custom hooks
- ✅ Understand performance optimization strategies
- ✅ Build production-quality, performant applications
- ✅ Master React Query for server state management
- ✅ Implement virtual scrolling and advanced performance techniques
- ✅ Learn Next.js App Router and Server Components
- ⏳ Master advanced Next.js patterns (Server Actions, caching, streaming)
- ⏳ Successfully interview for senior React positions
- ⏳ Contribute to React open source ecosystem

## Connect

- 🌐 **GitHub**: [@roman-mlyuzan](https://github.com/roman-mlyuzan)
- 💼 **LinkedIn**: [Roman Mlyuzan](https://linkedin.com/in/roman-mlyuzan)

---

**Repository Status:** Active Learning | **Last Updated:** 11/19/25 | **Current Phase:** Next.js App Router → Advanced Patterns

_Systematic learning, documented progress, production-ready results._
