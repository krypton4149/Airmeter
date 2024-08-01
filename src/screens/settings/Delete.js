import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { crossIcon } from '../../assets/icons'; // Import the X icon
import AppHeader from '../../components/AppHeader';
import LinearBackground from '../../components/LinearBackground';


const Delete = ({ navigation }) => {

    const handleCancelPress = () => {
        // Implement cancel tenancy functionality here
    };

    return (
        <LinearBackground>
            <SafeAreaView style={styles.safeArea}>
                <AppHeader title="Delete Account" showDrawerIcon={false} showNotificationIcon={false} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyTitle}>Delete Account </Text>
                    <View style={styles.whiteContainer}>
                        <Text style={styles.subHeading}>
                            Are you sure{'\n'}you wish to Delete Your Account?
                        </Text>
                        <Text style={styles.paragraph}>
                            All data will be permanently removed.
                        </Text>
                        <Text style={styles.paragraph}>
                            You will no longer be able to make payments to the Landlord.
                            Please be mindful to clear any outstanding bills before deleting your account.
                            You can calculate final bill due by Cancelling Tenancy first
                        </Text>
                        <View style={styles.cancelButtonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
                                <Image source={crossIcon} resizeMode='contain' style={styles.cancelIcon} />
                                <Text style={styles.cancelButtonText}>Delete my Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearBackground >
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
        marginTop: 40,
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
        paddingBottom: 20,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,

    },
    cancelIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        lineHeight: 16,
        color: 'black',

    },
});

export default Delete;
