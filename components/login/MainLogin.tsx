import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, HelperText, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import { handleLogin } from '../../api/login/loginService';
import { useAuthContext } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';

type Props = {
    navigation: any;
};

type FieldErrors = {
    email?: string;
    password?: string;
    general?: string;
};

const EMAIL_REGEX = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/i;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { toggleTheme } = useThemeContext();
    const { colors } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});

    const { login } = useAuthContext();

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setErrors(prev => ({ ...prev, password: undefined, general: undefined }));
    };

    const validateFields = () => {
        const newErrors: FieldErrors = {};
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            newErrors.email = 'Ingresa tu correo electrónico';
        } else if (!EMAIL_REGEX.test(trimmedEmail)) {
            newErrors.email = 'Ingresa un correo válido';
        }

        if (!password) {
            newErrors.password = 'Ingresa tu contraseña';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(prev => ({ ...prev, ...newErrors }));
            return false;
        }

        setErrors(prev => ({ ...prev, email: undefined, password: undefined }));
        return true;
    };

    const handleNavigateHome = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            setLoading(true);
            setErrors(prev => ({ ...prev, general: undefined }));
            const normalizedEmail = email.trim().toLowerCase();
            const result = await handleLogin({ email: normalizedEmail, password });
            await login(result.token);
            navigation.replace('Home');
        } catch (error: any) {
            const message = error?.message ?? 'No se pudo conectar al servidor';
            setErrors(prev => ({ ...prev, general: message }));
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateRegister = () => {
        navigation.navigate('Register');
    };

    const surface = colors.surface ?? '#FFFFFF';
    const outline = colors.outline ?? '#D1D5DB';

    const textFieldTheme = {
        roundness: 12,
        colors: {
            background: surface,
            surface,
            outline,
        },
    } as const;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                            <IconButton
                                icon="theme-light-dark"
                                size={26}
                                onPress={toggleTheme}
                                accessibilityLabel="Cambiar tema"
                            />
                        </View>

                        <Text variant="headlineSmall" style={{ fontWeight: '600', marginBottom: 6, color: colors.onBackground }}>
                            Inicia sesión
                        </Text>
                        <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant, marginBottom: 20 }}>
                            Ingresa tus credenciales para continuar.
                        </Text>

                        <Text variant="labelLarge" style={{ marginBottom: 4, color: colors.onBackground }}>
                            Correo electrónico *
                        </Text>
                        <TextInput
                            value={email}
                            onChangeText={handleEmailChange}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            dense
                            error={!!errors.email}
                            style={{ borderRadius: 12, backgroundColor: surface, marginBottom: 2 }}
                            theme={textFieldTheme}
                        />
                        <HelperText type="error" visible={!!errors.email}>
                            {errors.email}
                        </HelperText>

                        <Text variant="labelLarge" style={{ marginTop: 10, marginBottom: 4, color: colors.onBackground }}>
                            Contraseña *
                        </Text>
                        <TextInput
                            value={password}
                            onChangeText={handlePasswordChange}
                            mode="outlined"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            dense
                            error={!!errors.password}
                            style={{ borderRadius: 12, backgroundColor: surface, marginBottom: 2 }}
                            theme={textFieldTheme}
                            right={
                                <TextInput.Icon
                                    icon={showPassword ? 'eye-off' : 'eye'}
                                    onPress={() => setShowPassword(prev => !prev)}
                                />
                            }
                        />
                        <HelperText type="error" visible={!!errors.password}>
                            {errors.password}
                        </HelperText>

                        {!!errors.general && (
                            <HelperText type="error" visible={!!errors.general} style={{ marginTop: 6 }}>
                                {errors.general}
                            </HelperText>
                        )}

                        <Button
                            mode="contained"
                            buttonColor="#EEF2F6"
                            textColor="#4B5563"
                            style={{ marginTop: 24, borderRadius: 16 }}
                            contentStyle={{ paddingVertical: 10 }}
                            onPress={handleNavigateHome}
                            disabled={loading}
                            labelStyle={{ fontWeight: '600', letterSpacing: 0.2 }}
                        >
                            Inicia sesión
                        </Button>

                        <Button
                            mode="text"
                            textColor={colors.primary ?? '#2563EB'}
                            onPress={handleNavigateRegister}
                            style={{ marginTop: 10 }}
                            labelStyle={{ fontWeight: '600' }}
                        >
                            ¿No tienes cuenta? Regístrate
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Spinner visible={loading} textContent="Cargando..." textStyle={{ color: '#FFFFFF' }} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default LoginScreen;
