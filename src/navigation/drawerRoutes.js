import { createDrawerNavigator } from "@react-navigation/drawer";
import routesConstants from "../constants/routesConstants";
import { TabNavigator } from "./bottomTabRoutes";
import AppDrawer from "../components/AppDrawer";
import Profile from "../screens/home/Profile";
import Cancel from "../screens/settings/Cancel";
import Delete from "../screens/settings/Delete";
import Landlord from "../screens/settings/Landlord";
import PaymentHistory from "../screens/settings/PaymentHistory";
import Device from "../screens/settings/Device";
import StartTenancy from "../screens/settings/StartTenancy";



const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <AppDrawer {...props} />}>
            <Drawer.Screen
                name={routesConstants.HOME_STACK}
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name={routesConstants.START_TENANCY}
                component={StartTenancy}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name={routesConstants.PROFILE}
                component={Profile}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name={routesConstants.CANCEL_TENANCY}
                component={Cancel}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name={routesConstants.DELETE_ACCOUNT}
                component={Delete}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name={routesConstants.MY_LANDLORD}
                component={Landlord}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name={routesConstants.PAYMENT_HISTORY}
                component={PaymentHistory}
                options={{ headerShown: false }}
            />
        <Drawer.Screen
            name={routesConstants.DEVICE}
            component={Device}
            options={{ headerShown: false }}
        />
       
        </Drawer.Navigator>
    );
};  