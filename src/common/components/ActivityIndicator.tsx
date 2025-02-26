import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getStatus} from '@src/appSlice';
import LottieView from 'lottie-react-native';
import {LoaderLottie} from '@assets/lotties';
const Loader = () => {
  let loader = useSelector(getStatus);
  const indicator = useRef<LottieView>(null);
  useEffect(() => {
    if (loader === 'loading') {
      indicator?.current?.play();
    } else {
      indicator?.current?.pause();
    }
  }, [loader]);

  return loader === 'loading' ? (
    <View style={styles.container}>
      <View style={styles.viewStyle}>
        <LottieView
          ref={indicator}
          style={styles.lottieStyle}
          source={LoaderLottie}
          autoPlay={false}
          loop
          colorFilters={[
            {
              keypath: 'Shape Layer 2',
              color: '#D92528',
            },
            {
              keypath: 'Shape Layer 1',
              color: '#325C7D',
            },
          ]}
        />
      </View>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  diamond: {
    width: 42,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{rotate: '45deg'}],
    position: 'absolute',
  },
  container: {
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11111150',
    zIndex: 999,
    elevation: 999,
  },
  glowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    bottom: 0,
    left: 0,
    right: 4,
  },
  viewStyle: {
    //   backgroundColor: 'white',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    width: 150,
    height: 150,
    zIndex: 999,

    borderRadius: 45,
  },
});
export default Loader;
