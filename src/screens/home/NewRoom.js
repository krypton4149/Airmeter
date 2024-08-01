import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import AppHeader from "../../components/AppHeader";
import LinearBackground from '../../components/LinearBackground';
import { bedroomIcon, dolorIcon, lightIcon } from '../../assets/icons'; // Import your icons as images
import routesConstants from '../../constants/routesConstants';

const NewRoom = ({ navigation }) => {

  const goToNewRoom = () => {
    navigation.navigate(routesConstants.NEW_ROOMS); // Navigate to the Profile screen
  };

  return (
    <LinearBackground>
      <SafeAreaView style={styles.container}>
        <AppHeader title="Good Morning" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.gridContainer}>
            <View style={[styles.card, styles.cardLocation]}>
              <View style={styles.iconbox}>
                <Image source={lightIcon} style={styles.icon} />
              </View>
              <View style={styles.cardcontain}>
                <Text style={styles.cardTitle}>Electricity Consumption</Text>
                <Text style={styles.cardMonth}>April</Text>
                <View style={styles.kwhContainer}>
                  <Text style={styles.kwhValue}>45</Text>
                  <Text style={styles.kwhLabel}>kwh</Text>
                </View>
                <Text style={styles.weather}>Last Month</Text>
                <Text style={styles.highLow}>35kwh</Text>
              </View>
            </View>
            <View style={[styles.card, styles.cardHome]}>
              <View style={styles.iconbox}>
                <Image source={dolorIcon} style={styles.icon} />
              </View>
              <View style={styles.cardcontain}>
                <Text style={styles.cardTitle}>Amount Due</Text>
                <Text style={styles.cardMonth}>April</Text>
                <View style={styles.kwhContainer}>
                  <Text style={styles.kwhValue}>$25.65</Text>

                </View>
                <Text style={styles.weather}>Last Month</Text>
                <Text style={styles.highLow}>$22.20</Text>
              </View>
            </View>
          </View>
          <View style={styles.roomsContainer}>
            <Text style={styles.roomsText}>Rooms</Text>
            <TouchableOpacity style={styles.RoomCard} onPress={goToNewRoom}>
              <View style={styles.RoomCardContent}>
                <View style={styles.iconBorder}>
                  <Image source={bedroomIcon} style={styles.RoomCardIcon} />
                </View>
                <Text style={styles.RoomCardTitle}>Bedroom</Text>
                <Text style={styles.RoomCardSubtitle}>0/7 Verified Room</Text>
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
    width: "100%",
    height: "100%",
  },
  scrollView: {
    paddingHorizontal: 10,
    alignItems: "center"
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingVertical: 30,
    gap: 20
  },
  card: {
    borderRadius: 10,
    padding: 5,
    margin: 4,
    justifyContent: "flex-start",
    width: 160,
    height: 172,
  },
  cardcontain: {
    padding: 5,
    alignItems: "center",
  },
  cardLocation: {
    backgroundColor: '#2E3C9E',
  },
  cardHome: {
    backgroundColor: '#BE17E7',
  },
  RoomCard: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    width: 160,
    height: 100,
    padding: 10,
    marginTop: 10, // Adjusts space between Rooms text and card
  },
  RoomCardContent: {
    alignItems: 'flex-start',
  },
  iconBorder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  RoomCardIcon: {
    width: 20,
    height: 20,
  },
  RoomCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  RoomCardSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: 'white',
    marginTop: 8,
    lineHeight: 16,
    fontFamily: "poppins",
    textAlign: "center"
  },
  cardMonth: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    marginTop: 4,
    lineHeight: 15,
    fontFamily: "poppins",
    textAlign: "center"
  },
  kwhContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  kwhValue: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  kwhLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginTop: 5,
  },
  weather: {
    fontSize: 12,
    color: 'white',
    fontFamily: "Poppins-Regular",
  },
  highLow: {
    fontSize: 12,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  tempHumid: {
    alignItems: 'center',
  },
  tempHumidValue: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  tempHumidLabel: {
    fontSize: 14,
    color: 'white',
  },
  iconbox: {
    borderRadius: 4,
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: "flex-start"
  },
  icon: {
    width: 7,
    height: 8,
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
  roomsContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10, // Padding around the Rooms text
  },
  roomsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 24,
  },

});

export default NewRoom;
