import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { IconButton, TextInput, Button, Text, HelperText } from 'react-native-paper';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { handleRegisterApi } from '../../api/register/registerService';
import {useThemeContext} from "../../context/ThemeContext";

type Props = {
  navigation: any;
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  lastName: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Campo requerido'),
  rpassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('Campo requerido'),
});

const RegisterScreen: React.FC<Props> = ({navigation }) => {
  const { toggleTheme, isDarkTheme } = useThemeContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showRpassword, setShowRpassword] = useState(false);

  const handleRegister = (values: any) => {
    console.log('Formulario válido:', values);
    navigation.navigate('Login');
  };
    const handleNavigateLogin = async() =>{
    const dataForm =  {name:values.name,lastname:values.lastName,email:values.email,password:values.password}
      try{
        const result = await handleRegisterApi(dataForm)
        console.log('respuesta: ', result);
        navigation.navigate('Login');
      }catch(error: any){
        console.log(error)
      }
  }

  const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm,
  submitForm,
} = useFormik({
  initialValues: {
    name: '',
    lastName: '',
    email: '',
    password: '',
    rpassword: '',
  },
  validationSchema: RegisterSchema,
  onSubmit: handleNavigateLogin
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <IconButton icon="theme-light-dark" size={30} onPress={toggleTheme} />
      </View>

      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Registro
      </Text>
          <>
            <TextInput
              label="Nombre"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              mode="outlined"
              style={{ marginBottom: 4 }}
            />
            <HelperText type="error" visible={touched.name && !!errors.name}>
              {errors.name}
            </HelperText>

            <TextInput
              label="Apellido"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              mode="outlined"
              style={{ marginBottom: 4 }}
            />
            <HelperText type="error" visible={touched.lastName && !!errors.lastName}>
              {errors.lastName}
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

    </SafeAreaView>
  );
};

export default RegisterScreen;
