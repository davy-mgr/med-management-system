import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineForm = ({ onSave, editingMedicine, onCancel }) => {
  const [medicine, setMedicine] = useState({
    name: '',
    description: '',
    quantity: 0,
    supplierId: ''
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (editingMedicine) setMedicine(editingMedicine);

    // fetch suppliers
    axios.get('http://localhost:5000/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error(err));
  }, [editingMedicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicine.name || !medicine.quantity || !medicine.supplierId) return alert('All fields required!');
    onSave(medicine);
    setMedicine({ name: '', description: '', quantity: 0, supplierId: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={medicine.name}
        onChange={handleChange}
        placeholder="Medicine Name"
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
        value={medicine.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <select name="supplierId" value={medicine.supplierId} onChange={handleChange}>
        <option value="">Select Supplier</option>
        {suppliers.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <button type="submit">{editingMedicine ? 'Update' : 'Add'}</button>
      {editingMedicine && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default MedicineForm;