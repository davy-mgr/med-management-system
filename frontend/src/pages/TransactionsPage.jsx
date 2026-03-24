import React, { useState, useEffect, useContext } from 'react';
import TransactionsForm from '../components/TransactionsForm';
import TransactionsList from '../components/TransactionsList';
import { fetchTransactions, logTransaction } from '../api/transactionsApi';
import { AuthContext } from '../context/AuthContext';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const { token } = useContext(AuthContext);

  const loadTransactions = async (medicine_id = '') => {
    const data = await fetchTransactions(medicine_id, token);
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSave = async (tx) => {
    try {
      await logTransaction(tx, token);
      loadTransactions(tx.medicine_id);
    } catch (err) {
      console.error('Failed to log transaction:', err);
      alert('Error logging transaction.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stock Transactions</h1>
      <TransactionsForm onSave={handleSave} />
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;