/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import NetInfo from "@react-native-community/netinfo";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { NetworkInfo } from 'react-native-network-info';

NetInfo.configure({
    shouldFetchWiFiSSID: true,
});

const useDeviceInfo = () => {

    const [networkStatus, setNetworkStatus] = useImmer({
        isConnected: false,
        connectionType: 'unknown',
        isInternetReachable: false,
        details: null
    });

    let unsubscribe = null;

    useEffect(() => {

        const checkAndRequestPermission = async () => {
            let permission;
            if (Platform.OS === 'android') {
                permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
            } else if (Platform.OS === 'ios') {
                permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
            }

            const status = await check(permission);
            console.log("status", status);

            if (status !== RESULTS.GRANTED) {
                const result = await request(permission);
                console.log("result", result);
                if (result !== RESULTS.GRANTED) {
                    console.warn('Location permission not granted');
                    return;
                }
            }

            // Add event listener for checking network status after permission is granted
            unsubscribe = NetInfo.addEventListener(state => {
                console.log("state", state);
                setNetworkStatus(prevVal => {
                    prevVal.isConnected = state.isConnected;
                    prevVal.connectionType = state.type;
                    prevVal.isInternetReachable = state.isInternetReachable;
                    prevVal.details = state.details;
                });
            });

            // Fetch the SSID if connected to WiFi
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                const ssid = await NetworkInfo.getSubnet();
                console.log(")))))))", ssid);
                setNetworkStatus(prevVal => {
                    prevVal.ssid = ssid;
                });
            }
        };

        checkAndRequestPermission();

        return () => {
            try {
                // Unsubscribe from the listener
                unsubscribe && unsubscribe();
            } catch {
                // Eat exception
            }
        };

    }, []);

    useEffect(() => {

        const getssid = async () => {
            const networkInfo = await NetInfo.fetch();
            console.log("networkInfo", networkInfo);
            const ssid = networkInfo.details.ssid;
            console.log("ssid", ssid);
        };

        if (networkStatus.isConnected) {
            getssid();
        }

    }, [networkStatus.isConnected]);

    return { networkStatus };
};

export default useDeviceInfo;
