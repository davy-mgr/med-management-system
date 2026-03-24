import React, { createContext, useState, useEffect } from 'react';
import { fetchMedicines } from '../api/medicineApi';

export const MedicinesContext = createContext();

export const MedicinesProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  const loadMedicines = async () => {
    const data = await fetchMedicines();
    setMedicines(data);
  };

  useEffect(() => { loadMedicines(); }, []);

  return (
    <MedicinesContext.Provider value={{ medicines, setMedicines, loadMedicines }}>
      {children}
    </MedicinesContext.Provider>
  );
};