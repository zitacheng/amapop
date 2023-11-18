import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import {basic} from '../constant/basic';
// import {translate} from '../constant/config.js';
// import {MultiLang} from '../component/Multilang';

console.log("ONBOARDING");

const OnBoarding = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* <MultiLang /> */}
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      <TouchableOpacity
        style={basic.btn}
        onPress={() => {
          props.navigation.navigate('Login');
        }}>
        <Text style={basic.btnTxt}>{'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={basic.btn}
        onPress={() => {
          props.navigation.navigate('Register');
        }}>
        <Text style={basic.btnTxt}>{'Create an account'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  logo: {
    width: '70%',
    height: '20%',
    alignSelf: 'center',
    marginTop: '40%',
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'D-DINCondensed-Bold',
  },
});

export default OnBoarding;
