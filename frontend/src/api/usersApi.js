import api from './axios';

export const loginUser = async (email, password) => {
  const { data } = await api.post('/users/login', { email, password });
  return data;
};

export const registerUser = async (user) => {
  const { data } = await api.post('/users/register', user);
  return data;
};