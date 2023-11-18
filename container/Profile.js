import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Share,
  SafeAreaView,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Header} from '../component/Header';
import {RFValue} from 'react-native-responsive-fontsize';
import InAppReview from 'react-native-in-app-review';
import {color} from '../constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [show, setShow] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi, essaie cette application JennKim de vente de vetement lien: incoming',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <>
          <Header title={'My account'} />
          <View style={styles.break} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AccountInfo', {
                client: null,
                admin: false,
                title: 'My informations',
              });
            }}>
            <Text style={styles.menu}>{'Informations'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShow(!show);
            }}>
            <Text style={styles.menu}>{'Language'}</Text>
          </TouchableOpacity>
          {show ? (
            <>
              {/* <TouchableOpacity
                onPress={() => {
                  AsyncStorage.setItem('local_pref', 'fr');
                  // RNRestart.Restart();
                }}>
                <Text
                  style={
                    i18n.locale === 'fr'
                      ? styles.submenuSelected
                      : styles.submenu
                  }>
                  Français
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.setItem('local_pref', 'en');
                  // RNRestart.Restart();
                }}>
                <Text
                  style={
                    i18n.locale === 'en'
                      ? styles.submenuSelected
                      : styles.submenu
                  }>
                  English
                </Text>
              </TouchableOpacity> */}
            </>
          ) : null}
          <View style={styles.break} />
          <TouchableOpacity
            onPress={() => {
              InAppReview.RequestInAppReview()
                .then((hasFlowFinishedSuccessfully) => {
                  // when return true in android it means user finished or close review flow
                  console.log(
                    'InAppReview in android',
                    hasFlowFinishedSuccessfully,
                  );

                  // when return true in ios it means review flow lanuched to user.
                  console.log(
                    'InAppReview in ios has lauch successfully',
                    hasFlowFinishedSuccessfully,
                  );

                  if (hasFlowFinishedSuccessfully) {
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}>
            <Text style={styles.menuSub}>{'Rate our app'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //todo logout
              navigation.dispatch(StackActions.popToTop());
            }}>
            <Text style={styles.menuSub}>{'Log out'}</Text>
          </TouchableOpacity>
        </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  logo: {
    width: '40%',
    height: '10%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300',
    marginTop: 10,
  },
  menu: {
    fontSize: RFValue(28),
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'flex-start',
    lineHeight: 45,
    marginLeft: 25,
  },
  submenu: {
    fontSize: RFValue(20),
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  submenuSelected: {
    fontSize: RFValue(20),
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'flex-start',
    marginLeft: 25,
    color: color.pink,
  },
  menuSub: {
    fontSize: RFValue(24),
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'flex-start',
    lineHeight: 40,
    marginLeft: 25,
  },
  version: {
    fontSize: RFValue(10),
    fontFamily: 'D-DINCondensed',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 10,
  },
  break: {
    height: 70,
  },
});

export default Profile;
