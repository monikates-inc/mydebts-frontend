// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import AppNavigator from "./navigator/AppNavigator";

const Root = () => {
    const { theme, isDarkTheme } = useThemeContext();

    return (
        <NavigationContainer theme={theme as any}>
            <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
            <AppNavigator />
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Root />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
