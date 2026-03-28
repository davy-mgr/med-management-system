import React, { createContext, useState } from 'react';
import api from '../api/axios';

export const SuppliersContext = createContext();


export const SuppliersProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const res = await api.get('/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
  };

    React.useEffect(() => {
    fetchSuppliers();
  }, []);

  const addSupplier = async (supplier) => {
    try {
      await api.post('/suppliers', supplier);
    } catch (err) {
      console.error('Error adding supplier:', err);
    }
  };

  const updateSupplier = async (id, supplier) => {
    try {
      await api.put(`/suppliers/${id}`, supplier);
    } catch (err) {
      console.error('Error updating supplier:', err);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await api.delete(`/suppliers/${id}`);
    } catch (err) {
      console.error('Error deleting supplier:', err);
    }
  };

  return (
    <SuppliersContext.Provider
      value={{ suppliers, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier }}
    >
      {children}
    </SuppliersContext.Provider>
  );
};