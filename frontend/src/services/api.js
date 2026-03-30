const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  async get(url) {
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  async post(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  async patch(url, body) {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    if (!res.ok) throw await res.json();
    return res.json();
  }
};
