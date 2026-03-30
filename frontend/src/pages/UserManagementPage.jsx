import { motion } from 'motion/react';

export default function UserManagementPage({ users }) {
  return (
    <motion.div 
      key="users"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card !p-0 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Team Members</h3>
        <button className="text-emerald-500 text-sm font-bold hover:underline">Invite Member</button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map(u => (
          <div key={u.id} className="p-6 rounded-3xl border border-slate-800 bg-slate-800/50 flex flex-col items-center text-center group hover:bg-slate-800 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all">
            <div className="w-20 h-20 rounded-3xl badge-emerald flex items-center justify-center text-2xl font-black mb-4 group-hover:scale-110 transition-transform">
              {u.name.charAt(0)}
            </div>
            <h4 className="font-bold text-white text-lg">{u.name}</h4>
            <p className="text-slate-400 text-sm mb-4">{u.email}</p>
            <span className="badge bg-slate-900 border border-slate-800 text-slate-400">
              {u.role}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
