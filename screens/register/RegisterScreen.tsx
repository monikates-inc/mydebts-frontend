import React, {FC} from 'react';
import { SafeAreaView } from 'react-native';

import MainRegister from "../../components/register/MainRegister";

type Props = {
    navigation: any;
};

const RegisterScreen: FC<Props> = ({ navigation}) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainRegister navigation={navigation}/>
        </SafeAreaView>
    );
};
export default RegisterScreen;