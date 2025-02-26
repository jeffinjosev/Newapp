import {Dimensions, Platform} from 'react-native';
import Config from 'react-native-config';
export const API_BASE = Config.API_BASE;
export const MEDIA_DOMAIN = Config.MEDIA_DOMAIN;
export const API_SOCKET = Config.API_BASE;
export const PLATFORM = Platform.OS;
export const ISANDROID = Platform.OS === 'android';
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const SPLASH_DURATION = 500; //ms
export const NO_SUBSCRIPTION = 1; //ms
export const SUBSCRIBED = 2; //ms
export const SUBSCRIPTION_EXPIRED = 3;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const LOG = (label: string, ...value: any) => {
  console.log('*************', label, '*************');
  value && console.log(JSON.stringify(value));
};
export function GetCodePushKey() {
  return Platform.select({
    ios: Config.CODEPUSH_KEY_IOS,
    android: Config.CODEPUSH_KEY_ANDROID,
  });
}
export const WARN = (value?: any) => {
  value && console.warn(JSON.stringify(value));
};
export const ProfileImageBtnArray = [
  {label: 'Camera', index: 0},
  {label: 'Gallery', index: 1},
];
export const ChatFileBtnArray = [
  {label: 'Camera', index: 0},
  {label: 'Gallery', index: 1},
  {label: 'File', index: 2},
];
//
///Socket Events
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  RECONNECT: 'reconnect',
  CONNECTION_ERR: 'connect_error',
  LOGOUT: 'logout',
  USERUPDATED: 'user.update',
};
