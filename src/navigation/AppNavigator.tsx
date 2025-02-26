import React from 'react';
import {AppOptions, AppScreenOptions} from '@navigation/NavigationOptions';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from '@src/types';
import {AUTHENTICATION, ONBOARD, SPLASH} from '@navigation/ScreenNames';
import {SplashScreen} from '@authFlow/screens';
import OnboardNavigator from '@navigation/OnboardedNavigator';
import AuthNavigator from '@navigation/AuthNavigator';
const AppStack = createStackNavigator<AppStackParamList>();
const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={SPLASH}
      screenOptions={AppScreenOptions}>
      <AppStack.Screen
        name={SPLASH}
        component={SplashScreen}
        options={AppOptions}
      />
      <AppStack.Screen
        name={AUTHENTICATION}
        component={AuthNavigator}
        options={AppOptions}
      />
      <AppStack.Screen
        name={ONBOARD}
        component={OnboardNavigator}
        options={AppOptions}
      />
    </AppStack.Navigator>
  );
};
export default AppNavigator;
