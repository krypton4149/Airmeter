import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TabBarIcon } from '../components/TabBarIcon';
import HomeRoutes from './homeRoutes';
import routesConstants from '../constants/routesConstants';
import ElectricRoutes from './electricRoutes';
import Payment from '../screens/paymentTab/Payment';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName={routesConstants.HOME_STACK}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.inactiveTab,
                tabBarIcon: ({ color }) => (
                    <TabBarIcon 
                        color={color} 
                        routeName={route.name} 
                        style={{ 
                            backgroundColor: '#f7fafe', 
                            borderRadius: 50 
                        }} 
                    />
                ),
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontFamily: "Nunito-ExtraBold",
                },
                tabBarStyle: {
                    height: 92,
                    paddingHorizontal: 50,
                    paddingBottom: 35,
                    backgroundColor: "#ECF4FF",
                    position: 'absolute',
                    borderTopWidth: 0,
                    
                },
            })}
        >
            <Tab.Screen name={routesConstants.ELECTRIC_STACK} component={ElectricRoutes} />
            <Tab.Screen name={routesConstants.HOME_STACK} component={HomeRoutes} />
            <Tab.Screen name={routesConstants.DOLLAR_STACK} component={Payment} />
        </Tab.Navigator>
    );
}
