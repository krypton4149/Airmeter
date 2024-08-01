import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import LinearBackground from "../../components/LinearBackground";
import { CheckIcon } from "../../assets/icons";

import routesConstants from '../../constants/routesConstants';

const DeviceIP = ({ navigation }) => {
  const [deviceIp, setDeviceIp] = useState("192.168.1.41"); // Default IP address

  const handleSave = () => {
    if (deviceIp.trim() === "") {
      Alert.alert("Validation Error", "Please enter a device IP address.");
      return;
    }
    console.log("Device IP:", deviceIp);
    Alert.alert("Saved", `Device IP: ${deviceIp}`, [
      {
        text: "OK",
        onPress: () => {
          // Navigate to WifiSetup screen
          navigation.navigate(routesConstants.WIFISETUP);
        },
      },
    ]);
  };

  return (
    <LinearBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AppHeader title="Device IP Address" showDrawerIcon={false} showNotificationIcon={false} />
            <View style={styles.content}>
              <Text style={styles.title}>Device IP Address</Text>
              <View style={styles.cardbox}>
                <View style={styles.inputbox}>
                  <Text style={styles.label}>Enter Device IP </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Device IP Address"
                    value={deviceIp}
                    onChangeText={(text) => setDeviceIp(text)}
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                  <Image source={CheckIcon} style={styles.buttonImage} />
                  <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#2E3C9E",
    fontWeight: "700",
    textAlign: "center",
    marginTop: "10%",
    fontFamily: "Poppins",
  },
  cardbox: {
    backgroundColor: "white",
    marginTop: 100,
    width: 340,
    height: 408, // Adjusted height
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal:20,
    paddingTop:90,
  },
  inputbox: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    textAlign: "center",
    width: "90%",
    borderRadius: 5,
    marginVertical: 10,
  },
  submitButton: {
    position:'absolute',
    bottom:25,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 25, // Adjusted padding
    borderRadius: 50, // Cylinder-like radius
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    width: 16, // Adjusted size
    height: 17, // Adjusted size
    marginRight: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Poppins",
  },
});

export default DeviceIP;
