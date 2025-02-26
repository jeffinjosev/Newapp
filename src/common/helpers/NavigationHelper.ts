import {
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import {
  AppStackParamList,
  AuthStackParamList,
  OnboardStackParamList,
} from '@src/types';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();
export type RouteStringType =
  | keyof AppStackParamList
  | keyof AuthStackParamList
  | keyof OnboardStackParamList;

export function navigate(name: RouteStringType, params?: any) {
  if (navigationRef.isReady()) {
    //@ts-ignore
    navigationRef.navigate(name, params);
  } else {
    setTimeout(() => {
      navigate(name, params);
    }, 200);
  }
}

export function push(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  } else {
    setTimeout(() => {
      navigationRef.dispatch(StackActions.push(name, params));
    }, 200);
  }
}
export function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  } else {
    setTimeout(() => {
      navigationRef.dispatch(StackActions.replace(name, params));
    }, 200);
  }
}
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
export function openDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.openDrawer());
  }
}
export function closeDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.closeDrawer());
  }
}
export function Reset(route: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({routes: [{name: route}]});
  }
}
