import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Text, IconButton, TextInput, Button} from 'react-native-paper';
import {handleLogin} from "../../api/login/loginService";
import Spinner from "react-native-loading-spinner-overlay";

type Props = {
    toggleTheme: () => void;
    navigation: any;
};

const LoginScreen: React.FC<Props> = ({toggleTheme, navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleNavigateHome = async () => {
        try {
            setLoading(true);
            const result = await handleLogin({email, password})
            console.log('usario registrado:', result);
            navigation.navigate('Home')
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleNavigateRegister= () =>{
        navigation.navigate('Register')
    }

    return (

        <SafeAreaView style={{flex: 1}}>
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: '43%',
                        left: '31%',
                        width: 150,
                        height: 150,
                        backgroundColor: '#525252',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Spinner
                        visible={loading}
                        textContent={'Cargando...'}
                        textStyle={{color: '#FFF'}}
                    />
                </View>
            )}
            {/* Barra superior con padding pequeño */}
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <IconButton icon="theme-light-dark" size={30} onPress={toggleTheme}/>
            </View>

            {/* Contenido centrado */}
            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                <Text variant="headlineMedium" style={{marginBottom: 20}}>
                    Bienvenido a la App
                </Text>

                <TextInput
                    label="Correo electronico"
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
                <View
                style={{width: '50%'}}>
                    <Button 
                    mode={'contained'}
                    style={{marginTop: 20}}
                    onPress={()=> handleNavigateRegister()}
                    >
                    Registrarse
                    </Button>
                </View>
                
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
