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

- **Todo App** ✅ Complete - `useEffect`, data fetching, form handling
- **useEffect Patterns** ✅ Complete - Side effects, cleanup, dependency arrays
- **Custom Hooks Library** ✅ Complete - Extracting and reusing logic

**Key Learnings:**

- React's useEffect() vs. Angular's lifecycle hooks
- Using Promise.allSettled() vs Promise.all(), handling gracefully failed delete requests
- Displaying filtered list
- Handling loading states
- Custom hooks pattern
- Cross-tab sync
- Supporting updater functions

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

**Week 1: Fundamentals & Hooks** (Current)

- ✅ Day 1: Tic-tac-toe game (completed)
- ✅ Day 2-3: Todo app with `useEffect` and API integration (completed)
- ✅ Day 4-5: Custom hooks - extracting reusable logic

**Week 2: Advanced Patterns**

- Context API and `useReducer` patterns
- Performance optimization (useMemo, useCallback)
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

| Phase               | Status         | Completion | Current Focus |
| ------------------- | -------------- | ---------- | ------------- |
| Fundamentals Review | ✅ Complete    | 100%       | -             |
| Hooks Mastery       | ✅ Complete    | 100%       | -             |
| Real-world Patterns | 🚧 In Progress | 0%         | -             |
| Production Project  | ⏳ Planned     | 0%         | -             |

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
