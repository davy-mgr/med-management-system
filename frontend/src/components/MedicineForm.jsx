import { useState, useEffect } from 'react';

export default function MedicineForm({ onSave, editingMedicine, onCancel }) {
  const [medicine, setMedicine] = useState({ name: '', description: '', quantity: 0 });

  useEffect(() => {
    if (editingMedicine) setMedicine(editingMedicine);
  }, [editingMedicine]);

  const handleChange = e => setMedicine({ ...medicine, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(medicine);
    setMedicine({ name: '', description: '', quantity: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={medicine.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={medicine.description} onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" value={medicine.quantity} onChange={handleChange} />
      <button type="submit">{editingMedicine ? 'Update' : 'Add'}</button>
      {editingMedicine && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}