import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import LinearBackground from '../../components/LinearBackground';

import useAPI from "../../utils/useAPI";
import { useUserDetails } from '../../context/userContext';

const Device = ({ navigation }) => {
  const { accessToken, userId } = useUserDetails();
  const { secureAPI } = useAPI();
  const [isEnabled, setIsEnabled] = useState(false);
  const requestData = {
    deviceid: "10016b76c3",
    data: {
      subDevId: "1721474c3831311647313130",
      switches: [
        {
          switch: isEnabled ? "off" : "on", // toggle the switch state
          outlet: 0
        }
      ]
    }
  };
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);

    try {
      const response = await secureAPI.post('http://192.168.1.41:8081/zeroconf/switches', requestData);
      console.log("API Response:", response.data.data);
      //var device_id = response.data.data;
      //Alert.alert("Success", `Toggle state changed, IP Address saved successfully.\nDevice ID: ${device_id.deviceid}`);
     // console.log("Toggle state changed, IP Address saved:", response.data);
     //rr navigation.navigate(routesConstants.HOME);
    } catch (error) {
      console.log("Error saving IP Address:", error.response ? error.response.data : error.message);
      Alert.alert("Error", error.response ? error.response.data.message : "Failed to save IP Address. Please try again later.");
    }
  };

  return (
    <LinearBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader title="Account Settings" showDrawerIcon={false} showNotificationIcon={false} />
        <View style={styles.content}>
          <Text style={styles.title}>Device </Text>
          <View style={styles.cardbox}>
            <Text style={styles.switchLabel}>Toggle Device</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: "#2E3C9E",
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '10%',
    fontFamily: 'Poppins',
  },
  cardbox: {
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: 100,
    width: 340,
    height: 200,
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
  },
  switchLabel: {
    fontSize: 18,
    color: "#2E3C9E",
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'Poppins',
  }
});

export default Device;
