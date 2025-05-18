import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Text, IconButton, TextInput, Button} from 'react-native-paper';

type Props = {
    toggleTheme: () => void;
    navigation: any;
};

const LoginScreen: React.FC<Props> = ({toggleTheme, navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleNavigateHome = () => {
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* Barra superior con padding pequeño */}
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <IconButton icon="theme-light-dark" size={30} onPress={toggleTheme}/>
            </View>

            {/* Contenido centrado */}
            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                <Text variant="headlineMedium" style={{ marginBottom: 20}}>
                    Bienvenido a la App
                </Text>

                <TextInput
                    label="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={{width: '100%', marginBottom: 16}}
                />
                <TextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    style={{width: '100%',}}
                    right={<TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                    }
                />
                <Button
                    mode={'contained'}
                    style={{marginTop: 20}}
                    onPress={() => handleNavigateHome()}
                >
                    Iniciar Sesion

                </Button>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
