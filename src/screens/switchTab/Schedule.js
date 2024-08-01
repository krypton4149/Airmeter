import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import LinearBackground from '../../components/LinearBackground';
import { plusIcon } from "../../assets/icons";

const Schedule = () => {
    const [isOn, setIsOn] = useState(false);
    const [showStatusAndContainer, setShowStatusAndContainer] = useState(false);
    const [deviceContainers, setDeviceContainers] = useState([]);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const handleAddDevice = () => {
        const newContainer = {
            id: Date.now(), // Unique ID for each container
            isOpen: true, // Indicates if the container is open
        };

        // Calculate top offset for the new container
        const topOffset = deviceContainers.length * (164 + 10); // 164 (height of container) + 10 (gap)
        newContainer.topOffset = topOffset;

        setDeviceContainers(prevContainers => [...prevContainers, newContainer]);
        setShowStatusAndContainer(true); // Show status and containers when adding a device
    };

    const handleCloseDevice = (id) => {
        setDeviceContainers(prevContainers => {
            // Remove the container
            const updatedContainers = prevContainers.filter(container => container.id !== id);
            // Recalculate top offsets for remaining containers
            return updatedContainers.map((container, index) => ({
                ...container,
                topOffset: index * (164 + 10)
            }));
        });
    };

    const handleCloseAllDevices = () => {
        setDeviceContainers([]);
        setShowStatusAndContainer(false); // Hide status and containers when closing all devices
    };

    const toggleStatusAndContainer = () => {
        setShowStatusAndContainer(!showStatusAndContainer);
    };

    return (
        <LinearBackground>
            <TouchableWithoutFeedback onPress={handleCloseAllDevices}>
                <SafeAreaView style={styles.safeAreaView}>
                    <AppHeader title="Schedule" />
                    <View style={styles.contentContainer}>
                        <View style={styles.textContainer}>
                            <View style={styles.boxContainer}>
                                <TouchableOpacity
                                    style={[styles.halfBox, !isOn ? styles.boxOff : styles.boxOn]}
                                    onPress={handleToggle}
                                >
                                    <Text style={!isOn ? styles.boxTextOff : styles.boxTextOn}>OFF</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.halfBox, isOn ? styles.boxOff : styles.boxOn]}
                                    onPress={handleToggle}
                                >
                                    <Text style={isOn ? styles.boxTextOff : styles.boxTextOn}>ON</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.addDeviceButton} onPress={handleAddDevice}>
                                <Image source={plusIcon} style={styles.addDeviceIcon} />
                            </TouchableOpacity>
                        </View>
                        {showStatusAndContainer && (
                            <View style={styles.statusContainer}>
                                <Text style={styles.statusText}>Status</Text>
                            </View>
                        )}
                        {deviceContainers.map(container => (
                            container.isOpen && (
                                <View
                                    key={container.id}
                                    style={[styles.addDeviceContainer, { top: container.topOffset }]}
                                >
                                    <Text style={styles.label}>Room : Bedroom</Text>
                                    <Text style={styles.label}>Days : </Text>
                                    <Text style={styles.label}>Time : </Text>
                                    <Text style={styles.label}>Device :</Text>

                                </View>
                            )
                        ))}
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </LinearBackground>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 10, // Add padding top to avoid overlap with status text
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    boxContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'lightgrey',
        height: 30,
        width: 100,
        overflow: 'hidden',
    },
    halfBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxOn: {
        backgroundColor: '#00D709',
    },
    boxOff: {
        backgroundColor: 'white',
    },
    boxTextOn: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    boxTextOff: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon: {
        width: 36,
        height: 36,
        marginLeft: 20,
    },
    addDeviceButton: {
        width: 36,
        height: 36,
        borderRadius: 20,
        backgroundColor: "#2E3C9E",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: 8,
    },
    addDeviceIcon: {
        width: 18,
        height: 21,
        resizeMode: "contain",
        tintColor: "#fff",
    },
    addDeviceContainer: {
        position: 'absolute',
        left: '50%', // Center the container horizontally
        transform: [{ translateX: -170 }], // Adjust this value to half the width of the container
        width: 340,
        height: 164,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 100, // Ensure no gap between containers
    },
    closeButton: {
        marginTop: 10,
        color: 'red',
        textAlign: 'center',
    },
    statusContainer: {
        width: 360,
        marginBottom: 0, // Remove margin to ensure no gap
        paddingLeft: 20, // Additional padding left for status text
        marginTop: 10, // Ensure gap between status text and addDeviceContainer
    },
    statusText: {
        fontSize: 16,
        textAlign: 'left',
        fontFamily: "poppins-Medium"
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "poppins-Medium"
    }
});

export default Schedule;
