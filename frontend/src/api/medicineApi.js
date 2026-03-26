import api from './axios';

export const fetchMedicines = async () => {
  const { data } = await api.get('/medicines');
  return data;
};

export const addMedicine = async (medicine) => {
  const { data } = await api.post('/medicines', medicine);
  return data;
};

export const updateMedicine = async (id, medicine) => {
  const { data } = await api.put(`/medicines/${id}`, medicine);
  return data;
};

export const deleteMedicine = async (id) => {
  const { data } = await api.delete(`/medicines/${id}`);
  return data;
};