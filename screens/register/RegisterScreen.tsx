import React, {FC} from 'react';
import { SafeAreaView } from 'react-native';

import MainRegister from "../../components/register/MainRegister";

type Props = {
    toggleTheme: () => void;
    navigation: any;
};

const RegisterScreen: FC<Props> = ({toggleTheme, navigation}) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainRegister toggleTheme={toggleTheme} navigation={navigation}/>
        </SafeAreaView>
    );
};

export default RegisterScreen;