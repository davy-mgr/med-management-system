import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark-mode') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    localStorage.setItem('dark-mode', dark);
  }, [dark]);

  return (
    <button className="dark-toggle" onClick={() => setDark(d => !d)}>
      {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
