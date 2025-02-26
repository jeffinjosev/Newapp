import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AuthStackParamList} from '@src/types';
import {
  CODEVERIFY,
  FORGOTPASSWORD,
  LOGIN,
  NEWPASSWORD,
} from '@navigation/ScreenNames';
import {AppOptions, AppScreenOptions} from '@navigation/NavigationOptions';
import {
  CodeVerificationScreen,
  ForgotPasswordScreen,
  LoginScreen,
  NewPasswordScreen,
} from '@authFlow/screens';
const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={LOGIN}
      screenOptions={AppScreenOptions}>
      <AuthStack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={AppOptions}
      />
      <AuthStack.Screen
        name={FORGOTPASSWORD}
        component={ForgotPasswordScreen}
        options={AppOptions}
      />
      <AuthStack.Screen
        name={CODEVERIFY}
        component={CodeVerificationScreen}
        options={AppOptions}
      />
      <AuthStack.Screen
        name={NEWPASSWORD}
        component={NewPasswordScreen}
        options={AppOptions}
      />
    </AuthStack.Navigator>
  );
};
export default AuthNavigator;
