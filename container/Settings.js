import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';

Icon.loadFont();

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.center}>
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <Text style={styles.label}>Username</Text>
        <Text style={styles.label}>example98@gmail.com</Text>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            logUser();
          }}>
          <Text style={basic.btnTxt}>{"Whatsapp"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btnWhiteout}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={basic.btnTxtOut}>{"Log out"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    justifyContent: 'center'
  },
  rounded: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  label: {
    color: color.grey,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center'
  }
});

export default Settings;
