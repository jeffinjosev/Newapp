import {Animated, ViewStyle} from 'react-native';

export type status = 'loading' | 'idle';
export interface AppState {
  splashscreenRendered: boolean;
  status: status;
}
export type ApiHeaderType = {
  'Content-Type': string;
  Authorization?: string;
};
export interface DeviceInfoParams {
  device_token: string | null;
  ip_address: string;
  device_os: string;
  device_model: string;
  app_version: string;
}
export type animation =
  | 'bounce'
  | 'flash'
  | 'jello'
  | 'pulse'
  | 'rotate'
  | 'rubberBand'
  | 'shake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInUp'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutUp'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedIn'
  | 'lightSpeedOut'
  | 'slideInDown'
  | 'slideInUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideOutDown'
  | 'slideOutUp'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInUp'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutUp'
  | 'zoomOutLeft'
  | 'zoomOutRight';
export type AppStackParamList = {
  Splash: undefined;
  Authentication: undefined;
  Onboard: undefined;
};
export type OnboardStackParamList = {
  Home: undefined;
  CreateNewPassword: undefined;
  PrivacyPolicy: undefined;
  Profile: undefined;
  EditProfile: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  CodeVerify: {session_id: string};
  NewPassword: {session_id: string};
};

export interface UserSliceState {
  User: {};
  isLoggedIn: boolean;
}

export interface SizeProp {
  width?: number;
  height?: number;
  compressImageQuality?: number;
}

export type FileMetaDataType = {
  uri?: string;
  type?: string;
  name?: string;
  filename?: any;
  mime?: any;
};

export interface OpenCameraProp extends SizeProp {
  cropping?: boolean;
}

export interface OpenGalleryProp extends SizeProp {
  cropping?: boolean;
  freeStyleCropEnabled?: boolean;
}

export interface OpenCropperProps extends SizeProp {
  uri: string;
  freeStyleCropEnabled?: boolean;
}
