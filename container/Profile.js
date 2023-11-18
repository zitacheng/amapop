import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Image,
  Share,
  SafeAreaView,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {color} from '../constant/color';
import {images} from '../constant/images';
import {basic} from '../constant/basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from 'react-native-user-avatar';

const Profile = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.out} onPress={() => {navigation.dispatch(StackActions.popToTop())}}>
        <Image style={styles.outImg} source={images.out} resizeMode="contain" />
      </TouchableOpacity>
      <StatusBar barStyle="dark-content" />
          <UserAvatar size={100} name="userPicture" bgColor={'transparent'} src={images.avatar} />
    </SafeAreaView>
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
    width: '40%',
    height: '10%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  break: {
    height: 70,
  },
  out: {
    position: 'absolute',
    top :20,
    right: 20
  },
  outImg: {
    width: 40,
    height: 40
  }
});

export default Profile;
