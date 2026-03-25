// src/components/TransactionList.jsx
import React, { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { MedicinesContext } from '../context/MedicinesContext';

const TransactionList = () => {
  const { transactions } = useContext(TransactionsContext);
  const { medicines } = useContext(MedicinesContext);

  const getMedicineName = id => medicines.find(m => m.id === id)?.name || 'Unknown';

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {getMedicineName(t.medicineId)} - {t.type} - {t.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;