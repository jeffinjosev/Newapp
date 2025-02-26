import {showMessage} from 'react-native-flash-message';
import {Mixins} from '@styles/index';
import {FONT_FAMILY_REGULAR} from '@styles/typography';
import {ISANDROID} from '@helpers/Global';
const toastLong = 5000;
const toastMedium = 3000;
const toastShort = 1000;

function error(
  message: string,
  duration = 'MEDIUM',
  position = 'top',
  description = '',
) {
  // ToastAction.danger({
  //   message: message,
  //   description: description,
  //   duration: toastMedium,
  // });
  showMessage({
    message: 'Message',
    description: message,
    type: 'danger',
    titleStyle: {fontFamily: FONT_FAMILY_REGULAR, fontSize: 16},
    textStyle: {fontFamily: FONT_FAMILY_REGULAR, fontSize: 14},
    style: {paddingTop: Mixins.scaleSize(ISANDROID ? 28 : 7)},
  });
}

function success(
  message: string,
  duration = 'MEDIUM',
  position = 'top',
  description = '',
) {
  // ToastAction.success({
  //   message: message,
  //   description: description,
  //   duration: toastMedium,
  // });
  showMessage({
    message: 'Message',
    description: message,
    type: 'success',
    titleStyle: {fontFamily: FONT_FAMILY_REGULAR, fontSize: 16},
    textStyle: {fontFamily: FONT_FAMILY_REGULAR, fontSize: 14},
    style: {paddingTop: Mixins.scaleSize(ISANDROID ? 28 : 7)},
  });
}

function notification(
  message: string,
  duration = 'MEDIUM',
  position = 'top',
  description = '',
) {
  // ToastAction.info({
  //   message: message,
  //   description: description,
  //   duration: toastMedium,
  // });
  showMessage({
    message: 'Message',
    description: message,
    type: 'info',
    titleStyle: {fontFamily: FONT_FAMILY_REGULAR, fontSize: 16},
    textStyle: {fontFamily: FONT_FAMILY_REGULAR, fontSize: 14},
  });
}

export default {
  error,
  success,
  notification,
};
