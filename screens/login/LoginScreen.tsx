import React, {FC} from 'react';
import { SafeAreaView } from 'react-native';

import MainLogin from "../../components/login/MainLogin";

type Props = {
    toggleTheme: () => void;
    navigation: any;
};

const LoginScreen: FC<Props> = ({toggleTheme, navigation}) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainLogin toggleTheme={toggleTheme} navigation={navigation}/>
        </SafeAreaView>
    );
};

export default LoginScreen;
