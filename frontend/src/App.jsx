
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MedicinesPage from './pages/MedicinesPage';
import SuppliersPage from './pages/SuppliersPage';
import TransactionsPage from './pages/TransactionsPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import Navbar from './components/Navbar';
import DarkModeToggle from './components/DarkModeToggle';
import { SuppliersProvider } from './context/SuppliersContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};


export default function App() {
  return (
    <AuthProvider>
      <SuppliersProvider>
        <BrowserRouter>
          <DarkModeToggle />
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/inventory" element={<PrivateRoute><InventoryPage /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
            <Route path="/medicines" element={<PrivateRoute><MedicinesPage /></PrivateRoute>} />
            <Route path="/suppliers" element={<PrivateRoute><SuppliersPage /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </SuppliersProvider>
    </AuthProvider>
  );
}