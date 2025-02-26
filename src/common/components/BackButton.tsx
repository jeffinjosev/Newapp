import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {WHITE} from '@styles/colors';
import {goBack} from '../helpers/NavigationHelper';
import common from '@styles/common';
import {Mixins} from '@src/styles';
interface Props {
  overrideAction?: () => void;
  style: ViewStyle;
  renderIcon?: JSX.Element;
}
const BackButton = (props: Props) => {
  const {overrideAction, renderIcon, style} = props;
  return (
    <Pressable
      style={[style, common.center]}
      onPress={
        overrideAction
          ? overrideAction
          : () => {
              goBack();
            }
      }>
      {renderIcon ? (
        renderIcon
      ) : (
        <AntDesign name="arrowleft" color={WHITE} size={Mixins.scaleSize(30)} />
      )}
    </Pressable>
  );
};
export default BackButton;
