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
import LinearBackground from '../../components/LinearBackground';
import { IconButton } from "react-native-paper";
import { backIcon, CheckIcon} from "../../assets/icons";
import { useUserDetails } from "../../context/userContext";
import authService from "../../services/authService";

const SignUp = ({ navigation }) => {
  const { userDetails, addUserDetails } = useUserDetails();
  const [role, setRole] = useState("");

  const goToSignIn = () => {
    navigation.goBack();
  };

  const goToProfile = async () => {
    try {
      const response = await authService.selectUserType(userDetails.user.id, role === "Landlord" ? 1 : 2);
      console.log("response", response);

      if (response && response.user_type_id !== null) {
        const updatedUserDetails = { ...userDetails, user: { ...userDetails.user, role: role } };
        await addUserDetails(updatedUserDetails);

        if (role === "Landlord") {
          navigation.navigate("LandlordScreen");
        } else {
          navigation.navigate("TenantScreen");
        }
      } else {
        console.log("User type is null in response");
      }
    } catch (error) {
      console.log("Error updating user type", error);
    }
  };

  return (
    <LinearBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <IconButton
              icon={backIcon}
              size={16}
              color="black"
              onPress={goToSignIn}
            />
            <Text style={styles.title}>User Information</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.createAccount}>Create Account</Text>
            <View style={styles.cardbox}>
              <View style={styles.inputbox}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={userDetails?.user?.first_name}
                    onChangeText={(text) => setFirstName(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={userDetails?.user?.last_name}
                    onChangeText={(text) => setLastName(text)}
                  />
                </View>
              </View>
              <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Are you?</Text>
                <View style={styles.radioOption}>
                  <TouchableOpacity
                    onPress={() => setRole("Landlord")}
                    style={[
                      styles.radio,
                      role === "Landlord" && styles.radioSelected,
                    ]}
                  />
                  <Text>Landlord</Text>
                  <View style={styles.spacer}></View>
                  <TouchableOpacity
                    onPress={() => setRole("Tenant")}
                    style={[
                      styles.radio,
                      role === "Tenant" && styles.radioSelected,
                    ]}
                  />
                  <Text>Tenant</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.createButton} onPress={goToProfile}>
                <Image source={CheckIcon} style={styles.buttonImage} />
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearBackground>
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
    fontWeight: '500',
    marginLeft: 80,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 30,
    alignItems: 'center',
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
    backgroundColor: "#FFFFFF",
    marginTop: 100,
    width: 340,
    height: 408,
    borderRadius: 10,
  },
  inputbox: {
    marginTop: 80,
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
  radioContainer: {
    marginTop: 20,
    textAlign: "center",
    marginHorizontal: "auto",
  },
  radioLabel: {
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  spacer: {
    width: 30,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    marginLeft: 5,
  },
  radioSelected: {
    backgroundColor: "#2E3C9E",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 5,
  },
  createButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Poppins',
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

export default SignUp;
