import React, { useState } from "react";
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
import { IconButton } from "react-native-paper";
import { backIcon } from "../../assets/icons";
import routesConstants from '../../constants/routesConstants';
import { CheckIcon } from "../../assets/icons";

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const goToSignUp = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleSave = () => {
    // Implement logic to save profile data
    console.log("Form data saved:", { firstName, lastName, email });
    console.log("navigate");
    // Navigate to the home screen
    navigation.navigate(routesConstants.HOME_STACK);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon={backIcon}
            size={16}
            color="black"
            onPress={goToSignUp}
          />
          <Text style={styles.title}>Account Settings</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.createAccount}>My Profile</Text>
          {/* First Name */}
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500', // Medium font weight
    marginLeft: 80,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 30,
  },
  createAccount: {
    fontSize: 36,            // Set the font size to 36
    color: "#2E3C9E",
    fontWeight: '700',       // Explicitly set bold weight
    textAlign: 'center',
    marginTop: '10%',
    fontFamily: 'Poppins',
  },
  inputbox: {
    marginTop: 30,
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
    borderColor: "black",
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
    fontFamily: 'Poppins',   // Specify the Poppins font


  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
  buttonImage: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});

export default Profile;
