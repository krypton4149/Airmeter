import { useNavigation as useNativeNavigation, DrawerActions } from '@react-navigation/native';

const useAppNavigation = () => {

    const nativeNavigation = useNativeNavigation();

    const navigateToScreen = (screenName, screenProps) => {
        nativeNavigation.navigate(screenName, screenProps);
    };

    const navigateToPreviousScreen = () => {
        nativeNavigation.goBack();
    };

    const setNavigationOption = (options) => {
        nativeNavigation.setOptions({ ...options })
    };

    const toggleDrawer = () => {
        nativeNavigation.dispatch(DrawerActions.toggleDrawer())
    };

    return { navigateToScreen, navigateToPreviousScreen, setNavigationOption, toggleDrawer };
}

export default useAppNavigation;