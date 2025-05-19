// src/api/userApi.ts
import api from '../axiosInstance';

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {
    const response = await api.post('auth/login', data);
    return response.data;
};
