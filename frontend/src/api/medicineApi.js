import api from './axios';

export const fetchMedicines = async () => {
  const res = await api.get('/medicines');
  return res.data;
};

export const addMedicine = async (medicine) => {
  const res = await api.post('/medicines', medicine);
  return res.data;
};

export const updateMedicine = async (id, medicine) => {
  const res = await api.put(`/medicines/${id}`, medicine);
  return res.data;
};

export const deleteMedicine = async (id) => {
  const res = await api.delete(`/medicines/${id}`);
  return res.data;
};