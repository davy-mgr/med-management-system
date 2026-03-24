import axios from 'axios';
const API_URL = 'http://localhost:5000/suppliers';

export const fetchSuppliers = async () => (await axios.get(API_URL)).data;
export const addSupplier = async (supplier) => (await axios.post(API_URL, supplier)).data;
export const updateSupplier = async (id, supplier) => (await axios.patch(`${API_URL}/${id}`, supplier)).data;
export const deleteSupplier = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;