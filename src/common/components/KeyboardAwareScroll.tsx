import React, {forwardRef, ReactChild, ReactFragment, ReactPortal} from 'react';
import {NativeSyntheticEvent, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

export interface KASProps {
  children?: ReactNode;
  contentContainerStyle?: any;
  avoidBottomPadding?: boolean;
  disableresetToCoords?: boolean;
  //@ts-ignore
  onScroll?: (event: NativeSyntheticEvent) => void;
}

const KeyboardAwareScroll = forwardRef((props: KASProps, ref) => {
  return (
    <KeyboardAwareScrollView
      keyboardOpeningTime={Number.MAX_VALUE}
      keyboardDismissMode="on-drag"
      enableResetScrollToCoords={!props.disableresetToCoords}
      //@ts-ignore
      ref={ref}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={[
        styles.container,
        {paddingBottom: props.avoidBottomPadding ? 0 : 30},
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
      onScroll={event => {
        props?.onScroll ? props?.onScroll(event) : null;
      }}>
      {props.children}
    </KeyboardAwareScrollView>
  );
});
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default KeyboardAwareScroll;
