import React, {createContext, useState, useEffect, ReactNode, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    token: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
        };
        loadToken();
    }, []);

    const login = async (newToken: string) => {
        await AsyncStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};
export const useAuthContext = () => useContext(AuthContext);
