import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ToastContainer from "./components/common/ToastContainer";
import Layout from "./components/layout/Layout";
import Budgets from "./pages/Budgets";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ErrorBoundary>
                  <Dashboard />{" "}
                </ErrorBoundary>
              }
            />
            <Route
              path="transactions"
              element={
                <ErrorBoundary>
                  <Transactions />{" "}
                </ErrorBoundary>
              }
            />
            <Route
              path="budgets"
              element={
                <ErrorBoundary>
                  <Budgets />{" "}
                </ErrorBoundary>
              }
            />
            <Route
              path="reports"
              element={
                <ErrorBoundary>
                  <Reports />{" "}
                </ErrorBoundary>
              }
            />
            <Route
              path="settings"
              element={
                <ErrorBoundary>
                  <Settings />{" "}
                </ErrorBoundary>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
