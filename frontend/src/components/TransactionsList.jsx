import React from 'react';

const TransactionsList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) return <p>No transactions yet.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Medicine</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.id} style={{ borderBottom: '1px solid #ccc' }}>
            <td>{tx.Medicine?.name || 'N/A'}</td>
            <td>{tx.transaction_type}</td>
            <td>{tx.quantity}</td>
            <td>{tx.note || '-'}</td>
            <td>{new Date(tx.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsList;