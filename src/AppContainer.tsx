import {useSelector} from 'react-redux';
import {getSplashStatus} from '@src/appSlice';
import {getLoggedStatus} from '@onboardFlow/userSlice';
import {useEffect} from 'react';
import {CheckIfUserLoggedIn} from '@helpers/Utils';
import {Reset} from '@helpers/NavigationHelper';
import AppNavigator from '@navigation/AppNavigator';
import {ActivityIndicator} from '@components/index';
import {AUTHENTICATION, ONBOARD} from '@navigation/ScreenNames';
import FlashMessage from 'react-native-flash-message';
import SocketIOClient from '@helpers/SocketHelper';
import {AppState} from 'react-native';

const App = () => {
  const splashStatus = useSelector(getSplashStatus);
  const loggedInStatus = useSelector(getLoggedStatus);
  const socketClient = SocketIOClient.getInstance();
  useEffect(() => {
    CheckIfUserLoggedIn();
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        let socket = socketClient.getSocket();
        if (loggedInStatus && !socket?.connected) {
          socketClient.connect();
        }
      }
    };
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (splashStatus) {
      if (loggedInStatus) {
        Reset(ONBOARD);
        // CheckNotificationPermission();
        socketClient.connect();
        return;
      }
      //   CheckNotificationPermission();
      Reset(AUTHENTICATION);
      socketClient.disconnect();
      return;
    }
  }, [splashStatus, loggedInStatus]);
  return (
    <>
      <AppNavigator />
      {/* @ts-ignore */}
      <FlashMessage position="top" />
      <ActivityIndicator />
    </>
  );
};
export default App;
