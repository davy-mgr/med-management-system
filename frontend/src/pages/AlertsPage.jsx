import { useMemo } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, History } from 'lucide-react';

export default function AlertsPage({ inventory, onUpdateStock }) {
  const lowStockItems = useMemo(() => inventory.filter(item => item.quantity <= item.min_threshold), [inventory]);
  const expiringSoon = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    const thirtyDaysFromNow = Date.now() + 30 * 24 * 60 * 60 * 1000;
    return inventory.filter(i => i.expiry && new Date(i.expiry).getTime() < thirtyDaysFromNow);
  }, [inventory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card !p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 badge-amber rounded-2xl">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Low Stock Warning</h3>
              <p className="text-slate-400 text-sm">Items below minimum threshold</p>
            </div>
          </div>
          <div className="space-y-4">
            {lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">Current: {item.quantity} units</p>
                </div>
                <button 
                  onClick={() => onUpdateStock(item.id, 'addition', 50)}
                  className="btn-primary !px-4 !py-2 !text-xs"
                >
                  Restock Now
                </button>
              </div>
            ))}
            {lowStockItems.length === 0 && <p className="text-center py-8 text-slate-500 italic">No low stock items detected.</p>}
          </div>
        </div>

        <div className="card !p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 badge-rose rounded-2xl">
              <History size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Expiry Watchlist</h3>
              <p className="text-slate-400 text-sm">Items near expiration date</p>
            </div>
          </div>
          <div className="space-y-4">
            {expiringSoon.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-xs text-rose-400 font-medium">Expires: {new Date(item.expiry).toLocaleDateString()}</p>
                </div>
                <div className="p-2 badge-rose rounded-lg">
                  <AlertTriangle size={16} />
                </div>
              </div>
            ))}
            {expiringSoon.length === 0 && (
              <p className="text-center py-8 text-slate-500 italic">No items expiring soon.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
