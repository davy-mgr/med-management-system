// src/context/MedicinesContext.jsx
import React, { createContext, useState } from 'react';
import api from '../api/axios';

export const MedicinesContext = createContext();


export const MedicinesProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    try {
      const res = await api.get('/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    }
  };

  // Fetch medicines on mount
  React.useEffect(() => {
    fetchMedicines();
  }, []);

  const addMedicine = async (medicine) => {
    try {
      await api.post('/medicines', medicine);
    } catch (err) {
      console.error('Error adding medicine:', err);
    }
  };

  const updateMedicine = async (id, medicine) => {
    try {
      await api.put(`/medicines/${id}`, medicine);
    } catch (err) {
      console.error('Error updating medicine:', err);
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await api.delete(`/medicines/${id}`);
    } catch (err) {
      console.error('Error deleting medicine:', err);
    }
  };

  return (
    <MedicinesContext.Provider
      value={{ medicines, fetchMedicines, addMedicine, updateMedicine, deleteMedicine }}
    >
      {children}
    </MedicinesContext.Provider>
  );
};