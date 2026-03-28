import { useContext } from 'react';
import { MedicinesContext } from '../context/MedicinesContext';

export default function InventoryPage() {
  const { medicines } = useContext(MedicinesContext);
  return (
    <div className="container">
      <h2>Inventory</h2>
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No medicines in inventory.</td></tr>
          ) : (
            medicines.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.description}</td>
                <td>{m.quantity}</td>
                <td>{m.supplierName || m.supplierId}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}