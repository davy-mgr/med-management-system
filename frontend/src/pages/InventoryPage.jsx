import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, X, Package, Calendar, Hash, AlertTriangle, Edit2 } from 'lucide-react';

export default function InventoryPage({ inventory, userRole, onUpdateStock, onAddMedicine, onUpdateMedicine }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, expiring-soon, expired
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    expiry: '',
    quantity: 0,
    min_threshold: 10
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredInventory = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return inventory.filter(item => {
      if (filterType === 'all') return true;
      if (!item.expiry) return false;
      const expiryDate = new Date(item.expiry);
      if (filterType === 'expired') return expiryDate < now;
      if (filterType === 'expiring-soon') return expiryDate >= now && expiryDate <= thirtyDaysFromNow;
      return true;
    });
  }, [inventory, filterType]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      batch: item.batch || '',
      expiry: item.expiry ? new Date(item.expiry).toISOString().split('T')[0] : '',
      quantity: item.quantity,
      min_threshold: item.min_threshold
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await onUpdateMedicine(editingItem.id, formData);
      } else {
        await onAddMedicine(formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ name: '', batch: '', expiry: '', quantity: 0, min_threshold: 10 });
    } catch (error) {
      console.error("Failed to save medicine:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            All Items
          </button>
          <button 
            onClick={() => setFilterType('expiring-soon')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'expiring-soon' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Expiring Soon
          </button>
          <button 
            onClick={() => setFilterType('expired')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'expired' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Expired
          </button>
        </div>
        
        {userRole === 'admin' && (
          <button 
            onClick={() => {
              setEditingItem(null);
              setFormData({ name: '', batch: '', expiry: '', quantity: 0, min_threshold: 10 });
              setIsModalOpen(true);
            }}
            className="btn-primary w-full md:w-auto"
          >
            <Plus size={18} />
            <span>Register New Drug</span>
          </button>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-0 overflow-hidden"
      >
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
              {filteredInventory.map((item) => {
                const isExpired = item.expiry && new Date(item.expiry) < new Date();
                const isExpiringSoon = item.expiry && !isExpired && new Date(item.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

                return (
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
                    <td className="table-cell">
                      <div className={`text-sm font-medium ${isExpired ? 'text-rose-400' : isExpiringSoon ? 'text-amber-400' : 'text-slate-400'}`}>
                        {item.expiry ? new Date(item.expiry).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        isExpired ? 'badge-rose' :
                        isExpiringSoon ? 'badge-amber' :
                        item.quantity <= item.min_threshold ? 'badge-amber' : 'badge-emerald'
                      }`}>
                        {isExpired ? 'Expired' : 
                         isExpiringSoon ? 'Expiring Soon' :
                         item.quantity <= item.min_threshold ? 'Low Stock' : 'Optimal'}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Details"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onUpdateStock(item.id, 'addition', 10)}
                          className="p-2 text-emerald-500 hover:bg-emerald-900/20 rounded-lg transition-colors" 
                          title="Restock (+10)"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => onUpdateStock(item.id, 'usage', 1)}
                          className="p-2 text-blue-500 hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Dispense (-1)"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500 italic">
                    No medicines found matching the current filter.
                  </td>
                </tr>
              )}
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
                  <div className={`w-10 h-10 ${editingItem ? 'bg-blue-900/30 text-blue-400' : 'bg-emerald-900/30 text-emerald-400'} rounded-xl flex items-center justify-center`}>
                    {editingItem ? <Edit2 size={24} /> : <Plus size={24} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{editingItem ? 'Edit Medicine' : 'Register Drug'}</h3>
                    <p className="text-xs text-slate-400">{editingItem ? 'Update existing inventory details' : 'Add new medicine to inventory'}</p>
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
                      {editingItem ? 'Current Qty' : 'Initial Qty'}
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      className="input-field font-black"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                      disabled={editingItem} // Quantity should be updated via transactions, not direct edit usually, but I'll allow it if needed. Actually, let's disable it for edit to keep transaction history clean.
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
                    className={`w-full py-4 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all ${editingItem ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'btn-primary'}`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {editingItem ? <Edit2 size={20} /> : <Plus size={20} />}
                        <span>{editingItem ? 'Update Details' : 'Register Medicine'}</span>
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
