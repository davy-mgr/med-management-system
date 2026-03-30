import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, X, Package, Calendar, Hash, AlertTriangle } from 'lucide-react';

export default function InventoryPage({ inventory, userRole, onUpdateStock, onAddMedicine }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    expiry: '',
    quantity: 0,
    min_threshold: 10
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddMedicine(formData);
      setIsModalOpen(false);
      setFormData({ name: '', batch: '', expiry: '', quantity: 0, min_threshold: 10 });
    } catch (error) {
      console.error("Failed to add medicine:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card !p-0 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
          <h3 className="text-lg font-bold text-white">Medicine Catalog</h3>
          {userRole === 'admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              <Plus size={18} />
              <span>Register New Drug</span>
            </button>
          )}
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead className="table-head">
              <tr>
                <th className="table-cell font-semibold">Medicine Details</th>
                <th className="table-cell font-semibold">Batch</th>
                <th className="table-cell font-semibold">Stock Level</th>
                <th className="table-cell font-semibold">Expiry</th>
                <th className="table-cell font-semibold">Status</th>
                <th className="table-cell font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {inventory.map((item) => (
                <tr key={item.id} className="table-row group">
                  <td className="table-cell">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">ID: MM-{item.id.toString().padStart(4, '0')}</p>
                  </td>
                  <td className="table-cell text-slate-400 font-mono text-sm">{item.batch || 'N/A'}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-white">{item.quantity}</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.quantity <= item.min_threshold ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min((item.quantity / (item.min_threshold * 3)) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-slate-400 text-sm">
                    {item.expiry ? new Date(item.expiry).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${
                      item.quantity <= item.min_threshold 
                        ? 'badge-amber' 
                        : 'badge-emerald'
                    }`}>
                      {item.quantity <= item.min_threshold ? 'Low Stock' : 'Optimal'}
                    </span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onUpdateStock(item.id, 'addition', 10)}
                        className="btn-ghost text-emerald-500 hover:bg-emerald-900/20" 
                        title="Restock (+10)"
                      >
                        <Plus size={18} />
                      </button>
                      <button 
                        onClick={() => onUpdateStock(item.id, 'usage', 1)}
                        className="btn-ghost text-blue-500 hover:bg-blue-900/20"
                        title="Dispense (-1)"
                      >
                        <Minus size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-content"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-900/30 text-emerald-400 rounded-xl flex items-center justify-center">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Register Drug</h3>
                    <p className="text-xs text-slate-400">Add new medicine to inventory</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-ghost text-slate-500 hover:text-white rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="label-text">
                    <Package size={14} />
                    Medicine Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Paracetamol 500mg"
                    className="input-field font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="label-text">
                      <Hash size={14} />
                      Batch Number
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="BATCH-000"
                      className="input-field font-mono"
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="label-text">
                      <Calendar size={14} />
                      Expiry Date
                    </label>
                    <input
                      required
                      type="date"
                      className="input-field"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="label-text">
                      <Plus size={14} />
                      Initial Qty
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      className="input-field font-black"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="label-text">
                      <AlertTriangle size={14} />
                      Min Threshold
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      className="input-field font-black"
                      value={formData.min_threshold}
                      onChange={(e) => setFormData({ ...formData, min_threshold: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full btn-primary py-4 rounded-2xl text-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Plus size={20} />
                        <span>Register Medicine</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
