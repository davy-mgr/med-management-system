import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLogin, onToggleSignup }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onLogin(data);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Branding/Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full -mr-48 -mt-48 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full -ml-48 -mb-48 opacity-20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-700 font-black text-2xl shadow-xl">T</div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Track-Drug</h1>
          </div>
          
          <div className="space-y-8 max-w-md">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Empowering Healthcare Systems in Africa.
            </h2>
            <p className="text-emerald-50 text-xl leading-relaxed opacity-90">
              A modern solution for managing essential medicines, reducing shortages, and ensuring equitable access to care.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-700 bg-emerald-500 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <p className="text-emerald-100 text-sm font-medium">Trusted by 500+ healthcare facilities</p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md card p-10 backdrop-blur-xl bg-slate-900/80 border-slate-800"
        >
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-slate-400">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="label-text ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="name@facility.org"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-text ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  name="password"
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full btn-primary py-4 rounded-2xl text-lg flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={onToggleSignup}
              className="text-emerald-500 font-semibold hover:underline"
            >
              Don&apos;t have an account? Sign Up
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
