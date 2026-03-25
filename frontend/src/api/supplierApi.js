import api from './axios';

export const fetchSuppliers = async () => {
  const res = await api.get('/suppliers');
  return res.data;
};

export const addSupplier = async (supplier) => {
  const res = await api.post('/suppliers', supplier);
  return res.data;
};

export const updateSupplier = async (id, supplier) => {
  const res = await api.patch(`/suppliers/${id}`, supplier);
  return res.data;
};

export const deleteSupplier = async (id) => {
  const res = await api.delete(`/suppliers/${id}`);
  return res.data;
};