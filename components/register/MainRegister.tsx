import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, HelperText, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { handleRegisterApi } from '../../api/register/registerService';
import { useThemeContext } from '../../context/ThemeContext';

type Props = {
  navigation: any;
};

type PasswordRequirement = 'length' | 'types' | 'lower' | 'upper' | 'number' | 'special';

const passwordRequirements: Array<{ key: PasswordRequirement; label: string; indent: boolean }> = [
  { key: 'length', label: 'Mínimo 8 caracteres', indent: false },
  { key: 'types', label: 'Al menos 3 de los siguientes tipos de caracteres:', indent: false },
  { key: 'lower', label: 'Al menos una letra minúscula (a-z)', indent: true },
  { key: 'upper', label: 'Al menos una letra mayúscula (A-Z)', indent: true },
  { key: 'number', label: 'Al menos un número (0-9)', indent: true },
  { key: 'special', label: 'Al menos un carácter especial (!@#%&*)', indent: true },
];

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { toggleTheme } = useThemeContext();
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required('Campo requerido'),
        lastName: Yup.string().required('Campo requerido'),
        email: Yup.string().email('Correo inválido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
          .required('Campo requerido'),
      }),
    [],
  );

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting } = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async formValues => {
      try {
        setLoading(true);
        const payload = {
          name: formValues.name,
          lastname: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
        };
        await handleRegisterApi(payload);
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const passwordValue = values.password ?? '';
  const hasLowercase = /[a-z]/.test(passwordValue);
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);
  const typeCount = [hasLowercase, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;

  const checklistState: Record<PasswordRequirement, boolean> = {
    length: passwordValue.length >= 8,
    types: typeCount >= 3,
    lower: hasLowercase,
    upper: hasUppercase,
    number: hasNumber,
    special: hasSpecial,
  };

  const checklistIsValid = checklistState.length && checklistState.types;
  const disableSubmit = loading || isSubmitting || !checklistIsValid;

  const borderRadius = 12;
  const outline = colors.outline ?? '#D1D5DB';
  const surface = colors.surface ?? '#FFFFFF';
  const surfaceVariant = colors.surfaceVariant ?? '#F3F4F6';
  const primary = colors.primary ?? '#2563EB';
  const onPrimary = colors.onPrimary ?? '#FFFFFF';
  const onSurfaceVariant = colors.onSurfaceVariant ?? '#5F6770';

  const textFieldTheme = {
    roundness: borderRadius,
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
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 32 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
              <IconButton
                icon="theme-light-dark"
                size={26}
                onPress={toggleTheme}
                accessibilityLabel="Cambiar tema"
              />
            </View>

            <Text variant="headlineSmall" style={{ fontWeight: '600', marginBottom: 6, color: colors.onBackground }}>
              Crea tu cuenta
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant, marginBottom: 20 }}>
              Completa la información para comenzar a usar la app.
            </Text>

            <Text variant="labelLarge" style={{ marginBottom: 4, color: colors.onBackground }}>
              Nombre *
            </Text>
            <TextInput
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              mode="outlined"
              autoCapitalize="words"
              dense
              error={touched.name && !!errors.name}
              style={{ borderRadius, backgroundColor: surface, marginBottom: 2 }}
              theme={textFieldTheme}
            />
            <HelperText type="error" visible={touched.name && !!errors.name}>
              {errors.name}
            </HelperText>

            <Text variant="labelLarge" style={{ marginTop: 10, marginBottom: 4, color: colors.onBackground }}>
              Apellido *
            </Text>
            <TextInput
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              mode="outlined"
              autoCapitalize="words"
              dense
              error={touched.lastName && !!errors.lastName}
              style={{ borderRadius, backgroundColor: surface, marginBottom: 2 }}
              theme={textFieldTheme}
            />
            <HelperText type="error" visible={touched.lastName && !!errors.lastName}>
              {errors.lastName}
            </HelperText>

            <Text variant="labelLarge" style={{ marginTop: 10, marginBottom: 4, color: colors.onBackground }}>
              Correo electrónico *
            </Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              dense
              error={touched.email && !!errors.email}
              style={{ borderRadius, backgroundColor: surface, marginBottom: 2 }}
              theme={textFieldTheme}
            />
            <HelperText type="error" visible={touched.email && !!errors.email}>
              {errors.email}
            </HelperText>

            <Text variant="labelLarge" style={{ marginTop: 10, marginBottom: 4, color: colors.onBackground }}>
              Contraseña *
            </Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              dense
              error={touched.password && !!errors.password}
              style={{ borderRadius, backgroundColor: surface, marginBottom: 2 }}
              theme={textFieldTheme}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(prev => !prev)}
                />
              }
            />
            <HelperText type="error" visible={touched.password && !!errors.password}>
              {errors.password}
            </HelperText>

            <Text variant="labelLarge" style={{ marginTop: 10, marginBottom: 4, color: colors.onBackground }}>
              Confirmar contraseña *
            </Text>
            <TextInput
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              dense
              error={touched.confirmPassword && !!errors.confirmPassword}
              style={{ borderRadius, backgroundColor: surface, marginBottom: 2 }}
              theme={textFieldTheme}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(prev => !prev)}
                />
              }
            />
            <HelperText type="error" visible={touched.confirmPassword && !!errors.confirmPassword}>
              {errors.confirmPassword}
            </HelperText>

            <View style={{ marginTop: 16 }}>
              {passwordRequirements.map(item => (
                <View
                  key={item.label}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginLeft: item.indent ? 16 : 0 }}
                >
                  <Text
                    style={{ color: checklistState[item.key] ? '#10B981' : '#9CA3AF', fontSize: 14, width: 18 }}
                  >
                    {checklistState[item.key] ? '✓' : '○'}
                  </Text>
                  <Text
                    style={{
                      color: checklistState[item.key] ? colors.onBackground : colors.onSurfaceVariant,
                      flex: 1,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>

            <Button
              mode="contained"
              buttonColor={disableSubmit ? surfaceVariant : primary}
              textColor={disableSubmit ? onSurfaceVariant : onPrimary}
              style={{ marginTop: 24, borderRadius: 16 }}
              contentStyle={{ paddingVertical: 12 }}
              onPress={() => handleSubmit()}
              disabled={disableSubmit}
              labelStyle={{ fontWeight: '600', letterSpacing: 0.2 }}
            >
              Crear cuenta
            </Button>

            <Button
              mode="text"
              textColor={primary}
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: 10 }}
              labelStyle={{ fontWeight: '600' }}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </ScrollView>
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

export default RegisterScreen;
