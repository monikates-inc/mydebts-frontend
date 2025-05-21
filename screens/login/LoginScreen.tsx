import React, {FC} from 'react';
import { SafeAreaView } from 'react-native';

import MainLogin from "../../components/login/MainLogin";

type Props = {

    navigation: any;
};

const LoginScreen: FC<Props> = ({navigation}) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainLogin navigation={navigation}/>
        </SafeAreaView>
    );
};

export default LoginScreen;
