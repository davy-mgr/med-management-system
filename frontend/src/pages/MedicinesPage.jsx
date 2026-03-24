// src/pages/MedicinesPage.jsx
import React, { useState, useEffect } from 'react';
import MedicineForm from '../components/MedicineForm';
import MedicineList from '../components/MedicineList';
import { fetchMedicines, addMedicine, updateMedicine, deleteMedicine } from '../api/medicineApi';
import '../styles.css';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const loadMedicines = async () => {
    const data = await fetchMedicines();
    setMedicines(data);
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const handleSave = async (med) => {
  const payload = { ...med, supplier_id: med.supplierId };
  delete payload.supplierId;

  if (editingMedicine) {
    await updateMedicine(editingMedicine.id, payload);
    setEditingMedicine(null);
  } else {
    await addMedicine(payload);
  }
  loadMedicines();
};    

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteMedicine(id);
      loadMedicines();
    }
  };

  const lowStockMedicines = medicines.filter(m => m.isLowStock);

  return (
    <div className="container">
      <h1>Medicines Inventory</h1>

      {lowStockMedicines.length > 0 && (
        <div className="low-stock" style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          ⚠️ {lowStockMedicines.length} medicine(s) are low in stock!
        </div>
      )}

      <MedicineForm
        onSave={handleSave}
        editingMedicine={editingMedicine}
        onCancel={() => setEditingMedicine(null)}
      />

      <hr />

      <MedicineList
        medicines={medicines}
        onEdit={setEditingMedicine}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MedicinesPage;