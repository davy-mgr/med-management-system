// src/components/MedicineForm.jsx
import React, { useState, useEffect } from 'react';
import '../styles.css';
import axios from 'axios';

const MedicineForm = ({ onSave, editingMedicine, onCancel }) => {
  const [medicine, setMedicine] = useState({
    name: '',
    description: '',
    quantity: 0,
    supplierId: '',
    threshold: 5
  });

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (editingMedicine) {
      setMedicine({
        ...editingMedicine,
        quantity: Number(editingMedicine.quantity),
        threshold: Number(editingMedicine.threshold) || 5
      });
    }

    axios.get('http://localhost:5000/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error('Error fetching suppliers:', err));
  }, [editingMedicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'threshold' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!medicine.name || !medicine.quantity || !medicine.supplierId) {
      return alert('Please fill in all required fields!');
    }

    if (medicine.threshold > medicine.quantity) {
      alert('Warning: threshold is higher than current stock!');
    }

    onSave(medicine);

    setMedicine({ name: '', description: '', quantity: 0, supplierId: '', threshold: 5 });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>

      <input
        name="name"
        value={medicine.name}
        onChange={handleChange}
        placeholder="Medicine Name"
        required
      />

      <input
        name="description"
        value={medicine.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        name="quantity"
        type="number"
        min="0"
        value={medicine.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />

      <input
        name="threshold"
        type="number"
        min="0"
        value={medicine.threshold}
        onChange={handleChange}
        placeholder="Low-stock Threshold"
        required
      />

      <select name="supplierId" value={medicine.supplierId} onChange={handleChange} required>
        <option value="">Select Supplier</option>
        {suppliers.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit">{editingMedicine ? 'Update' : 'Add'}</button>
        {editingMedicine && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default MedicineForm;