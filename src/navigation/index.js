import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import routesConstants from '../constants/routesConstants';
import AuthRoutes from './authRoutes';
import { DrawerStack } from './drawerRoutes';
import { useUserDetails } from '../context/userContext';
import Notification from '../screens/settings/Notification';
import SignUp from '../screens/auth/SignUp';
import WifiSetup from '../screens/auth/WifiSetup';
import DeviceIP from '../screens/auth/DeviceIP'; // Import DeviceIP screen
import StartTenancy from '../screens/settings/StartTenancy'; // Import StartTenancy screen

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
    const { userDetails, wifiPasswordComplete, getUserDetailsFromLocalStorage } = useUserDetails();

    useEffect(() => {
        getUserDetailsFromLocalStorage();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!userDetails?.token ? (
                    <Stack.Screen name={routesConstants.AUTH_STACK} component={AuthRoutes} />
                ) : (
                    <React.Fragment>
                        {!userDetails?.user?.user_type_id ? (
                            <Stack.Screen
                                name={routesConstants.SIGN_UP}
                                component={SignUp}
                                initialParams={{ onComplete: () => setUserTypeComplete(true) }}
                            />
                        ) : !wifiPasswordComplete ? (
                            userDetails.user.user_type_id === 2 ? (
                                <>
                                    <Stack.Screen
                                        name={routesConstants.DEVICE_IP}
                                        component={DeviceIP}
                                        initialParams={{ onComplete: () => setUserTypeComplete(true) }}
                                    />
                                    <Stack.Screen
                                        name={routesConstants.WIFISETUP}
                                        component={WifiSetup}
                                        initialParams={{ onComplete: () => setWifiPasswordComplete(true) }}
                                    />
                                </>
                            ) : (
                                <Stack.Screen
                                    name={routesConstants.WIFISETUP}
                                    component={WifiSetup}
                                    initialParams={{ onComplete: () => setWifiPasswordComplete(true) }}
                                />
                            )
                        ) : (
                            <>
                                <Stack.Screen name={routesConstants.DRAWER_STACK} component={DrawerStack} />
                                <Stack.Screen name={routesConstants.NOTIFICATION} component={Notification} />
                                
                            </>
                        )}
                    </React.Fragment>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;
