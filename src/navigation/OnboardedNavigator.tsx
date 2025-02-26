import {createStackNavigator} from '@react-navigation/stack';
import {OnboardStackParamList} from '@src/types';
import {HOME} from '@navigation/ScreenNames';
import {AppOptions, AppScreenOptions} from '@navigation/NavigationOptions';
import React from 'react';
import {HomeScreen} from '@onboardFlow/screens';
const OnboardStack = createStackNavigator<OnboardStackParamList>();
const OnboardNavigator = () => {
  return (
    <OnboardStack.Navigator
      initialRouteName={HOME}
      screenOptions={AppScreenOptions}>
      <OnboardStack.Screen
        name={HOME}
        component={HomeScreen}
        options={AppOptions}
      />
    </OnboardStack.Navigator>
  );
};
export default OnboardNavigator;
