import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import routesConstants from '../constants/routesConstants';
import Landing from '../screens/auth/Landing';
import SignIn from '../screens/auth/SignIn';
import Home from '../screens/home/Home';

import WifiSetup from '../screens/auth/WifiSetup';
import DeviceIP from '../screens/auth/DeviceIP';

// import NewRoom from '../screens/home/NewRoom';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routesConstants.LANDING} component={Landing} />
            <Stack.Screen name={routesConstants.WIFISETUP} component={WifiSetup} />
            <Stack.Screen name={routesConstants.DEVICE_IP} component={DeviceIP} />
            <Stack.Screen name={routesConstants.SIGN_IN} component={SignIn} />
            <Stack.Screen name={routesConstants.HOME} component={Home} />

        </Stack.Navigator>
    );
};

export default AuthRoutes;