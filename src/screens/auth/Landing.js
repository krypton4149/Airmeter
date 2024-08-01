// Landing.js
import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';

import routesConstants from '../../constants/routesConstants';

const Landing = ({ navigation }) => {

  const handleStartPress = () => {
    navigation.navigate(routesConstants.SIGN_IN);
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/image2.png')} 
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.appName}>Smartbill</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleStartPress}>
            <Text style={styles.buttonText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    
    // Adjust the opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    color: 'white',
    fontWeight: '700',
    marginBottom: 20, // Adjust margin as needed
    fontFamily: 'Poppins'
    
  },
  buttonContainer: {
    width:179,
    
    position: 'absolute',
    bottom: 50, // Adjust the distance from the bottom
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50, // Make the border radius more cylindrical
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white', // Change background color to white
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default Landing;
