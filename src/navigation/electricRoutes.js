import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import routesConstants from '../constants/routesConstants';                                                                           
import Electricity from '../screens/electricTab/Electricity';

const Stack = createNativeStackNavigator();

const ElectricRoutes = () => {
    return (
         <Stack.Navigator screenOptions={{ headerShown: false }}>
             <Stack.Screen name={routesConstants.ELECTRICITY} component={Electricity} />
        </Stack.Navigator>
    );
};

export default ElectricRoutes;