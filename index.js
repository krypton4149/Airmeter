/* eslint-disable prettier/prettier */

import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { UserProvider } from './src/context/userContext';

const Main = () => {

    return (
        <UserProvider>
            <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
            <App />
        </UserProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
