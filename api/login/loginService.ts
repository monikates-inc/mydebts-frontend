// src/services/userService.ts

import {loginUser} from "./loginApi";

export const handleLogin = async (userData: {
    email: string;
    password: string;
}) => {
    try {
        const response = await loginUser(userData);
        return response;
    } catch (error: any) {
        if (error.response) {
            console.error('Error de API:', error.response.data);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error de red:', error.message);
            throw new Error('No se pudo conectar al servidor');
        }
    }
};
