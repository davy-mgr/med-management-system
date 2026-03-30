import { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  History, 
  Users, 
  LogOut,
  Menu,
  X,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '@/services/api.js';

// Pages
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import InventoryPage from '@/pages/InventoryPage.jsx';
import AlertsPage from '@/pages/AlertsPage.jsx';
import HistoryPage from '@/pages/HistoryPage.jsx';
import UserManagementPage from '@/pages/UserManagementPage.jsx';

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return (savedUser && token) ? JSON.parse(savedUser) : null;
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [authView, setAuthView] = useState('login');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [invData, transData] = await Promise.all([
        api.get('/api/inventory'),
        api.get('/api/transactions')
      ]);
      setInventory(invData);
      setTransactions(transData);

      if (user?.role === 'admin') {
        const usersData = await api.get('/api/users');
        setAllUsers(usersData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [user, fetchData]);

  const handleLogin = async (credentials) => {
    try {
      const data = await api.post('/api/auth/login', credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      alert(error.error || "Login failed");
    }
  };

  const handleSignup = async (details) => {
    try {
      const data = await api.post('/api/auth/signup', details);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      alert(error.error || "Signup failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleUpdateStock = async (id, type, amount) => {
    try {
      await api.post('/api/transactions', { drug_id: id, type, quantity: amount, notes: `Manual ${type}` });
      fetchData();
    } catch (error) {
      alert(error.error || "Update failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-900/30 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading Track-Drug...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authView === 'login' 
      ? <LoginPage onLogin={handleLogin} onToggleSignup={() => setAuthView('signup')} />
      : <SignupPage onSignup={handleSignup} onToggleLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-slate-900 border-r border-slate-800 flex flex-col sticky top-0 h-screen z-20"
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <h1 className="text-xl font-bold text-white tracking-tight">Track-Drug</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="btn-ghost text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} isOpen={isSidebarOpen} />
          <NavItem id="inventory" icon={Package} label="Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} isOpen={isSidebarOpen} />
          <NavItem id="alerts" icon={AlertTriangle} label="Stock Alerts" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} isOpen={isSidebarOpen} />
          <NavItem id="history" icon={History} label="Audit Logs" active={activeTab === 'history'} onClick={() => setActiveTab('history')} isOpen={isSidebarOpen} />
          {user.role === 'admin' && (
            <NavItem id="users" icon={Users} label="Team Management" active={activeTab === 'users'} onClick={() => setActiveTab('users')} isOpen={isSidebarOpen} />
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 p-3 mb-4 bg-slate-800 rounded-xl ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full badge-emerald flex items-center justify-center font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{user.role}</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-slate-400 text-sm">System status: All services operational</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 transition-all text-white"
              />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <DashboardPage 
              inventory={inventory} 
              transactions={transactions} 
              usersCount={allUsers.length} 
              onViewHistory={() => setActiveTab('history')} 
            />
          )}
          {activeTab === 'inventory' && (
            <InventoryPage 
              inventory={inventory.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))} 
              userRole={user.role} 
              onUpdateStock={handleUpdateStock} 
              onAddMedicine={async (data) => {
                await api.post('/api/inventory', data);
                fetchData();
              }}
            />
          )}
          {activeTab === 'alerts' && (
            <AlertsPage 
              inventory={inventory} 
              onUpdateStock={handleUpdateStock} 
            />
          )}
          {activeTab === 'history' && (
            <HistoryPage 
              transactions={transactions} 
            />
          )}
          {activeTab === 'users' && user.role === 'admin' && (
            <UserManagementPage 
              users={allUsers} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/40' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-emerald-400'
      } ${!isOpen && 'justify-center px-0'}`}
    >
      <Icon size={22} className={active ? 'scale-110' : ''} />
      {isOpen && <span className="font-bold text-sm tracking-tight">{label}</span>}
    </button>
  );
}
