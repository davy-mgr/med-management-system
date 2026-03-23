import React, { useState, useEffect } from 'react';
import MedicineList from '../components/MedicineList';
import MedicineForm from '../components/MedicineForm';
import { fetchMedicines, addMedicine, updateMedicine, deleteMedicine } from '../api/medicineApi';

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
    if (editingMedicine) {
      await updateMedicine(editingMedicine.id, med);
      setEditingMedicine(null);
    } else {
      await addMedicine(med);
    }
    loadMedicines();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteMedicine(id);
      loadMedicines();
    }
  };

  return (
    <div>
      <h1>Medicines Inventory</h1>
      <MedicineForm
        onSave={handleSave}
        editingMedicine={editingMedicine}
        onCancel={() => setEditingMedicine(null)}
      />
      <MedicineList
        medicines={medicines}
        onEdit={setEditingMedicine}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MedicinesPage;