import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { crossIcon } from '../../assets/icons'; // Import the X icon
import AppHeader from '../../components/AppHeader';
import LinearBackground from '../../components/LinearBackground';

const Cancel = ({ navigation }) => {

    const handleCancelPress = () => {
        // Implement cancel tenancy functionality here
    };

    return (
        <LinearBackground>
            <SafeAreaView style={styles.safeArea}>
                <AppHeader title="Cancel Tenancy" showDrawerIcon={false} showNotificationIcon={false} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyTitle}>Cancel Tenancy</Text>
                    <View style={styles.whiteContainer}>
                        <Text style={styles.subHeading}>
                            Are you sure{'\n'}you wish to Cancel Tenancy?
                        </Text>
                        <Text style={styles.paragraph}>
                            Your final bill will be calculated pro-rata and issued after cancelling the tenancy.
                        </Text>
                        <Text style={styles.paragraph}>
                            Please be mindful to pay any outstanding bills to the landlord.
                        </Text>
                        <View style={styles.cancelButtonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                                <Image source={crossIcon} resizeMode='contain' style={styles.cancelIcon} />
                                <Text style={styles.cancelButtonText}>Cancel Tenancy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    bodyTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: '#2E3C9E',
        marginBottom: 110,
        marginTop: 40,
    },
    whiteContainer: {
        width: 340,
        height: 408,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeading: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 70,
    },
    paragraph: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        textAlign: 'center',
        marginBottom: 30, // Increased margin bottom to 30
    },
    cancelButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    cancelIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
});

export default Cancel;
