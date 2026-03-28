import React, { useContext } from 'react';
import { SuppliersContext } from '../context/SuppliersContext';

export default function SuppliersPage() {
  const { suppliers } = useContext(SuppliersContext);
  return (
    <div className="container">
      <h2>Suppliers</h2>
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No suppliers found.</td></tr>
          ) : (
            suppliers.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.contact_email}</td>
                <td>{s.phone_number}</td>
                <td>{s.address}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}