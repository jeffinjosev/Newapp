import {
  NativeSyntheticEvent,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import KeyboardAwareScroll, {KASProps} from './KeyboardAwareScroll';
import {PRIMARY} from '@styles/colors';
import common from '@styles/common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useMemo} from 'react';
import CustomHeader, {HeaderProps} from './CustomHeader';

interface Props extends KASProps, HeaderProps {
  //HeaderProps
  children: React.ReactNode;
  barStyles?: StatusBarStyle;
  noScroll?: boolean;
  colors?: Array<String>;
  statusBarColor?: string;
  scrollRef?: KeyboardAwareScrollView;
  //@ts-ignore
  onScroll?: (event: NativeSyntheticEvent) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  hideBottomShadow?: boolean;
  noHeader?: boolean;
  isGradient?: boolean;
  avoidBottomPadding?: boolean;
  contentContainerStyle?: ViewStyle | ViewStyle[];
  disableresetToCoords?: boolean;
}

const BoxContainer = (props: Props) => {
  const Content = useMemo(() => {
    return (
      <>
        {props.noHeader && (
          <StatusBar
            animated
            translucent={true}
            backgroundColor={
              props.statusBarColor ? props.statusBarColor : PRIMARY
            }
            barStyle={props.barStyles ? props.barStyles : 'light-content'}
          />
        )}

        {!props.noHeader && (
          <View style={[styles.header]}>{<CustomHeader {...props} />}</View>
        )}
        <View
          style={[
            {flex: !props.noHeader ? 0.85 : 1, marginBottom: 1},
            common.pt2,
            props.contentContainerStyle,
          ]}>
          {'noScroll' in props && props.noScroll ? (
            props.children
          ) : (
            <KeyboardAwareScroll
              //@ts-ignore
              disableresetToCoords={props.disableresetToCoords}
              ref={props?.scrollRef}
              avoidBottomPadding={
                props.avoidBottomPadding ? props.avoidBottomPadding : false
              }
              onScroll={event => {
                props.onScroll ? props.onScroll(event) : null;
              }}>
              {props.children}
            </KeyboardAwareScroll>
          )}
        </View>
      </>
    );
  }, [props]);
  return (
    <View style={[common.flexone, common.whitebg, props.containerStyle]}>
      {Content}
    </View>
  );
};

export default BoxContainer;
const styles = StyleSheet.create({
  header: {flex: 0.15, maxHeight: 100},
});
