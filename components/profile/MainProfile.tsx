// screens/profile/ProfileScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuthContext } from '../../context/AuthContext';

const MainProfile = () => {
    const { logout } = useAuthContext();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant="titleLarge">Perfil</Text>
            <Button
                mode="contained"
                style={{ marginTop: 20 }}
                onPress={logout}
            >
                Cerrar sesión
            </Button>
        </View>
    );
};

export default MainProfile;
