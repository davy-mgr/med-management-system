// src/context/TransactionsContext.jsx
import React, { createContext, useState } from 'react';
import api from '../api/axios';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      await api.post('/transactions', transaction);
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const updateTransaction = async (id, transaction) => {
    try {
      await api.put(`/transactions/${id}`, transaction);
    } catch (err) {
      console.error('Error updating transaction:', err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};