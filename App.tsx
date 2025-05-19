import React, { useState } from 'react';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    MD3DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { StatusBar } from 'react-native';
import HomeScreen from "./screens/home/HomeScreen";
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from './screens/register/RegisterScreen';

// Combina los temas de react-navigation y react-native-paper
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

const Stack = createNativeStackNavigator();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme as any}>
                <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        children={(props) => <LoginScreen {...props} toggleTheme={toggleTheme} />}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        children={(props) => <HomeScreen {...props} toggleTheme={toggleTheme} />}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        children={(props) => <RegisterScreen {...props} toggleTheme={toggleTheme} />}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
