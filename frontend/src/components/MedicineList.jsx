// src/components/MedicineList.jsx
import React from 'react';
import '../styles.css'; 

const MedicineList = ({ medicines, onEdit, onDelete }) => {
  if (!medicines || medicines.length === 0) return <p>No medicines in inventory.</p>;

  return (
    <div className="container">
      <h2>Medicine Inventory</h2>
      {medicines.map((med) => {
        const isLowStock = med.quantity <= (med.threshold ?? 5); // fallback threshold
        return (
          <div
            key={med.id}
            className={`medicine-item ${isLowStock ? 'low-stock' : ''}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              backgroundColor: isLowStock ? '#ffe6e6' : '#f9f9f9',
              color: isLowStock ? '#a00' : '#000',
              fontWeight: isLowStock ? 'bold' : 'normal'
            }}
          >
            <div>
              <strong>{med.name}</strong> ({med.quantity} units)
              {isLowStock && <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>LOW STOCK!</span>}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => onEdit(med)}>Edit</button>
              {onDelete && <button onClick={() => onDelete(med.id)}>Delete</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MedicineList;