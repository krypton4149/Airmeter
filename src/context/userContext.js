/* eslint-disable prettier/prettier */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export function UserProvider(props) {
    const [state, dispatch] = useImmerReducer(reducer, initialState);

    const providerValue = {
        userDetails: state.userDetails,
        loading: state.loading,
        isLogged: state.userDetails?.token ? true : false,
        wifiPasswordComplete: state.wifiPasswordComplete,
        userTypeAdded: state.userTypeAdded,
        addUserDetails: async (details) => {
            dispatch({ type: 'ADD_USER', userDetails: details });
            await AsyncStorage.setItem('userDetails', JSON.stringify(details));
        },
        setWifiSetupCompleted: () => {
            dispatch({ type: 'WIFI_SETUP', wifiSetup: true });
        },
        setUserType: () => {
            dispatch({ type: 'USER_TYPE_SETUP', userType: true });
        },
        getUserDetailsFromLocalStorage: async () => {
            try {
                let userDetails = await AsyncStorage.getItem('userDetails');
                userDetails = userDetails != null ? JSON.parse(userDetails) : null;
                dispatch({ type: 'ADD_USER', userDetails: userDetails });
            } catch (e) {
                // error reading value
            }
        },
        removeUserDetails: async () => {
            dispatch({ type: 'REMOVE_USER' });
            await AsyncStorage.removeItem('userDetails');
        },
    };

    return (
        <UserContext.Provider value={providerValue}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserDetails() {
    return useContext(UserContext);
}

function reducer(draft, action) {
    switch (action.type) {
        case 'ADD_USER':
            draft.userDetails = action.userDetails;
            break;
        case 'REMOVE_USER':
            draft.userDetails = {};
            break;
        case 'WIFI_SETUP':
            draft.wifiPasswordComplete = action.wifiSetup;
            break;
        case 'USER_TYPE_SETUP':
            draft.userTypeAdded = action.userType;
            break;
        default:
            throw new Error('Unknown action: ' + action.type);
    }
}

const initialState = {
    userDetails: {},
};
