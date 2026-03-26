import api from './axios';

export const fetchSuppliers = async () => {
  const { data } = await api.get('/suppliers');
  return data;
};

export const addSupplier = async (supplier) => {
  const { data } = await api.post('/suppliers', supplier);
  return data;
};

export const updateSupplier = async (id, supplier) => {
  const { data } = await api.patch(`/suppliers/${id}`, supplier);
  return data;
};

export const deleteSupplier = async (id) => {
  const { data } = await api.delete(`/suppliers/${id}`);
  return data;
};