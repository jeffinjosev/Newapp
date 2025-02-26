import {StackNavigationOptions} from '@react-navigation/stack';

export const AppScreenOptions = {
  gestureEnabled: false,
  animation: 'slide_from_right',
  headerShadowVisible: false,
  headerBackVisible: false,
  headerStyle: {
    backgroundColor: '#f4f4f5',
  },
};

export const AppOptions: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: true,
  animationTypeForReplace: 'push',
};
