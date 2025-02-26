import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {WHITE} from '@styles/colors';
import {AppIcon} from '@assets/images';
import {SPLASH_DURATION} from '@helpers/Global';
import {useDispatch} from 'react-redux';
import {setSplashScreenStatus} from '@src/appSlice';
const SplashScreen = () => {
  const {container, image} = styles;
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setSplashScreenStatus(true));
    }, SPLASH_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={container}>
      <Image source={AppIcon} style={image} />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 283, height: 116},
});
