import React, { useContext, useState } from 'react';
import { SuppliersContext } from '../context/SuppliersContext';

const SuppliersPage = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useContext(SuppliersContext);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', contact_email: '', phone_number: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateSupplier(editing.id, form);
      setEditing(null);
    } else {
      await addSupplier(form);
    }
    setForm({ name: '', contact_email: '', phone_number: '', address: '' });
  };

  const handleEdit = (s) => {
    setEditing(s);
    setForm(s);
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
        <input placeholder="Email" value={form.contact_email} onChange={e => setForm({...form, contact_email:e.target.value})} />
        <input placeholder="Phone" value={form.phone_number} onChange={e => setForm({...form, phone_number:e.target.value})} />
        <input placeholder="Address" value={form.address} onChange={e => setForm({...form, address:e.target.value})} />
        <div className="form-actions">
          <button type="submit">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </form>

      <ul>
        {suppliers.map(s => (
          <li key={s.id}>
            {s.name} ({s.contact_email}) 
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => deleteSupplier(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuppliersPage;