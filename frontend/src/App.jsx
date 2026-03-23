import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicinesPage from './pages/MedicinesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/medicines" element={<MedicinesPage />} />
      </Routes>
    </Router>
  );
}

export default App;