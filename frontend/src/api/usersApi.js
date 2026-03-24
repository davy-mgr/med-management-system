import axios from 'axios';
const API_URL = 'http://localhost:5000/users';

export const login = async (email, password) => (await axios.post(`${API_URL}/login`, { email, password })).data;
export const register = async (user) => (await axios.post(`${API_URL}/register`, user)).data;