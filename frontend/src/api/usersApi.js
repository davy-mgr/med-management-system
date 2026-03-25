import api from './axios';

export const loginUser = async (email, password) => {
  const res = await api.post('/users/login', { email, password });
  return res.data;
};

export const registerUser = async (user) => {
  const res = await api.post('/users/register', user);
  return res.data;
};