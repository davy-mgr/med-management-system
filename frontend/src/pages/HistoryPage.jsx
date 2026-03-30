import { motion } from 'motion/react';
import { FileText, TrendingUp, TrendingDown } from 'lucide-react';

export default function HistoryPage({ transactions }) {
  return (
    <motion.div 
      key="history"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card !p-0 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
        <h3 className="text-lg font-bold text-white">System Audit Logs</h3>
        <button className="btn-ghost flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
          <FileText size={18} />
          <span className="text-sm font-medium">Download Report</span>
        </button>
      </div>
      <div className="p-6 space-y-3">
        {transactions.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 border border-slate-800 rounded-2xl hover:border-emerald-900/50 transition-colors bg-slate-800/50">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.type === 'addition' ? 'badge-emerald' : 'badge-blue'}`}>
                {t.type === 'addition' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">{t.drug_name}</p>
                  <span className={`badge ${t.type === 'addition' ? 'badge-emerald' : 'badge-blue'}`}>
                    {t.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{new Date(t.date).toLocaleString()} • {t.notes}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-lg font-black ${t.type === 'addition' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {t.type === 'addition' ? '+' : '-'}{t.quantity}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">User: {t.user_name}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
