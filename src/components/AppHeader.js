import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { backIcon, drawerIcon, notificationIcon } from '../assets/icons';
import routesConstants from '../constants/routesConstants';
import useAppNavigation from '../utils/useAppNavigation';

const AppHeader = ({ title, subTitle, showDrawerIcon = true, showNotificationIcon = true }) => {
  const { toggleDrawer, navigateToScreen, navigateToPreviousScreen } = useAppNavigation();

  const onPressLeadingIcon = () => {
    toggleDrawer();
  };

  const onPressBackIcon = () => {
    navigateToPreviousScreen();
  };

  const handleNotificationPress = () => {
    navigateToScreen(routesConstants.NOTIFICATION);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Modify locale if needed
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <View style={styles.headerContainer}>
      {showDrawerIcon ? (
        <TouchableOpacity onPress={onPressLeadingIcon} style={styles.iconContainer}>
          <Image source={drawerIcon} style={{ height: 18, width: 18 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressBackIcon} style={styles.iconContainer}>
          <Image source={backIcon} resizeMode='contain' style={{ height: 16, width: 16 }} />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        {title ?
          <Text style={styles.title}>{title}</Text> :
          <>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
            <Text style={styles.title}>{getGreeting()}</Text>
          </>
        }
      </View>

      {showNotificationIcon ?
        <View style={{ flex: 0.2 }} >
          <TouchableOpacity onPress={handleNotificationPress} style={styles.iconNotification}>
            <Image source={notificationIcon} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View> :
        <View style={{ flex: 0.2 }} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  iconContainer: {
    flex: 0.2,
    padding: 12,
  },
  iconNotification: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1, // Add a border
    borderColor: 'gray',
    marginRight: 12,
    height: 48, width: 48
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold', // You can keep this or remove it since we're using a custom font weight
    fontFamily: 'Poppins-SemiBold', // Ensure this matches the font family name
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'gray',
    textAlign: 'center',
  },
});

export default AppHeader;
