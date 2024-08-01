import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { backIcon, CheckIcon, } from "../../assets/icons"; // Ensure these paths are correct
import routesConstants from '../../constants/routesConstants';
import LinearBackground from '../../components/LinearBackground';
import { useUserDetails } from "../../context/userContext"; // Import the user context
import AppHeader from "../../components/AppHeader";

const Profile = ({ navigation }) => {
  const { userDetails } = useUserDetails();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userDetails && userDetails.user) {
      setFirstName(userDetails.user.first_name);
      setLastName(userDetails.user.last_name);
      setEmail(userDetails.user.email);
    }
  }, [userDetails]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Implement logic to save profile data
    console.log("Form data saved:", { firstName, lastName, email });

    // Navigate to the home screen
    navigation.navigate(routesConstants.HOME);
  };


  return (
    <LinearBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader title="My Profile" showDrawerIcon={false} showNotificationIcon={false} />
          <View style={styles.content}>
            <Text style={styles.createAccount}>My Profile</Text>
            {/* First Name */}
            <View style={styles.cardbox}>
              <View style={styles.inputbox}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)} // Update first name state
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)} // Update last name state
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)} // Update email state
                  />
                </View>
              </View>
              {/* Create Button */}
              <TouchableOpacity style={styles.createButton} onPress={handleSave}>
                <Image
                  source={CheckIcon} // Replace 'check_icon.png' with your image path
                  style={styles.buttonImage}
                />
                <Text style={styles.createButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500', // Medium font weight
    marginLeft: 80,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500', // Medium font weight
    fontFamily: 'Poppins-SemiBold', // Ensure this matches the font family name
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 30,
    alignItems: 'center'
  },
  iconNotification: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  createAccount: {
    fontSize: 36,
    color: "#2E3C9E",
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '10%',
    fontFamily: 'Poppins',
  },
  cardbox: {
    backgroundColor: "white",
    marginTop: 100,
    width: 340,
    height: 408,
    borderRadius: 10,

  },
  inputbox: {
    marginTop: 60,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    borderColor: "gray",
    textAlign: "center",
  },
  createButton: {

    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "center",
    width: 120,
    paddingVertical: 10,
    flexDirection: "row", // Align items in row
    justifyContent: "center", // Center items
    alignItems: "center", // Center items vertically
  },
  createButtonText: {
    color: 'black',
    fontSize: 16,            // Set the font size to 16
    fontWeight: '500',       // Medium font weight
    textAlign: 'center',
    fontFamily: 'Poppins',
    // Specify the Poppins font


  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
  buttonImage: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  icon: {
    width: 14,
    height: 16,
    resizeMode: 'contain',
  },
});

export default Profile;
