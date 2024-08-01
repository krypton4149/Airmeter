import React, { useState, useEffect } from "react";
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
import { NetworkInfo } from "react-native-network-info";
import { CheckIcon } from "../../assets/icons";
import { useUserDetails } from "../../context/userContext";

const WifiSetup = ({ navigation }) => {
  const [networkName, setNetworkName] = useState("");
  const [networkPassword, setNetworkPassword] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceIp, setDeviceIp] = useState("192.168.1.41"); // Default IP address
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { setWifiSetupCompleted } = useUserDetails();

  useEffect(() => {
    // Fetch the current WiFi SSID
    NetworkInfo.getSSID().then((ssid) => {
      setNetworkName(ssid || "");
    });

    // Fetch the device ID from the API
    fetchDeviceId();
  }, [deviceIp]); // Re-fetch device ID if device IP changes

  const fetchDeviceId = async () => {
    try {
      const response = await fetch(`http://${deviceIp}:8081/zeroconf/deviceid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: {} }),
      });
      const json = await response.json();
      setDeviceId(json.data.deviceid);
    } catch (error) {
      console.error("Failed to fetch device ID:", error);
      Alert.alert("Error", "Failed to fetch device ID.");
    }
  };

  const disconnectDevice = async () => {
    try {
      await fetch(`http://${deviceIp}:8081/zeroconf/wifi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceid: deviceId,
          data: {
            ssid: "",
            password: "",
          },
        }),
      });
    } catch (error) {
      console.error("Failed to disconnect device:", error);
    }
  };

  const connectDevice = async (retries = 3) => {
    try {
      // Disconnect the device before attempting to connect
      await disconnectDevice();

      const response = await fetch(`http://${deviceIp}:8081/zeroconf/wifi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceid: deviceId,
          data: {
            ssid: networkName,
            password: networkPassword,
          },
        }),
      });
      const json = await response.json();
      if (json.error === 0) {
        setWifiSetupCompleted(true);
        Alert.alert("Success", "Device connected successfully!");
      } else {
        throw new Error("Failed to connect device.");
      }
    } catch (error) {
      console.error("Failed to connect device:", error);
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        setTimeout(() => connectDevice(retries - 1), 2000); // Retry after 2 seconds
      } else {
        Alert.alert("Error", "Failed to connect device after multiple attempts.");
      }
    }
  };

  const handleSave = () => {
    connectDevice();
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <LinearBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AppHeader title="Wifi Setup" showDrawerIcon={false} showNotificationIcon={false} />
            <View style={styles.content}>
              <Text style={styles.title}>Wifi Setup</Text>
              <View style={styles.cardbox}>
                <View style={styles.inputbox}>
                  <Text style={styles.label}>Network Name (SSID)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter WiFi Name"
                    value={networkName}
                    onChangeText={(text) => setNetworkName(text)}
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Text style={styles.label}>Network Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="Enter WiFi Password"
                      value={networkPassword}
                      onChangeText={(text) => setNetworkPassword(text)}
                      placeholderTextColor="#888"
                      secureTextEntry={secureTextEntry}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={toggleSecureTextEntry}>
                      <Text>{secureTextEntry ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
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
    justifyContent: "center",
    marginTop: 100,
    width: 340,
    height: 408, // Adjusted height
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
  },
  submitButton: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 25, // Adjusted padding
    borderRadius: 50, // Cylinder-like radius
    marginTop: 20,
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

export default WifiSetup;
