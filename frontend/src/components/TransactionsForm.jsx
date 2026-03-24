import React, { useState, useEffect } from 'react';
import { fetchMedicines } from '../api/medicineApi';

const TransactionsForm = ({ onSave }) => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ medicine_id: '', quantity_change: 0, type: 'in', note: '' });

  useEffect(() => {
    const loadMedicines = async () => {
      const data = await fetchMedicines();
      setMedicines(data);
    };
    loadMedicines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantity_change' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.medicine_id || !form.quantity_change || !form.type) {
      return alert('Please fill all required fields!');
    }
    onSave(form);
    setForm({ medicine_id: '', quantity_change: 0, type: 'in', note: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
      <select name="medicine_id" value={form.medicine_id} onChange={handleChange} required>
        <option value="">Select Medicine</option>
        {medicines.map(m => (
          <option key={m.id} value={m.id}>{m.name} ({m.quantity} units)</option>
        ))}
      </select>

      <input
        type="number"
        name="quantity_change"
        value={form.quantity_change}
        onChange={handleChange}
        placeholder="Quantity"
        min="1"
        required
      />

      <select name="type" value={form.type} onChange={handleChange} required>
        <option value="in">Stock In</option>
        <option value="out">Stock Out</option>
      </select>

      <input
        type="text"
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Note (optional)"
      />

      <button type="submit">Log Transaction</button>
    </form>
  );
};

export default TransactionsForm;