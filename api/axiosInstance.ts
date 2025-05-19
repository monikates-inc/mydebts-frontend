// src/api/axiosInstance.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mydebts-backend.onrender.com/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});



export default api;
