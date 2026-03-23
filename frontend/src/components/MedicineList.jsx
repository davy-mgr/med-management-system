import React from 'react';

const MedicineList = ({ medicines, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Supplier</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map((med) => (
          <tr key={med.id} style={{ backgroundColor: med.quantity < 5 ? '#ffe0e0' : 'transparent' }}>
            <td>{med.name}</td>
            <td>{med.description}</td>
            <td>{med.quantity}</td>
            <td>{med.Supplier?.name || '-'}</td>
            <td>
              <button onClick={() => onEdit(med)}>Edit</button>
              <button onClick={() => onDelete(med.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicineList;