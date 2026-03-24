import axios from 'axios';
const API_URL = 'http://localhost:5000/medicines';

export const fetchMedicines = async () => (await axios.get(`${API_URL}/stock-status`)).data;

export const addMedicine = async (medicine) => {
  // map supplierId to supplier_id
  const payload = {
    ...medicine,
    supplier_id: medicine.supplierId
  };
  delete payload.supplierId;

  const res = await axios.post(API_URL, payload);
  return res.data;
};  


export const updateMedicine = async (id, medicine) => {
  const payload = {
    ...medicine,
    supplier_id: medicine.supplierId
  };
  delete payload.supplierId;

  const res = await axios.put(`${API_URL}/${id}`, payload);
  return res.data;
};

export const deleteMedicine = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;