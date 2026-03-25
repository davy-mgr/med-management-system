// src/components/MedicineForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { MedicinesContext } from '../context/MedicinesContext';
import { SuppliersContext } from '../context/SuppliersContext';

const MedicineForm = ({ editingMedicine, onCancel }) => {
  const { addMedicine, updateMedicine } = useContext(MedicinesContext);
  const { suppliers } = useContext(SuppliersContext);

  const [medicine, setMedicine] = useState({
    name: '',
    description: '',
    quantity: 0,
    threshold: 5,
    supplierId: ''
  });

  useEffect(() => {
    if (editingMedicine) {
      setMedicine({
        ...editingMedicine,
        quantity: Number(editingMedicine.quantity),
        threshold: Number(editingMedicine.threshold) || 5
      });
    }
  }, [editingMedicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'threshold' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!medicine.name || !medicine.quantity || !medicine.supplierId) {
      return alert('Please fill all required fields.');
    }

    if (medicine.threshold > medicine.quantity) {
      alert('Warning: threshold is higher than current stock!');
    }

    if (editingMedicine) await updateMedicine(editingMedicine.id, medicine);
    else await addMedicine(medicine);

    setMedicine({ name: '', description: '', quantity: 0, threshold: 5, supplierId: '' });
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{editingMedicine ? 'Edit Medicine' : 'Add Medicine'}</h3>

      <input name="name" placeholder="Medicine Name" value={medicine.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={medicine.description} onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" value={medicine.quantity} onChange={handleChange} required />
      <input name="threshold" type="number" placeholder="Low-stock Threshold" value={medicine.threshold} onChange={handleChange} required />

      <select name="supplierId" value={medicine.supplierId} onChange={handleChange} required>
        <option value="">Select Supplier</option>
        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <div className="form-actions">
        <button type="submit">{editingMedicine ? 'Update' : 'Add'}</button>
        {editingMedicine && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default MedicineForm;