import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
    DefaultTheme as PaperDefaultTheme,
    MD3DarkTheme as PaperDarkTheme,
    Provider as PaperProvider
} from 'react-native-paper';

const CombinedDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
    },
};

const CombinedDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
    },
};

type ThemeContextType = {
    toggleTheme: () => void;
    isDarkTheme: boolean;
    theme: typeof CombinedDefaultTheme | typeof CombinedDarkTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeContext debe usarse dentro de ThemeProvider');
    return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => setIsDarkTheme(prev => !prev);
    const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    );
};
