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
    if (!res.ok) {
      try {
        throw await res.json();
      } catch {
        throw { error: `Server error: ${res.status} ${res.statusText}` };
      }
    }
    return res.json();
  },
  async post(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      try {
        throw await res.json();
      } catch {
        throw { error: `Server error: ${res.status} ${res.statusText}` };
      }
    }
    return res.json();
  },
  async patch(url, body) {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      try {
        throw await res.json();
      } catch {
        throw { error: `Server error: ${res.status} ${res.statusText}` };
      }
    }
    return res.json();
  }
};
