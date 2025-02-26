import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {FONT_FAMILY_REGULAR} from '@styles/typography';
import BackButton from './BackButton';
import {Mixins} from '@src/styles';
export interface HeaderProps {
  title?: string;
  subTitle?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  renderLeftIcon?: JSX.Element;
  renderRightIcon?: JSX.Element;
  overrideLeftAction?: () => void;
  rightAction?: () => void;
  titleAlign?: 'left' | 'center' | 'right';
  isRounded?: boolean;
}
const CustomHeader = (props: HeaderProps) => {
  const {
    leftIcon,
    overrideLeftAction,
    rightAction,
    title,
    rightIcon,
    renderLeftIcon,
    renderRightIcon,
    subTitle,
    titleAlign,
    isRounded,
  } = props;
  return (
    <View style={[styles.container, isRounded ? styles.border : undefined]}>
      <View style={styles.statusPadding} />
      <View style={styles.headerContainer}>
        {leftIcon ? (
          <BackButton
            style={styles.btn}
            overrideAction={overrideLeftAction}
            renderIcon={renderLeftIcon}
          />
        ) : (
          <View style={[{flex: 0.1}, common.center]} />
        )}
        <View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {flex: !leftIcon ? 0.8 : 0.6},
            titleAlign === 'center'
              ? common.center
              : titleAlign === 'right'
              ? common.right
              : common.left,
          ]}>
          <Text numberOfLines={2} style={[styles.title, {fontSize: 22}]}>
            {title}
          </Text>
          {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
        </View>
        {rightIcon ? (
          <Pressable style={[{flex: 0.4}, common.center]} onPress={rightAction}>
            {renderRightIcon}
          </Pressable>
        ) : (
          <View style={[styles.btn, common.center]} />
        )}
      </View>
    </View>
  );
};
export default React.memo(CustomHeader);
const styles = StyleSheet.create({
  container: {width: '100%', height: 100},
  border: {borderBottomStartRadius: 14, borderBottomEndRadius: 14},
  statusPadding: {height: 30},
  headerContainer: {width: '100%', height: 70, flexDirection: 'row'},
  btn: {flex: 0.2},
  title: {
    color: WHITE,
    fontSize: Mixins.scaleFont(22),
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  subtitle: {
    color: WHITE,
    fontSize: Mixins.scaleFont(20),
    fontFamily: FONT_FAMILY_REGULAR,
  },
});
