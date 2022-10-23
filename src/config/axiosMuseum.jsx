import axios from 'axios';
const axiosMuseum = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});
axiosMuseum.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'x-token': localStorage.getItem('token-museum'),
  };
  return config;
});
export default axiosMuseum;
