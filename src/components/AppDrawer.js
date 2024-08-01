import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Alert } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '@react-navigation/native';
import { homedrawerIcon, logdrawerIcon, deleteIcon, cancelIcon, paymentIcon, landlordIcon, tenancyIcon } from '../assets/icons';
import { useUserDetails } from '../context/userContext';
import routesConstants from '../constants/routesConstants';
import authService from '../services/authService';

const AppDrawer = ({ navigation }) => {
    const { colors } = useTheme();
    const { userDetails, removeUserDetails, addUserDetails } = useUserDetails();
    const { uploadProfilePicture } = authService();

    useEffect(() => {
        if (userDetails && userDetails?.user?.profile_pic) {
            setProfilePicture(userDetails?.user?.profile_pic);
        }
    }, [userDetails]);

    const [profilePicture, setProfilePicture] = useState(null);

    const firstName = userDetails?.user?.first_name ?? 'User';
    const lastName = userDetails?.user?.last_name ?? 'Name';

    const handleProfilePicture = async () => {
        try {
            const response = await launchImageLibrary({ mediaType: 'photo' });
            if (response.assets && response.assets.length > 0) {
                const profilePicData = new FormData();
                profilePicData.append('id', userDetails.user.id);
                profilePicData.append('image', {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName
                });

                const res = await uploadProfilePicture(profilePicData);
                addUserDetails({
                    token: userDetails.token,
                    token_details: userDetails.token_details,
                    user: res.user
                });

                setProfilePicture(response.assets[0].uri);
            }
        } catch (error) {
            console.log("Error uploading profile picture", error);
            Alert.alert('Error', 'Profile picture upload failed: The image field must not be greater than 2048 kilobytes');
        }
    };

    const myMenus = [
        { id: "home", label: 'Home', icon: homedrawerIcon, onPress: () => { navigation.navigate(routesConstants.HOME) } },
        userDetails?.user?.user_type_id === 2 && { id: "StartTenancy", label: 'Start Tenancy', icon: tenancyIcon, onPress: () => { navigation.navigate(routesConstants.START_TENANCY) } },
        { id: "landlord", label: 'My Landlord', icon: landlordIcon, onPress: () => { navigation.navigate(routesConstants.MY_LANDLORD) } },
        { id: "paymentHistory", label: 'Payment History', icon: paymentIcon, onPress: () => { navigation.navigate(routesConstants.PAYMENT_HISTORY) } },
        { id: "cancelTenancy", label: 'Cancel Tenancy', icon: cancelIcon, onPress: () => { navigation.navigate(routesConstants.CANCEL_TENANCY) } },
        { id: "deleteAccount", label: 'Delete Account', icon: deleteIcon, onPress: () => { navigation.navigate(routesConstants.DELETE_ACCOUNT) } },
        {
            id: "Logout", label: 'Logout', icon: logdrawerIcon, onPress: () => {
                removeUserDetails();
            }
        },
    ].filter(Boolean);

    const onPressViewProfile = () => {
        navigation.navigate(routesConstants.PROFILE);
    };

    const renderListItem = (item) => (
        <React.Fragment key={item.id}>
            {item.id === "Logout" && (
                <View style={{ width: '100%', height: 1, backgroundColor: '#EDEDED', marginVertical: 15 }} />
            )}
            <List.Item
                title={item.label}
                left={(props) => <List.Icon {...props} icon={item.icon} />}
                onPress={() => {
                    navigation.closeDrawer();
                    item.onPress();
                }}
            />
        </React.Fragment>
    );

    return (
        <LinearGradient colors={['#F8FFFC', '#ECF4FF']} style={{ flex: 1 }}>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', padding: 20, gap: 5, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={handleProfilePicture}>
                            {profilePicture ? (
                                <Avatar.Image size={50} source={{ uri: profilePicture }} />
                            ) : (
                                <Avatar.Icon size={50} icon="account" />
                            )}
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: "Poppins" }}>{`${firstName} ${lastName}`}</Text>
                            <TouchableOpacity onPress={() => onPressViewProfile()}>
                                <Text style={{ color: colors.primary, marginTop: 2, fontSize: 13, color: "gray", fontFamily: 'Poppins' }}>View Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#EDEDED', marginVertical: 10 }} />
                    <View style={{ width: '100%' }}>
                        <List.Section>
                            {myMenus.map(renderListItem)}
                        </List.Section>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default AppDrawer;
