import React, { useState, useEffect } from 'react';
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../api/supplierApi';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({ name: '', contact_email: '', phone_number: '', address: '' });

  const loadSuppliers = async () => setSuppliers(await fetchSuppliers());

  useEffect(() => { loadSuppliers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingSupplier) {
      await updateSupplier(editingSupplier.id, formData);
      setEditingSupplier(null);
    } else {
      await addSupplier(formData);
    }
    setFormData({ name: '', contact_email: '', phone_number: '', address: '' });
    loadSuppliers();
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData(supplier);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete supplier?')) {
      await deleteSupplier(id);
      loadSuppliers();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Suppliers</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        <input placeholder="Email" value={formData.contact_email} onChange={e => setFormData({ ...formData, contact_email: e.target.value })} />
        <input placeholder="Phone" value={formData.phone_number} onChange={e => setFormData({ ...formData, phone_number: e.target.value })} />
        <input placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
        <button type="submit">{editingSupplier ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {suppliers.map(s => (
          <li key={s.id}>{s.name} <button onClick={() => handleEdit(s)}>Edit</button> <button onClick={() => handleDelete(s.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default SuppliersPage;