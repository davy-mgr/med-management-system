// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MedicinesPage from './pages/MedicinesPage';
import SuppliersPage from './pages/SuppliersPage';
import TransactionsPage from './pages/TransactionsPage';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait for auth check

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/medicines" /> : <LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/medicines"
        element={user ? <MedicinesPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/suppliers"
        element={user ? <SuppliersPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/transactions"
        element={user ? <TransactionsPage /> : <Navigate to="/login" />}
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to={user ? "/medicines" : "/login"} />} />
    </Routes>
  );
};

export default App;