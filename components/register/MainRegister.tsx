import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {IconButton, TextInput, Button, Text} from 'react-native-paper';

type Props = {
    toggleTheme: () => void;
    navigation: any;
};

const RegisterScreen: React.FC<Props> = ({toggleTheme, navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRpassword, setShowRpassword] = useState(false);
    const [names,setNames] = useState('');
    const [Lnames, setLnames] = useState('');
    const [run,setRun] = useState('');

    const handleNavigateLogin = () => {
        navigation.navigate('Login')
    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style ={{ flex: 0.5, justifyContent: 'flex-start',alignItems:'flex-start', paddingHorizontal:20 }}> 
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <IconButton icon="theme-light-dark" size={30} onPress={toggleTheme}/>
                </View>
                
                <Text variant ="headlineMedium" style = {{marginBottom:20}}>
                    Registro
                </Text>
                 
                <TextInput
                    label="Nombres"
                    value={names}
                    onChangeText={setNames}
                    mode="outlined"
                    style={{width: '100%', marginBottom: 16}}
                />
                <TextInput
                    label="Apellidos"
                    value={Lnames}
                    onChangeText={(setLnames)}
                    mode="outlined"
                    style={{width: '100%', marginBottom:16}}
                />
                <TextInput
                    label="Run"
                    value={run}
                    onChangeText={(setRun)}
                    mode="outlined"
                    style={{width: '100%', marginBottom:16}}
                />
                <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={(setEmail)}
                    mode="outlined"
                    style={{width: '100%', marginBottom:16}}
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
                <TextInput
                    label="Repetir Contraseña"
                    value={rpassword}
                    onChangeText={setRpassword}
                    mode="outlined"
                    secureTextEntry={!showRpassword}
                    style={{width: '100%',}}
                    right={<TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowRpassword(!showRpassword)}
                    />
                    }
                />                               
                <Button
                    mode={"contained"}
                    style={{marginTop: 20}}
                    onPress={() => handleNavigateLogin()}
                >
                    Registrarse
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
