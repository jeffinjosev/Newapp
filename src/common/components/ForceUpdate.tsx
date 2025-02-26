import React, {useEffect, useState} from 'react';
import VersionCheck from 'react-native-version-check';
import Modal from 'react-native-modal';
import {Linking, StyleSheet, Text, View} from 'react-native';

import {CustomButton} from '@components/index';
import Config from 'react-native-config';
import {FONT_FAMILY_MEDIUM, FONT_FAMILY_REGULAR} from '@styles/typography';

const ForceUpdate = () => {
  const [showUpdateModal, setModalVisibility] = useState(false);
  const [storeLink, setStoreLink] = useState('');
  useEffect(() => {
    if (Config.ENVIORNMENT === 'production') {
      console.warn('called', Config.ENVIORNMENT);

      checkForAppUpdates();
    }
  }, []);

  const checkForAppUpdates = () => {
    VersionCheck.getLatestVersion(/*{country:'US'}*/).then(latestVersion => {
      console.log('latest_version', latestVersion, typeof latestVersion); // 0.1.2
      if (latestVersion) {
        VersionCheck.needUpdate().then(async res => {
          console.log('needupdate_result_object :', res); // true
          if (res.isNeeded) {
            setModalVisibility(true);
            setStoreLink(res.storeUrl);
            // Linking.openURL(res.storeUrl); // open store if update is needed.
          }
        });
      }
    });
  };

  return (
    <>
      <Modal
        isVisible={showUpdateModal}
        useNativeDriver={true}
        animationIn="zoomIn"
        animationOut={'zoomOut'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        animationOutTiming={300}
        style={{}}>
        <View style={styles.outerView}>
          <Text style={styles.updateTxt}>UPDATE APP !</Text>
          <Text style={styles.updateDescriptionTxt}>
            Kindly update app to latest version to continue using US Health
            Advisors
          </Text>
          {storeLink ? (
            <CustomButton
              label={'Update'}
              onPress={() => Linking.openURL(storeLink)}
            />
          ) : null}
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  outerView: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 50,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  updateTxt: {
    fontSize: 15,
    color: '#000',
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
  updateDescriptionTxt: {
    textAlign: 'center',
    color: '#000',
    fontFamily: FONT_FAMILY_REGULAR,
    paddingVertical: 5,
  },
});
export default ForceUpdate;
