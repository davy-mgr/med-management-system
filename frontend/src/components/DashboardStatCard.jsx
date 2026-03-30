import { motion } from 'motion/react';

export function StatCard({ title, value, icon: Icon, color }) {
  const badgeColors = {
    emerald: 'badge-emerald',
    amber: 'badge-amber',
    blue: 'badge-blue',
    rose: 'badge-rose',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card flex items-center gap-5 transition-all hover:shadow-2xl hover:shadow-emerald-900/10"
    >
      <div className={`p-4 rounded-2xl border border-slate-800 flex items-center justify-center ${badgeColors[color]}`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="label-text mb-1">{title}</p>
        <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
      </div>
    </motion.div>
  );
}
