import React, { useState, useEffect } from 'react';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } from '../api/transactionApi';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ medicine_id: '', type: '', quantity: 0 });

  const loadTransactions = async () => setTransactions(await fetchTransactions());

  useEffect(() => { loadTransactions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, formData);
      setEditingTransaction(null);
    } else {
      await addTransaction(formData);
    }
    setFormData({ medicine_id: '', type: '', quantity: 0 });
    loadTransactions();
  };

  const handleEdit = (txn) => {
    setEditingTransaction(txn);
    setFormData(txn);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      await deleteTransaction(id);
      loadTransactions();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Transactions</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input placeholder="Medicine ID" value={formData.medicine_id} onChange={e => setFormData({ ...formData, medicine_id: e.target.value })} required />
        <input placeholder="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required />
        <input type="number" placeholder="Quantity" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })} required />
        <button type="submit">{editingTransaction ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>{t.medicine_id} - {t.type} - {t.quantity} 
            <button onClick={() => handleEdit(t)}>Edit</button> 
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;