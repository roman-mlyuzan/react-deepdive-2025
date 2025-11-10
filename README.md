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
    - useTodos - Encapsulates todo CRUD operations, API calls, and loading state management
    - useLocalStorage - Syncs React state with localStorage and provides cross-tab synchronization
  - **Theme Toggle** - Demonstrates `useLocalStorage` in practice with persistent theme switchin

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

**Focus Areas:**

- Understanding `useEffect` dependency arrays
- Managing side effects and cleanup
- Creating custom hooks for common patterns
- Performance optimization with `useMemo` and `useCallback`

### 📁 [03-real-world-patterns/](./03-real-world-patterns)

Production-ready patterns and architectures.

**Planned Topics:**

- Authentication and protected routes
- Advanced data fetching strategies
- Form handling and validation
- Error boundaries and error handling
- Performance optimization techniques
- Testing patterns with React Testing Library

### 📁 [04-production-project/](./04-production-project)

Full-featured application demonstrating combined patterns and best practices.

**Status:** Planned after completing fundamentals and patterns

### 📁 [docs/](./docs)

Reference materials and comparative analyses.

**Contents:**

- **[Angular ↔ React Rosetta Stone](./docs/angular-react-rosetta-stone.md)** - Direct concept mappings between frameworks
- **[Common Pitfalls](./docs/common-pitfalls.md)** - Mistakes to avoid and solutions
- **[Interview Prep](./docs/interview-prep.md)** - Common questions with detailed answers

## Learning Timeline

**Week 1: Fundamentals & Hooks** ✅ Complete

- ✅ Day 1: Tic-tac-toe game
- ✅ Day 2-3: Todo app with `useEffect` and API integration
- ✅ Day 4-5: Custom hooks (`useTodos`, `useLocalStorage`)
- ✅ Day 6: Context API and cross-component state sharing

**Week 2: Advanced Patterns** (Current)

- Day 7: Performance optimization (useMemo, useCallback, React.memo)
- useReducer for complex state logic
- Component composition patterns

**Week 3: Production & Interview Readiness**

- Full-featured project
- Code challenge practice
- System design scenarios
- Technical interview preparation

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

| Phase               | Status         | Completion | Current Focus            |
| ------------------- | -------------- | ---------- | ------------------------ |
| Fundamentals Review | ✅ Complete    | 100%       | -                        |
| Hooks Mastery       | ✅ Complete    | 100%       | -                        |
| Real-world Patterns | 🚧 In Progress | 20%        | Performance Optimization |
| Production Project  | ⏳ Planned     | 0%         | -                        |

## Technical Stack

**Core Technologies:**

- React 18.x (latest stable)
- TypeScript (progressively typing projects)
- Vite (build tool for faster development)

**Upcoming Integration:**

- React Router (navigation)
- Context API → Redux Toolkit (state management progression)
- React Testing Library (testing approach)
- Potentially Next.js (server-side rendering exploration)

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
- ⏳ Understand React's reconciliation and rendering model
- ⏳ Build production-quality, performant components
- ⏳ Successfully interview for senior React positions
- ⏳ Contribute to React open source ecosystem

## Connect

- 🌐 **GitHub**: [@roman-mlyuzan](https://github.com/roman-mlyuzan)
- 💼 **LinkedIn**: [Roman Mlyuzan](https://linkedin.com/in/roman-mlyuzan)

---

**Repository Status:** Active Learning | **Last Updated:** 10/11/25 | **Current Phase:** Fundamentals & Hooks

_Systematic learning, documented progress, production-ready results._
