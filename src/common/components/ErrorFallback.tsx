import React, {useEffect} from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ISANDROID} from '../helpers/Global';

const App = (props: {error: Error; resetError: () => void}) => {
  useEffect(() => {
    if (!ISANDROID) {
      Alert.alert(
        'Unexpected error occurred !',
        'We have reported this to our team.\nPlease close the app and start again.',
        [
          {
            text: 'Ok',
            onPress: () => {
              props?.resetError?.();
            },
          },
        ],
      );
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {ISANDROID ? (
        <>
          <View style={styles.errorcontainer}>
            <Text style={styles.errorTitle}>Critical Error Occured</Text>

            <Text style={styles.errorSubTitle}>
              {
                'Unexpected error occurred !,We have reported this to our team.\n\nPlease close the app and start again.'
              }
            </Text>
            <View style={styles.btnContainer}>
              {/* @ts-ignore */}
              <TouchableOpacity onPress={props?.reset} style={styles.btnStyle}>
                <Text style={{fontWeight: '500'}}>RELAUNCH</Text>
              </TouchableOpacity>
              <View style={{width: 10}} />
              <TouchableOpacity
                onPress={() => {
                  props?.resetError?.();
                  BackHandler.exitApp();
                }}
                style={styles.quitbtn}>
                <Text style={{fontWeight: '500'}}>QUIT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.errorScroll}>
            <Text style={styles.errorDetails}>
              {props?.error?.message + '\nstack\n' + props?.error?.stack}
            </Text>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF', margin: 30},
  errorcontainer: {alignItems: 'center', marginVertical: 30},
  errorTitle: {fontSize: 20, fontWeight: 'bold'},
  errorSubTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  btnContainer: {flexDirection: 'row', marginTop: 30},
  btnStyle: {
    flex: 1,
    height: 45,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quitbtn: {
    flex: 1,
    height: 45,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorScroll: {flex: 1, backgroundColor: 'whitesmoke'},
  errorDetails: {opacity: 0.5, margin: 5},
});
