import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { bedroomIcon, dollarCircle, electricCircle, wifiIcon, plusIcon, CheckIcon, 
  BedroomIcon, DineIcon, livingIcon, KitchenIcon, BathroomIcon, quesIcon } from '../../assets/icons';
import AppHeader from "../../components/AppHeader";
import LinearBackground from '../../components/LinearBackground';
import SurfaceCard from '../../components/SurfaceCard';
import routesConstants from '../../constants/routesConstants';
import { useUserDetails } from '../../context/userContext';

const USER_TYPE = {
  LANDLORD: 1,
  TENANT: 2,
};

const Home = ({ navigation }) => {
  const { userDetails } = useUserDetails();
  const [wifiInfo, setWifiInfo] = useState({
    ssid: null,
    bssid: null,
    ipAddress: null,
  });
  const [roomsList, setRoomsList] = useState([]);
  const [isAddRoomVisible, setAddRoomVisible] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null); // State for selected icon

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.type === 'wifi') {
        NetworkInfo.getSSID().then(ssid => setWifiInfo(info => ({ ...info, ssid })));
        NetworkInfo.getBSSID().then(bssid => setWifiInfo(info => ({ ...info, bssid })));
        NetworkInfo.getIPAddress().then(ipAddress => setWifiInfo(info => ({ ...info, ipAddress })));
      } else {
        setWifiInfo({
          ssid: null,
          bssid: null,
          ipAddress: null,
        });
        // TODO Call the get rooms API Here.
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goToNewRoom = () => {
    navigation.navigate(routesConstants.NEW_ROOMS);
  };

  const handleRoomClick = (roomId) => {
    navigation.navigate(routesConstants.BEDROOM, { roomId });
  };

  const handleAddTenantPress = () => {
    if (userDetails?.user?.user_type_id === USER_TYPE.TENANT) {
      setAddRoomVisible(true);
    }
  };

  const handleAddRoom = () => {
    // Add logic to handle new room creation
    const newRoom = {
      id: roomsList.length + 1,
      name: newRoomName,
      icon: selectedIcon,
    };
    setRoomsList([...roomsList, newRoom]);
    setAddRoomVisible(false);
    setNewRoomName('');
    setSelectedIcon(null);
  };

  const handleClose = () => {
    setAddRoomVisible(false);
    setNewRoomName('');
    setSelectedIcon(null);
  };

  const handleIconPress = (icon) => {
    setSelectedIcon(icon); // Update selected icon
  };

  return (
    <LinearBackground>
      <SafeAreaView style={styles.safeAreaView}>
        <AppHeader />
        <ScrollView>
          <View style={styles.body}>
            <SurfaceCard
              backgroundColor="#2E3C9E"
              elevation={4}
              iconSource={electricCircle}
              title="Electricity Consumption"
              subtitle="April"
              mainValue="45"
              mainUnit="kWh"
              lastMonthValue="35"
              lastMonthUnit="kWh"
            />
            <SurfaceCard
              backgroundColor="#BE17E7"
              elevation={4}
              iconSource={dollarCircle}
              title="Amount Due"
              subtitle="April"
              mainValue="$25.65"
              lastMonthValue="$22.20"
            />
          </View>

          {!wifiInfo.ipAddress ? (
            <View style={styles.wifiCard}>
              <Image source={wifiIcon} style={styles.wifiIcon} />
              <Text style={styles.wifiText}>Please connect to the local Wi-Fi</Text>
            </View>
          ) : userDetails?.user?.user_type_id === USER_TYPE.LANDLORD || userDetails?.user?.user_type_id === USER_TYPE.TENANT ? (
            <View style={styles.roomsSection}>
              <View style={styles.roomsHeader}>
                <Text style={styles.roomsText}>Rooms</Text>
                {userDetails?.user?.user_type_id === USER_TYPE.TENANT && (
                  <TouchableOpacity
                    onPress={handleAddTenantPress}
                    style={styles.addTenantButton}
                  >
                    <Image source={plusIcon} style={styles.addTenantIcon} />
                  </TouchableOpacity>
                )}
              </View>
              {roomsList.length > 0 ? (
                <View style={styles.roomsList}>
                  {roomsList.map(room => (
                    userDetails?.user?.user_type_id === USER_TYPE.TENANT && (
                      <TouchableOpacity
                        key={room.id}
                        style={styles.roomCard}
                        onPress={() => handleRoomClick(room.id)}
                      >
                        <View style={styles.roomCardContent}>
                          <View style={styles.iconBorder}>
                            <Image source={room.icon || bedroomIcon} style={styles.roomCardIcon} />
                          </View>
                          <Text style={styles.roomCardTitle}>{room.name}</Text>
                          <Text style={styles.roomCardSubtitle}>{room.verifiedRooms} Verified Room</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No Rooms Added</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>You do not have access to view rooms.</Text>
            </View>
          )}

          {/* White container for adding a new room */}
          {isAddRoomVisible && (
            <View style={styles.addRoomOverlay}>
              <View style={styles.addRoomContainer}>
                <Text style={styles.modalTitle}>Please enter a name for this room</Text>
                <TextInput
                  style={styles.textInput}
                  value={newRoomName}
                  onChangeText={setNewRoomName}
                  placeholder="Input Room Name"
                  placeholderTextColor="#9E9E9E"
                />
                <View style={styles.iconsRow}>
                  {[BedroomIcon, DineIcon, livingIcon, BathroomIcon, KitchenIcon, quesIcon].map((icon, index) => (
                    <TouchableOpacity key={index} onPress={() => handleIconPress(icon)}>
                      <View style={[styles.iconContainer, {
                        backgroundColor: selectedIcon === icon ? '#2e3c9e2b' : '#FFFFFF',
                        borderColor: selectedIcon === icon ? '#2E3C9E' : '#DDDDDD'
                      }]}>
                        <Image source={icon} style={styles.itemImage4} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={handleAddRoom}>
                  <Image source={CheckIcon} style={styles.itemImage} />
                  <Text style={styles.closeButtonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearBackground>
  );
};


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wifiCard: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 378,
  },
  wifiIcon: {
    width: 38,
    height: 31,
    marginBottom: 10,
  },
  wifiText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  roomsSection: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  roomsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  addTenantButton: {
    backgroundColor: '#2E3C9E',
    borderRadius: 24,
    padding: 8,
  },
  addTenantIcon: {
    width: 20,
    height: 20,
  },
  roomsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconBorder: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 32,
    borderColor: '#E0E0E0',
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '48%',
  },
  roomCardContent: {
    alignItems: 'center',
  },
  roomCardIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  roomCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomCardSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
  },
  addRoomContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop:50,
    height: '87%',
    position: 'relative',
    width: '92%',
    marginHorizontal: 'auto',
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: '400', // Regular weight
    color: '#808080', // Gray color
    marginBottom: 16,
    textAlign: 'center', // Center text horizontally
  },
  textInput: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '100%',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:9,
    width: '100%',
    marginVertical: 1,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF', // Default background color
    borderRadius: 50,
    padding: 7,
    borderWidth: 1, // Border width for the selected icon
  },
  itemImage4: {
    width: 18,
    height: 18,
    objectFit: 'contain',
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "lightgrey",
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 10,
    justifyContent: 'center',
    width: '40%',
    position: 'absolute',
    bottom: 25,
  },
  closeButtonText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  itemImage: {
    width: 20,
    height: 20,
  },
});

export default Home;
