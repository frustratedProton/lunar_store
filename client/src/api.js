import axios from 'axios';

// This automatically picks the right URL:
// - Local: http://localhost:3000
// - Render: https://lunar-store-api.onrender.com (or whatever the heck)
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
	withCredentials: true,
});

export default api;
