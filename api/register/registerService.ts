import {registerUser} from "./registerApi";

export const handleRegisterApi = async (userData: {
    name: string;
    lastname: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await registerUser(userData);
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