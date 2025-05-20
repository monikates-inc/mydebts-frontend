import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { IconButton, TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

type Props = {
  toggleTheme: () => void;
  navigation: any;
};

const RegisterSchema = Yup.object().shape({
  names: Yup.string().required('Campo requerido'),
  lastNames: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
  rpassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('Campo requerido'),
});

const RegisterScreen: React.FC<Props> = ({ toggleTheme, navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRpassword, setShowRpassword] = useState(false);

  const handleRegister = (values: any) => {
    console.log('Formulario válido:', values);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <IconButton icon="theme-light-dark" size={30} onPress={toggleTheme} />
      </View>

      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Registro
      </Text>

      <Formik
        initialValues={{
          names: '',
          lastNames: '',
          run: '',
          email: '',
          password: '',
          rpassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Nombres"
              value={values.names}
              onChangeText={handleChange('names')}
              onBlur={handleBlur('names')}
              mode="outlined"
              style={{ marginBottom: 4 }}
            />
            <HelperText type="error" visible={touched.names && !!errors.names}>
              {errors.names}
            </HelperText>

            <TextInput
              label="Apellidos"
              value={values.lastNames}
              onChangeText={handleChange('lastNames')}
              onBlur={handleBlur('lastNames')}
              mode="outlined"
              style={{ marginBottom: 4 }}
            />
            <HelperText type="error" visible={touched.lastNames && !!errors.lastNames}>
              {errors.lastNames}
            </HelperText>
            <TextInput
              label="E-mail"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              mode="outlined"
              style={{ marginBottom: 4 }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <HelperText type="error" visible={touched.email && !!errors.email}>
              {errors.email}
            </HelperText>

            <TextInput
              label="Contraseña"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={{ marginBottom: 4 }}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <HelperText type="error" visible={touched.password && !!errors.password}>
              {errors.password}
            </HelperText>

            <TextInput
              label="Repetir Contraseña"
              value={values.rpassword}
              onChangeText={handleChange('rpassword')}
              onBlur={handleBlur('rpassword')}
              mode="outlined"
              secureTextEntry={!showRpassword}
              style={{ marginBottom: 4 }}
              right={
                <TextInput.Icon
                  icon={showRpassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowRpassword(!showRpassword)}
                />
              }
            />
            <HelperText type="error" visible={touched.rpassword && !!errors.rpassword}>
              {errors.rpassword}
            </HelperText>

            <View style={{ alignItems: 'center', marginTop: 16 }}>
              <Button mode="contained" style={{ width: '70%' }} onPress={() => handleSubmit()}>
                Registrarse
              </Button>


              <Text style={{ marginTop: 16 }} onPress={() => navigation.navigate('Login')}>
                ¿Ya tienes una cuenta?{' '}
                <Text style={{ color: '#1E90FF' }}>Inicia sesión</Text>
              </Text>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default RegisterScreen;
