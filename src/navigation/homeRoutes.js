import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import routesConstants from '../constants/routesConstants';
import Home from '../screens/home/Home';
import NewRoom from '../screens/home/NewRoom';
import Bedroom from '../screens/home/Bedroom';


const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name={routesConstants.PROFILE} component={Profile} /> */}
            <Stack.Screen name={routesConstants.HOME} component={Home} />
            <Stack.Screen name={routesConstants.NEW_ROOMS} component={NewRoom} />
            <Stack.Screen name={routesConstants.BEDROOM} component={Bedroom} />
        </Stack.Navigator>
    );
};

export default HomeRoutes;  
