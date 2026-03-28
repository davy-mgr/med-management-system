import React, { useState, useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { MedicinesContext } from '../context/MedicinesContext';

const TransactionsForm = () => {
  const { addTransaction } = useContext(TransactionsContext);
  const { medicines } = useContext(MedicinesContext);

  const [formData, setFormData] = useState({
    medicineId: '',
    quantity: 0,
    type: 'sale'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.medicineId || !formData.quantity) return alert('Fill all fields');
    await addTransaction(formData);
    setFormData({ medicineId: '', quantity: 0, type: 'sale' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <select
        value={formData.medicineId}
        onChange={e => setFormData({ ...formData, medicineId: e.target.value })}
        required
      >
        <option value="">Select Medicine</option>
        {medicines.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={formData.quantity}
        onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
        placeholder="Quantity"
        required
      />
      <select
        value={formData.type}
        onChange={e => setFormData({ ...formData, type: e.target.value })}
      >
        <option value="sale">Sale</option>
        <option value="purchase">Purchase</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionsForm;