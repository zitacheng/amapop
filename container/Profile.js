import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Image,
  FlatList,
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
  const looking = [
      {id: 1, pic: images.gallery, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 2, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 3, pic: images.gallery3, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 4, pic: images.avatar, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 5, pic: images.gallery, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 6, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 7, pic: images.avatar, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 8, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 9, pic: images.gallery4, looking: true, selling: false, changing: false, price: null, available: false},
    ];

  const changing = [
      {id: 10, pic: images.gallery2, looking: false, selling: true, changing: true, price: 14, available: true},
      {id: 12, pic: images.gallery3, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 13, pic: images.avatar, looking: false, selling: true, changing: true, price: 28, available: true},
      {id: 14, pic: images.gallery4, looking: false, selling: true, changing: true, price: 13, available: true},
      {id: 15, pic: images.gallery2, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 16, pic: images.gallery, looking: false, selling: true, changing: true, price: 12, available: true},
      {id: 17, pic: images.avatar, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 18, pic: images.gallery3, looking: false, selling: true, changing: true, price: 13, available: true},
      {id: 19, pic: images.gallery2, looking: false, selling: true, changing: true, price: 12, available: true},
      {id: 20, pic: images.gallery4, looking: false, selling: true, changing: true, price: 15, available: true},
      {id: 21, pic: images.gallery2, looking: false, selling: true, changing: true, price: 17, available: true},
      {id: 21, pic: images.avatar, looking: false, selling: true, changing: true, price: 17, available: true},
    ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        {/* <UserAvatar size={90} name="userPicture" bgColor={color.grey} src={images.avatar} /> */}
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <Text style={styles.title}>Username</Text>
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
      <FlatList
        data={sell == true ? changing : looking}
        numColumns={2}
        columnWrapperStyle={styles.row} 
        renderItem={({item}) => {
          return (
          <View style={styles.card}>
            <Image style={styles.cardImg} source={item.pic} resizeMode="cover" />
          </View>
          )
        }}
        keyExtractor={item => item.id}
      />
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
    backgroundColor: color.lightOrange
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
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
    backgroundColor: color.pink,
    padding: 10,
    borderRadius: 18,
  },
  badgeOff: {
    backgroundColor: color.ligtGrey,
    padding: 10,
    borderRadius: 18,
  },
  txt: {
    color: 'white',
    fontFamily: 'Helvetica-Bold'
  },
  title: {
    color: color.pink,
    fontFamily: 'Helvetica',
    fontSize: 20
  },
  rounded: {
    borderRadius: 50,
    width: 100,
    height: 100
  },
  card: {
    width: '45%',
    height:150,
    borderRadius: 6,
    marginBottom: 15,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  }
});

export default Profile;
