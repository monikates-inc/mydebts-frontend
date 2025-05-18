import React, {FC} from 'react';
import { SafeAreaView } from 'react-native';
import MainHome from "../../components/home/MainHome";

type Props = {
    toggleTheme: () => void;
};

const LoginScreen: FC<Props> = ({toggleTheme}) => {

    return (
        <SafeAreaView>
            <MainHome  toggleTheme={toggleTheme}/>
        </SafeAreaView>
    );
};

export default LoginScreen;
