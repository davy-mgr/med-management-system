import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function SignupPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [error, setError] = useState('');

	const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await API.post('/auth/signup', form);
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'Signup failed');
		}
	};

	return (
		<div>
			<h2>Signup</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
				<input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
				<input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
				<button type="submit">Signup</button>
			</form>
		</div>
	);
}
