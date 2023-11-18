import React, {useEffect} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {images} from '../constant/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {
  const isFocused = useIsFocused();

  const checkUser = async (user) => {
    // const localPref = await AsyncStorage.getItem('local_pref');
    // await setI18nConfig(localPref);
    if (user) {
      // saveLang(user);
      props.navigation.navigate('Home');
    } else {
      props.navigation.push('Login', {
        // lang: localPref ? localPref : i18n.locale,
        lang: 'fr',
      });
    }
  };

  const goOnBoard = async () => {
    const localPref = await AsyncStorage.getItem('local_pref');
    // await setI18nConfig(localPref);
    // props.navigation.push('OnBoarding', {
    //   lang: localPref ? localPref : i18n.locale,
    // });
    props.navigation.push('Login', {
        lang: 'fr',
      });
  };

  useEffect(() => {
    if (isFocused) {
      // Parse.User.currentAsync()
      //   .then(function (user) {
      //     try {
      //       if (user != null) {
      //         user
      //           .fetch()
      //           .then((usr) => {
      //             checkUser(usr);
      //           })
      //           .catch((err) => {
      //             goOnBoard();
      //           });
      //       } else {
      //         goOnBoard();
      //       }
      //     } catch (error) {
      //       console.log(error);
      //       goOnBoard();
      //     }
      //   })
      //   .catch(function (err) {
      //     goOnBoard();
      //   });
        goOnBoard();
    }
  }, [props.navigation, isFocused]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image style={styles.logo} source={images.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '20%',
  },
});

export default Splash;
