import { useMemo } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, History, X } from 'lucide-react';

export default function AlertsPage({ inventory, onUpdateStock }) {
  const lowStockItems = useMemo(() => inventory.filter(item => item.quantity <= item.min_threshold), [inventory]);
  
  const { expired, expiringSoon } = useMemo(() => {
    const now = new Date().getTime();
    const thirtyDaysFromNow = now + 30 * 24 * 60 * 60 * 1000;
    
    return inventory.reduce((acc, item) => {
      if (!item.expiry) return acc;
      const expiryTime = new Date(item.expiry).getTime();
      
      if (expiryTime < now) {
        acc.expired.push(item);
      } else if (expiryTime < thirtyDaysFromNow) {
        acc.expiringSoon.push(item);
      }
      return acc;
    }, { expired: [], expiringSoon: [] });
  }, [inventory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Section */}
        <div className="card !p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 badge-amber rounded-2xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Low Stock</h3>
              <p className="text-slate-400 text-xs">Below threshold</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            {lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                <div>
                  <p className="font-bold text-sm text-white">{item.name}</p>
                  <p className="text-[10px] text-slate-400">Stock: {item.quantity} / Min: {item.min_threshold}</p>
                </div>
                <button 
                  onClick={() => onUpdateStock(item.id, 'addition', 50)}
                  className="btn-primary !px-3 !py-1.5 !text-[10px] !rounded-lg"
                >
                  Restock
                </button>
              </div>
            ))}
            {lowStockItems.length === 0 && <p className="text-center py-6 text-slate-500 italic text-sm">All stock levels optimal.</p>}
          </div>
        </div>

        {/* Expired Section */}
        <div className="card !p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 badge-rose rounded-2xl">
              <X size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Expired Items</h3>
              <p className="text-slate-400 text-xs">Immediate disposal required</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            {expired.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-rose-900/10 rounded-xl border border-rose-900/20">
                <div>
                  <p className="font-bold text-sm text-white">{item.name}</p>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Expired: {new Date(item.expiry).toLocaleDateString()}</p>
                </div>
                <div className="p-1.5 bg-rose-900/30 text-rose-400 rounded-lg">
                  <AlertTriangle size={14} />
                </div>
              </div>
            ))}
            {expired.length === 0 && <p className="text-center py-6 text-slate-500 italic text-sm">No expired items found.</p>}
          </div>
        </div>

        {/* Expiring Soon Section */}
        <div className="card !p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 badge-emerald rounded-2xl">
              <History size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Expiring Soon</h3>
              <p className="text-slate-400 text-xs">Within next 30 days</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            {expiringSoon.map(item => {
              const daysLeft = Math.ceil((new Date(item.expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                  <div>
                    <p className="font-bold text-sm text-white">{item.name}</p>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      Expires in {daysLeft} days ({new Date(item.expiry).toLocaleDateString()})
                    </p>
                  </div>
                  <div className="p-1.5 bg-emerald-900/30 text-emerald-400 rounded-lg">
                    <History size={14} />
                  </div>
                </div>
              );
            })}
            {expiringSoon.length === 0 && <p className="text-center py-6 text-slate-500 italic text-sm">No items expiring soon.</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
