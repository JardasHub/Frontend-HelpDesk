import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard.jsx";
import NewChamado from "./pages/NewChamado";
import EditChamado from "./pages/EditChamado";
import ChamadoDetails from "./pages/ChamadoDetails";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chamados/novo"
            element={
              <ProtectedRoute>
                <NewChamado />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chamados/:id/editar"
            element={
              <ProtectedRoute>
                <EditChamado />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chamados/:id"
            element={
              <ProtectedRoute>
                <ChamadoDetails />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </main>
    </div>
  );
}
