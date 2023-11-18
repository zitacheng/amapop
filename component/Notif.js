import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {basic} from '../constant/basic';
import {images} from '../constant/images';
import {RFValue} from 'react-native-responsive-fontsize';
import NotificationSetting from 'react-native-open-notification';
import {Platform} from 'react-native';
var PushNotification = require('react-native-push-notification');
// const Parse = require('parse/react-native.js');

// eslint-disable-next-line prettier/prettier
export const Notif = ({newAccount, navigation, setShowNotif}) => {
//   const user = Parse.User.current();
  function askNotif() {
    PushNotification.requestPermissions();
    // if (user.get('notif') != true) {
    //   user.set('notif', true);
    //   user.save(null, {useMasterKey: true}).then(
    //     (res) => {
    //       console.log('user activate notif', res);
    //     },
    //     (err) => {
    //       console.log('err saving', err);
    //     },
    //   );
    // }
  }

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, {marginTop: newAccount ? 30 : 0}]}
        source={images.logo}
        resizeMode="contain"
      />
      <View style={styles.top}>
        <Image style={styles.img} source={logo} resizeMode="contain" />
        <Text style={styles.big}>{"Don't miss out. !"}</Text>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.header}>{"Get notified when your pop is excahnged"}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            if (newAccount === true) {
              askNotif();
              navigation.navigate('NotValidate');
            } else {
              if (user.get('notif') == true || Platform.OS != 'ios') {
                NotificationSetting.open();
              } else {
                askNotif();
                // PushNotification.requestPermissions();
              }
            }
          }}>
          <Text style={basic.btnTxt}>{"Activate notification"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btnOff}
          onPress={() => {
            if (newAccount === true) {
              navigation.navigate('NotValidate');
            } else {
              setShowNotif(false);
            }
          }}>
          <Text style={basic.btnTxt}>{"Later"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    fontFamily: 'Helvetica-Bold',
    fontSize: RFValue(20),
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  big: {
    fontFamily: 'Helvetica-Bold',
    fontSize: RFValue(30),
    textTransform: 'uppercase',
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  info: {
    fontFamily: 'Helvetica-Bold',
    fontSize: RFValue(20),
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'column',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  img: {
    width: '50%',
    height: 120,
    marginTop: 30,
    marginBottom: 30,
  },
  logo: {
    width: '70%',
    height: 50,
    alignSelf: 'center',
  },
});
