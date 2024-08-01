import React from 'react';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const LinearBackground = ({ children }) => {

  return (
    <LinearGradient
      colors={['#ECF4FF', '#F8FFFC']} // Define your gradient colors
      start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};


export default LinearBackground;
