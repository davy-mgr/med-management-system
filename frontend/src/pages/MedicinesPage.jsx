import { useState, useEffect } from 'react';
import API from '../api/axios';
import MedicineForm from '../components/MedicineForm';

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadMedicines = async () => {
    try {
      const res = await API.get('/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadMedicines(); }, []);

  const handleSave = async med => {
    try {
      if (editing) {
        await API.put(`/medicines/${editing.id}`, med);
      } else {
        await API.post('/medicines', med);
      }
      setEditing(null);
      loadMedicines();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this medicine?')) return;
    try { await API.delete(`/medicines/${id}`); loadMedicines(); } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Medicines</h2>
      <MedicineForm onSave={handleSave} editingMedicine={editing} onCancel={() => setEditing(null)} />
      <ul>
        {medicines.map(m => (
          <li key={m.id}>
            {m.name} ({m.quantity})
            <button style={{ marginLeft: 8, marginRight: 4 }} onClick={() => setEditing(m)}>Edit</button>
            <button style={{ marginLeft: 4 }} onClick={() => handleDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}