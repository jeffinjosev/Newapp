import ToastHelper from '@helpers/ToastHelper';
import DeviceInfo from 'react-native-device-info';
import StorageHelper from '@helpers/StorageHelper';
import {DeviceInfoParams} from '@src/types';
import {ISANDROID, PLATFORM} from '@helpers/Global';
import store from '@store/store';
import {setStatus} from '@src/appSlice';
import {GetLoggedUser, resetState, setUser} from '@onboardFlow/userSlice';
import {ClearAllStoredValues, getUserDetails} from '@helpers/LocalStorage';
// import SocketIOClient from './SocketHelper';

// const socketClient = SocketIOClient.getInstance();
export async function logout() {
  console.log('logout called==========XXX');
  store.dispatch(setStatus('loading'));
  await ClearAllStoredValues();
  store.dispatch(setUser({}));
  store.dispatch(setStatus('idle'));
  store.dispatch(resetState());
  //   socketClient.disconnect();
}
export const CheckIfUserLoggedIn = async () => {
  const userDataObj = await getUserDetails();
  if (userDataObj && Object.keys(userDataObj).length) {
    store.dispatch(GetLoggedUser({}));
    //store.dispatch(setUser(userDataObj));
  }
};
export async function getDeviceInfo() {
  let ip_address = await DeviceInfo.getIpAddress();
  let device_model = await DeviceInfo.getModel();
  let app_version = await DeviceInfo.getVersion();
  let device_token = await StorageHelper.getItem('@device_token');
  let info: DeviceInfoParams = {
    device_token,
    ip_address,
    device_os: PLATFORM,
    device_model,
    app_version,
  };
  return info;
}
export const DelayMilliSecs = (ms: number) => {
  return new Promise(resolve => {
    !ISANDROID
      ? setTimeout(() => {
          resolve(true);
        }, ms)
      : resolve(true);
  });
};
export const MobileNumberFormatter = (
  phoneNumberString: string | undefined,
) => {
  if (phoneNumberString?.length) {
    let cleanedNumber = phoneNumberString.replace(/\D/g, '')?.slice(0, 15);
    const length = cleanedNumber?.length;
    const firstPos =
      cleanedNumber?.length > 13
        ? 3
        : cleanedNumber?.length > 10
        ? length - 10
        : -1;
    const secondPos =
      cleanedNumber?.length > 13
        ? length - 8
        : cleanedNumber?.length > 10
        ? length - 7
        : 3;
    const thirdPos = cleanedNumber?.length > 10 ? length - 4 : 6;
    let formattedString = '';
    for (let i = 0; i < cleanedNumber.length; i++) {
      if (i === firstPos) formattedString += '-';
      if (i === secondPos) formattedString += '-';
      if (i === thirdPos) formattedString += '-';
      formattedString += cleanedNumber.charAt(i);
    }
    return formattedString;
  } else return null;
};
export const removeEmojis = (string: string) => {
  // emoji regex from the emoji-regex library
  let strCopy = string;
  const emojiKeycapRegex = /[\u0023-\u0039]\ufe0f?\u20e3/g;
  const emojiRegex = /\p{Extended_Pictographic}/gu;
  const emojiComponentRegex = /\p{Emoji_Component}/gu;
  if (emojiKeycapRegex.test(strCopy)) {
    strCopy = strCopy.replace(emojiKeycapRegex, '');
  }
  if (emojiRegex.test(strCopy)) {
    strCopy = strCopy.replace(emojiRegex, '');
  }
  if (emojiComponentRegex.test(strCopy)) {
    for (const emoji of strCopy.match(emojiComponentRegex) || []) {
      if (/[\d|*|#]/.test(emoji)) {
        continue;
      }
      strCopy = strCopy.replace(emoji, '');
    }
  }

  return strCopy;
};

export function isObjectValuesEmpty(obj: any) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      return true; // Return true if any value is empty
    }
  }
  return false; // Return false if no empty values are found
}

export const ShowErrorMessages = (errors: Array<any>) => {
  let error = '';
  console.log('errors', errors);
  for (let index = 0; index < errors.length; index++) {
    const element = errors[index];
    // if (Array.isArray(element)) {
    //     const constraintValue = element.constraints ? element.constraints[0] : '';
    //     console.log('constraintValue', constraintValue);
    //     error = error + constraintValue;
    // } else {
    const constraintValue = element.constraints
      ? Object.values(element.constraints)[0]
      : '';
    console.log('constraintValue', constraintValue);
    error = error + constraintValue;
    // }

    if (index !== errors.length - 1) {
      error = error + ', ';
    }
  }
  ToastHelper.error(JSON.stringify(error));
};

export const LimitText = (text: string, max: number) => {
  return text && text.length > max ? text.slice(0, max) + '...' : text;
};

export const formatDateString = dateString => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Extract the month, day, and year
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();

  // Format the date into MM/DD/YYYY
  return `${month}/${day}/${year}`;
};

export const getFullYear = dateString => {
  const date = new Date(dateString);
  return date.getUTCFullYear();
};
export function GetFormDataForUpload(data: Array<any> | Object = []) {
  let formData = new FormData();
  for (var key in data) {
    //@ts-ignore
    if (Array.isArray(data[key])) {
      //@ts-ignore
      if (key == 'preference_ids') {
        // let preference_ids = data[key].filter((num) => num !== 0);
        // if (preference_ids.length != 0) {
        //     formData.append(key, preference_ids);
        // } else {
        //     formData.append(key, null);
        // }
      } else {
        let array = data[key];
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          formData.append(key, element);
        }
      }
    } else {
      //@ts-ignore
      formData.append(key, data[key]);
    }
  }
  return formData;
}

const average = (a, b) => (a + b) / 2;
