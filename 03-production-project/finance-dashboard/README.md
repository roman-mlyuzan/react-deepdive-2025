# Finance Dashboard

A modern, production-ready personal finance management application built with React, TypeScript, and React Query.

## 🚀 Features

### Core Functionality
- **Transaction Management** - Create, read, update, and delete financial transactions
- **Dashboard Overview** - Visual summary of income vs expenses with interactive charts
- **Reports & Analytics** - Detailed breakdown by category with date filtering
- **Budget Tracking** - Set and monitor budget goals by category
- **Data Export** - Export transactions to CSV for external analysis

### User Experience
- **Toast Notifications** - Real-time feedback for all user actions
- **Loading States** - Skeleton screens and spinners for better perceived performance
- **Empty States** - Helpful guidance when no data exists
- **Error Boundaries** - Graceful error handling with user-friendly messages
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Performance Optimizations
- **React Query** - Smart caching with 5-minute stale time and 10-minute garbage collection
- **Virtual Scrolling** - Handles 3000+ transactions smoothly with @tanstack/react-virtual
- **Memoization** - Strategic use of `useMemo` and `React.memo` for expensive calculations
- **Smart Rendering** - Automatic threshold-based switching between regular and virtualized lists

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first styling

### State Management & Data
- **React Query (TanStack Query v5)** - Server state management with automatic caching
- **Zustand** - Client-side state management (toasts)
- **React Hook Form** - Performant form handling
- **Zod** - Runtime schema validation

### Visualization
- **Recharts** - Interactive charts and graphs for data visualization

### Development
- **JSON Server** - Mock REST API for development
- **Custom Express Server** - Bypasses pagination limits for large datasets

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd finance-dashboard

# Install dependencies
npm install
```

## 🚦 Running the Application

### Development Mode

```bash
# Terminal 1: Start the backend server (port 3001)
npm run server

# Terminal 2: Start the Vite dev server (port 5173)
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── api/              # API client functions
├── components/       # React components
│   ├── common/      # Shared components (Button, EmptyState, etc.)
│   ├── dashboard/   # Dashboard-specific components
│   ├── layout/      # Layout components (Header, Sidebar)
│   ├── reports/     # Reports page components
│   └── transactions/# Transaction management components
├── const/           # Constants and configuration
├── hooks/           # Custom React hooks
├── pages/           # Page components (route-level)
├── schemas/         # Zod validation schemas
├── store/           # Zustand stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🎯 Key Features Implementation

### React Query Integration
- **Smart Caching**: Data is cached for 5 minutes, preventing unnecessary API calls
- **Automatic Invalidation**: Cache is refreshed after mutations (create/update/delete)
- **Optimistic Updates Ready**: Architecture supports optimistic UI updates

### Form Handling
- **React Hook Form + Zod**: Type-safe validation with excellent DX
- **Smart Category Logic**: Income transactions auto-select "income" category
- **Error Handling**: Forms stay open on failure, allowing users to fix errors

### Performance at Scale
- **Virtual Scrolling**: Only renders visible transactions (57px per row, 5-item buffer)
- **CSS Grid Layout**: Perfect column alignment in virtualized table
- **Smart Threshold**: Switches to virtualization at 50+ items
- **Memoized Calculations**: Chart data aggregation runs only when dependencies change

### Architecture Patterns
- **Smart vs Presentational**: Clear separation between data logic and UI
- **Custom Hooks**: Encapsulated logic in `useTransactionsQuery` and `useTransactionMutations`
- **Type Safety**: Comprehensive TypeScript coverage with proper generics
- **Error Boundaries**: Per-route error handling for better resilience

## 🔧 Configuration

### React Query Settings
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutes fresh
      gcTime: 1000 * 60 * 10,          // 10 minutes in cache
      refetchOnWindowFocus: false,      // Don't refetch on tab focus
      retry: 1,                         // Retry failed requests once
    },
  },
});
```

### Virtual Scrolling Settings
```typescript
const VIRTUALIZATION_THRESHOLD = 50;  // Switch to virtual scrolling at 50+ items
const ROW_HEIGHT = 57;                // Pixels per row
const OVERSCAN = 5;                   // Buffer items above/below viewport
```

## 📚 Learning Outcomes

This project demonstrates proficiency in:

1. **Modern React Patterns**
   - Hooks (useState, useEffect, useMemo, useRef)
   - Custom hooks for reusable logic
   - Component composition and prop drilling alternatives

2. **Performance Optimization**
   - Memoization strategies
   - Virtual scrolling for large datasets
   - Smart rendering decisions

3. **State Management**
   - Server state with React Query
   - Local state with Zustand
   - Form state with React Hook Form

4. **TypeScript**
   - Generic types and utility types
   - Type inference and type guards
   - Proper interface design

5. **Production Practices**
   - Error boundaries
   - Loading states
   - Empty states
   - Form validation
   - API error handling

## 🚀 Future Enhancements

- [ ] Optimistic UI updates for instant feedback
- [ ] Data aggregation for dashboard (limit to last 30 days)
- [ ] Shared query key constants file
- [ ] Budget alerts and notifications
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Dark mode
- [ ] PWA capabilities

## 📄 License

This project is part of a learning journey and is available for educational purposes.

## 🙏 Acknowledgments

Built as part of the React Deep Dive 2025 learning path, focusing on production-ready patterns and performance optimization techniques.
