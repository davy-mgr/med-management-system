import axios from 'axios';
const API_URL = 'http://localhost:5000/transactions';

export const logTransaction = async (transaction, token) => {
  const res = await axios.post(API_URL, transaction, { headers: { Authorization: token } });
  return res.data;
};

export const fetchTransactions = async (medicine_id, token) => {
  const res = await axios.get(`${API_URL}?medicine_id=${medicine_id}`, { headers: { Authorization: token } });
  return res.data;
};