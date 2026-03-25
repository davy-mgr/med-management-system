import api from './axios';

export const fetchTransactions = async () => {
  const res = await api.get('/transactions');
  return res.data;
};

export const addTransaction = async (transaction) => {
  const res = await api.post('/transactions', transaction);
  return res.data;
};

export const updateTransaction = async (id, transaction) => {
  const res = await api.put(`/transactions/${id}`, transaction);
  return res.data;
};

export const deleteTransaction = async (id) => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};