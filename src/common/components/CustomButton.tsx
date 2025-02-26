import type {PropsWithChildren, ReactNode} from 'react';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import _ from 'lodash';
import {Colors, Common, Mixins, Typography} from '@styles/index';
type MyButtonProps = PropsWithChildren<{
  label?: string | ReactNode;
  buttonViewStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  onPress?: any;
  disabled?: boolean;
  noShadow?: boolean;
}>;

const CustomButton = ({
  label,
  buttonViewStyle,
  buttonTextStyle,
  onPress,
  disabled,
  noShadow,
}: MyButtonProps) => {
  const debouncedOnPress = _.debounce(onPress || undefined, 1000, {
    leading: true,
    trailing: false,
  });
  return (
    <TouchableScale
      onPress={() => {
        Keyboard.dismiss();
        debouncedOnPress();
      }}
      disabled={disabled}
      friction={90}
      tension={100}
      activeScale={0.95}
      style={[
        !noShadow && style.shadow,
        style.buttonViewStyle,
        buttonViewStyle,
      ]}>
      {/* <View
        style={[
          !noShadow && style.shadow,
          style.buttonViewStyle,
          buttonViewStyle,
        ]}> */}
      {label && (
        <Text
          style={[
            style.buttonTextStyle,
            styles.additionalTextStyle,
            buttonTextStyle,
          ]}>
          {!!label && label}
        </Text>
      )}
      {/* </View> */}
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  additionalTextStyle: {
    minHeight: 20,
  },
});

export default CustomButton;
const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    width: '100%',
  },
  buttonTextStyle: {
    fontSize: Mixins.scaleFont(20),
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM,
    lineHeight: Typography.LINE_HEIGHT_24,
    color: Colors.WHITE,
  },
  buttonViewStyle: {
    backgroundColor: Colors.BUTTON_BG,
    height: Mixins.scaleSize(60),
    borderRadius: Mixins.scaleSize(30),
    ...Common.center,
    minWidth: '100%',
  },
});
