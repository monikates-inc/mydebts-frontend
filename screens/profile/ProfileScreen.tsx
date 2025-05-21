import React from 'react';
import { SafeAreaView } from 'react-native';

import MainProfile from "../../components/profile/MainProfile";



const ProfileScreen= () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainProfile />
        </SafeAreaView>
    );
};

export default ProfileScreen;
