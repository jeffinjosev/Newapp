import React from 'react';
import store from '../store/store';
import {Provider as ReduxProvider} from 'react-redux';
import {navigationRef} from '@helpers/NavigationHelper';
import {NavigationContainer} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import {ErrorFallBackComponent, ForceUpdate} from '@components/index';
// import crashlytics from '@react-native-firebase/crashlytics';
interface Props {
  children: JSX.Element;
}
const AppProvider = (props: Props) => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer ref={navigationRef}>
        <ErrorBoundary
          onError={() => {
            // let currentScreen = navigationRef.getCurrentRoute()?.name;
            // crashlytics().recordError(error, currentScreen);
          }}
          FallbackComponent={ErrorFallBackComponent}>
          {props.children}
          <ForceUpdate />
        </ErrorBoundary>
      </NavigationContainer>
    </ReduxProvider>
  );
};
export default AppProvider;
