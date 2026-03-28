import React, { useContext } from 'react';
import { MedicinesContext } from '../context/MedicinesContext';

const MedicineList = ({ onEdit }) => {
  const { medicines, deleteMedicine } = useContext(MedicinesContext);

  return (
    <table className="medicine-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Threshold</th>
          <th>Supplier</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map(m => (
          <tr key={m.id}>
            <td>{m.name}</td>
            <td>{m.description}</td>
            <td>{m.quantity}</td>
            <td>{m.threshold}</td>
            <td>{m.supplierName}</td>
            <td>
              <button onClick={() => onEdit(m)}>Edit</button>
              <button onClick={() => deleteMedicine(m.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicineList;