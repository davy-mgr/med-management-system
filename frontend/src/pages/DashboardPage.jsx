import { motion } from 'motion/react';
import { Package, AlertTriangle, TrendingUp, Users, TrendingDown } from 'lucide-react';
import { StatCard } from '@/components/StatCard.jsx';

export default function DashboardPage({ inventory, transactions, usersCount, onViewHistory }) {
  const lowStockItems = inventory.filter(item => item.quantity <= item.min_threshold);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Medicines" value={inventory.length} icon={Package} color="emerald" />
        <StatCard title="Low Stock Alerts" value={lowStockItems.length} icon={AlertTriangle} color="amber" />
        <StatCard title="Total Transactions" value={transactions.length} icon={TrendingUp} color="blue" />
        <StatCard title="Active Users" value={usersCount || 1} icon={Users} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <button onClick={onViewHistory} className="text-emerald-500 text-sm font-medium hover:underline">View Full Log</button>
          </div>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${t.type === 'addition' ? 'badge-emerald' : 'badge-blue'}`}>
                    {t.type === 'addition' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.drug_name}</p>
                    <p className="text-xs text-slate-400">{new Date(t.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${t.type === 'addition' ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {t.type === 'addition' ? '+' : '-'}{t.quantity}
                  </p>
                  <p className="text-xs text-slate-500">by {t.user_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-6">Critical Stock Alerts</h3>
          <div className="space-y-4">
            {lowStockItems.length > 0 ? (
              lowStockItems.map(item => (
                <div key={item.id} className="p-4 rounded-xl border border-amber-900/30 bg-amber-900/10 flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-amber-200 text-sm">{item.name}</p>
                    <p className="text-xs text-amber-500/80 mt-1">Stock: {item.quantity} | Threshold: {item.min_threshold}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Package size={48} className="mx-auto mb-2 opacity-10" />
                <p>All stock levels healthy</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
