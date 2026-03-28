import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
// import DarkModeToggle from './components/DarkModeToggle';
import { SuppliersProvider } from './context/SuppliersContext';
import { MedicinesProvider } from './context/MedicinesContext';
import { TransactionsProvider } from './context/TransactionsContext';
import { useEffect } from 'react';
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};


export default function App() {
  // Always enable dark mode
  useEffect(() => {
    document.body.classList.add('dark-mode');
    return () => document.body.classList.remove('dark-mode');
  }, []);
  return (
    <AuthProvider>
      <SuppliersProvider>
        <MedicinesProvider>
          <TransactionsProvider>
            <BrowserRouter>
              {/* DarkModeToggle removed, site always in dark mode */}
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPageRedirect />} />
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
          </TransactionsProvider>
        </MedicinesProvider>
      </SuppliersProvider>
    </AuthProvider>
  );
}

function LoginPageRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  return <LoginPage />;
}