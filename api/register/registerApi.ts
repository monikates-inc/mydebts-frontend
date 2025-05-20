import api from '../axiosInstance';

interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const response = await api.post('auth/register', data);
    return response.data;
};