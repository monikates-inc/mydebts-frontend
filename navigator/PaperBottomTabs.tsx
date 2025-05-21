import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

type RouteType = {
    key: string;
    title: string;
    icon: string;
};

const PaperBottomTabs = () => {
    const [index, setIndex] = useState<number>(0);

    const [routes] = useState<RouteType[]>([
        { key: 'home', title: 'Inicio', icon: 'home' },
        { key: 'profile', title: 'Perfil', icon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        profile: ProfileScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            renderIcon={({ route, color }: { route: RouteType; color: string }) => (
                <MaterialCommunityIcons name={route.icon} color={color} size={24} />
            )}
            shifting={true}
            sceneAnimationEnabled={true}
        />
    );
};

export default PaperBottomTabs;
