import React, { useState, useEffect } from 'react';
import MedicineForm from '../components/MedicineForm';
import MedicineList from '../components/MedicineList';
import { fetchMedicines, addMedicine, updateMedicine, deleteMedicine } from '../api/medicineApi';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const loadMedicines = async () => {
    const data = await fetchMedicines();
    setMedicines(data);
  };

  useEffect(() => { loadMedicines(); }, []);

  const handleSave = async (medicine) => {
    if (editingMedicine) {
      await updateMedicine(editingMedicine.id, medicine);
      setEditingMedicine(null);
    } else {
      await addMedicine(medicine);
    }
    loadMedicines();
  };

  const handleEdit = (medicine) => setEditingMedicine(medicine);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this medicine?')) {
      await deleteMedicine(id);
      loadMedicines();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Medicines</h1>
      <MedicineForm onSave={handleSave} editingMedicine={editingMedicine} onCancel={() => setEditingMedicine(null)} />
      <MedicineList medicines={medicines} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default MedicinesPage;