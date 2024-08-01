import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CheckIcon,
  bannerIcon,
  bulbIcon,
  fanIcon,
  fireIcon,
  frameIcon,
  plusIcon,
  quesIcon,
  switchIcon,
  tvIcon,
  wifiIcon
} from "../../assets/icons";
import AppHeader from "../../components/AppHeader";
import LinearBackground from "../../components/LinearBackground";
import { Snackbar } from "react-native-paper";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const deviceState = {
  CONNECTED: "connected",
  PAIRING: "pairing",
  DISCONNECTED: "disconnected",
};

const iconMapping = {
  switchIcon: switchIcon,
  bulbIcon: bulbIcon,
  tvIcon: tvIcon,
  frameIcon: frameIcon,
  fanIcon: fanIcon,
  fireIcon: fireIcon,
  quesIcon: quesIcon,
};

const screenHeight = Dimensions.get('window').height;

const Bedroom = ({ navigation }) => {

  const tabBarHeight = useBottomTabBarHeight();


  const [currentDeviceState, setCurrentDeviceState] = useState(deviceState.DISCONNECTED);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [deviceName, setDeviceName] = useState("");
  const [connectedDevices, setConnectedDevices] = useState([]);

  const [visible, setVisible] = React.useState({ showSnackBar: false, message: "" });

  const onToggleSnackBar = (message) => setVisible({ showSnackBar: !visible.showSnackBar, message: message });

  const onDismissSnackBar = () => setVisible({ showSnackBar: false, message: "" });

  const handleAddDevicePress = () => {
    setCurrentDeviceState(deviceState.PAIRING);
    setShowLoader(false);
    setTimeout(() => {
      setShowLoader(true);
      setTimeout(() => {
        setCurrentDeviceState(deviceState.CONNECTED);
      }, 5000);
    }, 5000);
  };

  const handleIconPress = (icon) => {
    setSelectedIcon(icon);
  };

  const handleFinishPress = () => {
    try {
      if (deviceName.trim() !== "") {
        const newDevice = {
          id: connectedDevices.length + 1,
          name: deviceName,
          icon: selectedIcon,
        };
        setConnectedDevices([...connectedDevices, newDevice]);
        setDeviceName("");
        setSelectedIcon(null);
        setCurrentDeviceState(deviceState.DISCONNECTED);
      } else {
        onToggleSnackBar("Please enter device name.")
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const renderDeviceStateContainer = () => {
    switch (currentDeviceState) {
      case deviceState.PAIRING:
        if (showLoader) {
          return (
            <View style={[styles.centerContainer, { justifyContent: "center" }]}>
              <ActivityIndicator size="large" color="#2E3C9E" />
              <Text style={styles.pairingText}>Pairing...</Text>
            </View>
          );
        }
        return (
          <View style={[styles.centerContainer, { justifyContent: "center" }]}>
            <View style={[styles.deviceWhiteContainer, { padding: 24 }]}>
              <Image source={wifiIcon} style={styles.wifiIcon} />
              <Text style={styles.deviceWhiteContainerText}>
                Please proceed by holding down the ON/OFF button on your smart device for at least 5 seconds (until the LED starts flashing)
              </Text>
            </View>
          </View>
        );
      case deviceState.CONNECTED:
        return (
          <View style={styles.centerContainer}>
            <View style={styles.deviceWhiteContainer}>
              <View style={styles.textContainer}>
                <Image source={CheckIcon} style={styles.itemImage2} />
                <Text style={styles.text}>
                  Device has been successfully paired
                </Text>
                <View style={styles.boxcontainer}>
                  <Text style={styles.boxtext}>
                    Please enter a unique name for the smart device
                  </Text>
                </View>
                <TextInput
                  placeholder="Input device name"
                  style={styles.textInput}
                  value={deviceName}
                  onChangeText={setDeviceName}
                />
                <View style={styles.iconcontainer}>
                  {[
                    { source: switchIcon, name: "switchIcon" },
                    { source: bulbIcon, name: "bulbIcon" },
                    { source: tvIcon, name: "tvIcon" },
                    { source: frameIcon, name: "frameIcon" },
                    { source: fanIcon, name: "fanIcon" },
                    { source: fireIcon, name: "fireIcon" },
                    { source: quesIcon, name: "quesIcon" },
                  ].map((icon, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleIconPress(icon.name)}
                      style={[
                        styles.iconWrapper,
                        selectedIcon === icon.name && styles.selectedIcon,
                      ]}
                    >
                      <Image source={icon.source} style={styles.itemImage4} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleFinishPress}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={CheckIcon} style={styles.itemImage3} />
                    <Text style={styles.buttonText}>Finish</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case deviceState.DISCONNECTED:
        return (
          <View style={[styles.centerContainer]}>
            {connectedDevices.length === 0 ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.disconnectedText}>No devices connected.</Text>
              </View>
            ) : (
              <View style={styles.deviceCard}>
                {connectedDevices.map((device) => (
                  <View style={{ width: "48%", marginRight: "2%", backgroundColor: "#fff", padding: 16, borderRadius: 8, marginTop: '2%' }}>
                    <Image source={iconMapping[device.icon]} style={styles.deviceIcon} />
                    <Text style={styles.deviceName}>{device.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearBackground>
      <SafeAreaView style={styles.safeAreaView}>
        <AppHeader title="Bedroom" showDrawerIcon={false} showNotificationIcon={false} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.bannerContainer}>
            <Image source={bannerIcon} style={styles.bannerImage} />
          </View>
          <View style={styles.devicesContainer}>
            <Text style={styles.devicesText}>Devices</Text>
            <TouchableOpacity onPress={handleAddDevicePress} style={styles.addDeviceButton}>
              <Image source={plusIcon} style={styles.addDeviceIcon} />
            </TouchableOpacity>
          </View>
          {renderDeviceStateContainer()}
        </ScrollView>
        <Snackbar
          style={{ zIndex: 100, marginBottom: tabBarHeight }}
          visible={visible.showSnackBar}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          {visible.message}
        </Snackbar>
      </SafeAreaView>
    </LinearBackground>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 64
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  devicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  devicesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  addDeviceButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#2E3C9E",
    justifyContent: "center",
    alignItems: "center",
  },
  addDeviceIcon: {
    width: 18,
    height: 21,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  deviceWhiteContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  wifiIcon: {
    width: 38,
    height: 31,
    marginBottom: 10,
    resizeMode: "contain",
  },
  deviceWhiteContainerText: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  connectedContainer: {
    alignItems: "center",
  },
  checkIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
  connectedText: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
  },
  deviceNameInput: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  disconnectedText: {
    fontSize: 16,
  },
  pairingText: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  textContainer: {
    marginTop: 30,
    width: 375,
    height: 420,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    width: 237,
    height: 61,
    color: "black",
    textAlign: "center",
    lineHeight: 20,
  },
  textInput: {
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginTop: -15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: 109,
    height: 40,
    position: "absolute",
    bottom: 75,
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    marginStart: 10,
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  itemImage2: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  itemImage3: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginHorizontal: 1,
  },
  boxcontainer: {
    marginTop: 0,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  boxtext: {
    fontSize: 12,
    height: 15,
    width: 320,
    textAlign: "center",
    color: "gray",
  },
  iconcontainer: {
    width: 320,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  itemImage4: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: "#d2d1d1",
    padding: 10,
    marginHorizontal: 5,
  },
  selectedIcon: {
    backgroundColor: "#2E3C9E",
    borderRadius: 50,
  },
  deviceCard: {
    padding: 16,
    borderRadius: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  deviceIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  deviceName: {
    fontSize: 16,
    color: "#333",
  },
});

export default Bedroom;


