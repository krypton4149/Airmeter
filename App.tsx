import React, { useEffect } from 'react';
import AppRoutes from './src/navigation';
import useDeviceInfo from './src/utils/useDeviceInfo';
import { useUserDetails } from './src/context/userContext';


function App(): JSX.Element {

  const { networkStatus } = useDeviceInfo();

  useEffect(() => {
    //... Try refreshing the tokens.
    console.log("Network Status", networkStatus?.isConnected);
  }, [networkStatus?.isConnected]);

  return (
    <AppRoutes />

  );
}

export default App;