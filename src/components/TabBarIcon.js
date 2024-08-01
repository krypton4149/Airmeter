// TabBarIcon.js
import React from 'react';
import { View, Image } from 'react-native';
import { dollarIcon, electricIcon, homeOutlineIcon } from '../assets/icons';
import routesConstants from '../constants/routesConstants';

const tabIcon = {
    [routesConstants.HOME_STACK]: homeOutlineIcon,
    [routesConstants.ELECTRIC_STACK]: electricIcon,
    [routesConstants.DOLLAR_STACK]: dollarIcon,
};

export function TabBarIcon({ color, routeName }) {
    return (
        <View style={{
            backgroundColor: '#f7fafe80', // Added opacity here
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
        }}>
            <Image
                accessibilityIgnoresInvertColors
                source={tabIcon[routeName]}
                style={{ tintColor: color }}
            />
        </View>
    );
}
