import { Routes, Route } from "react-router-dom";
import { AIRulesProvider } from "./context/AIRulesContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CommandPalette from "./components/CommandPalette";
import Simulation from "./pages/Simulation";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Classes from "./pages/Classes";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import Profile from "./pages/AdminProfile";
import Settings from "./pages/Settings";
import AdminProfile from "./pages/AdminProfile";

export default function App() {
  return (
    <AIRulesProvider>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <Generate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/simulation"
  element={
    <ProtectedRoute>
      <Simulation />
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <CommandPalette />

    </AIRulesProvider>
   
  );
}
