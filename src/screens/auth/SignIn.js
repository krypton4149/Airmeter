import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearBackground from '../../components/LinearBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import { googleIcon } from '../../assets/icons';
import routesConstants from '../../constants/routesConstants';
import { useUserDetails } from '../../context/userContext';
import authService from '../../services/authService';

GoogleSignin.configure({
    webClientId: '1035244242918-busp4e5f139mn8buala3r2ev40q13bai.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const SignIn = ({ navigation }) => {

    const { addUserDetails } = useUserDetails();
    const { login } = authService();


    const handleNavigateToCreateAccount = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();

            const idToken = userInfo.idToken;

            // Call your backend API with the idToken
            const response = await login(idToken);
            console.log("Login Response", response);

            //... Set useDetails
            addUserDetails(response)

            // Navigate to another screen with userInfo
            navigation.navigate(routesConstants.WIFISETUP);

        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.log('User cancelled the login flow');
                        break;
                    case statusCodes.IN_PROGRESS:
                        console.log('Operation (e.g., sign in) already in progress');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log('Play services not available or outdated');
                        break;
                    default:
                        console.log('Some other error happened', error);
                }
            } else {
                console.log('An error occurred:', error);
            }
        }
    };

    return (
        <LinearBackground>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.backgroundContainer}></View>
                    <View style={styles.letsGetStartedParent}>
                        <Text style={styles.letsGetStarted}>Let's Get Started!</Text>
                        <Text style={styles.withTheFirst}>
                            with the first over-the-air electric meter
                        </Text>
                    </View>
                    <View style={styles.centeredContent}>
                        <Text style={styles.smartbill}>Smartbill</Text>
                        <View style={[styles.orConnectWithParent, styles.parentFlexBox]}>
                            <Text style={styles.orConnectWith}>Connect with</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.assetlogogoogleLogoWrapper, styles.parentFlexBox]}
                            onPress={handleNavigateToCreateAccount}>
                            <View style={styles.googleLogoBackground}>
                                <Image
                                    style={styles.assetlogogoogleLogoIcon}
                                    resizeMode="cover"
                                    source={googleIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    parentFlexBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orConnectWithParent: {
        marginBottom: 20,
    },
    orConnectWith: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Poppins',
        fontWeight: '400',
    },
    googleLogoBackground: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    assetlogogoogleLogoWrapper: {
        marginLeft: 10,
    },
    assetlogogoogleLogoIcon: {
        width: 34,
        height: 34,
    },
    smartbill: {
        fontSize: 36,
        color: '#2E3C9E',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Poppins',
    },
    letsGetStartedParent: {
        marginTop: 80,
        marginBottom: 40,
        alignItems: 'center',
    },
    letsGetStarted: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '600',
        fontFamily: 'Poppins',
    },
    withTheFirst: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '400',
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
});

export default SignIn;