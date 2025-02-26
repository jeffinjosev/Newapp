import {Dimensions, PixelRatio} from 'react-native';
import {ISANDROID} from '@helpers/Global';
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;

export const scaleSize = (size: number) => {
  return WINDOW_HEIGHT < 896 && !ISANDROID
    ? (size * WINDOW_HEIGHT) / 896
    : size;
};
//(WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => {
  return WINDOW_HEIGHT < 896 && !ISANDROID
    ? (size * WINDOW_HEIGHT) / 896 + 2
    : size;
};
//  {
//     if (WINDOW_HEIGHT > 800) {
//         return size;
//     }
//     return size - 3;
// };
//size * PixelRatio.getFontScale();

function dimensions(
  top: number | string,
  right = top,
  bottom = top,
  left = right,
  property: any,
) {
  let styles: any = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color: string,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
