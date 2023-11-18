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
// import UserAvatar from 'react-native-user-avatar';

const Profile = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [sell, setSell] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        {/* <UserAvatar size={90} name="userPicture" bgColor={color.grey} src={images.avatar} /> */}
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <View style={styles.row}>
            <TouchableOpacity style={sell ? styles.badgeOn : styles.badgeOff} onPress={() => {setSell(true)}}>
              <Text style={styles.txt}>To sell / exchange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={!sell ? styles.badgeOn : styles.badgeOff} onPress={() => {setSell(false)}}>
              <Text style={styles.txt}>Looking</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Text>HELLO</Text>
      </View>
      <TouchableOpacity style={styles.out} onPress={() => {navigation.dispatch(StackActions.popToTop())}}>
        <Image style={styles.outImg} source={images.out} resizeMode="contain" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    flex: 2,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  content: {
    flex: 4,
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
    top :70,
    right: 30,
  },
  outImg: {
    width: 40,
    height: 40
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  badgeOn: {
    backgroundColor: color.lightYellow,
    padding: 10,
    borderRadius: 10,
  },
  badgeOff: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
  },
  txt: {
    color: color.darkOrange,
    fontFamily: 'Helvetica-Bold'
  },
  rounded: {
    borderRadius: 50,
    width: 100,
    height: 100
  }
});

export default Profile;
