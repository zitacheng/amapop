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
import { LinearGradient } from 'expo-linear-gradient';

const Profile = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [look, setLooking] = useState(true);
  const looking = [
      {id: 1, pic: images.gallery, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 2, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 3, pic: images.gallery3, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 4, pic: images.gallery5, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 5, pic: images.gallery, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 6, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 7, pic: images.gallery5, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 8, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false},
      {id: 9, pic: images.gallery4, looking: true, selling: false, changing: false, price: null, available: false},
    ];

  const changing = [
      {id: 10, pic: images.gallery2, looking: false, selling: true, changing: true, price: 14, available: true},
      {id: 12, pic: images.gallery3, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 13, pic: images.gallery5, looking: false, selling: true, changing: true, price: 28, available: true},
      {id: 14, pic: images.gallery4, looking: false, selling: true, changing: true, price: 13, available: true},
      {id: 15, pic: images.gallery2, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 16, pic: images.gallery, looking: false, selling: true, changing: true, price: 12, available: true},
      {id: 17, pic: images.gallery5, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 18, pic: images.gallery3, looking: false, selling: true, changing: true, price: 13, available: true},
      {id: 19, pic: images.gallery2, looking: false, selling: true, changing: true, price: 12, available: true},
      {id: 20, pic: images.gallery4, looking: false, selling: true, changing: true, price: 15, available: true},
      {id: 21, pic: images.gallery2, looking: false, selling: true, changing: true, price: 17, available: true},
      {id: 21, pic: images.gallery5, looking: false, selling: true, changing: true, price: 17, available: true},
    ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.header, basic.shadow]}>
        {/* <UserAvatar size={90} name="userPicture" bgColor={color.grey} src={images.avatar} /> */}
        <View style={styles.imgBox}>
          <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
          {/* <Text style={styles.title}>Username</Text> */}
        </View>
        <View  style={styles.iconBox}>
          <TouchableOpacity style={styles.col} onPress={() => {setLooking(false)}}>
            <View style={!look ? styles.iconBg : styles.iconBgT}>
              <Image style={styles.icon} source={images.exchange} resizeMode="cover" />
            </View>
            <Text style={!look ? styles.colTxtBigOn : styles.colTxtBig}>Exchange</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.col} onPress={() => {setLooking(true)}}>
            <View style={look ? styles.iconBg : styles.iconBgT}>
              <Image style={styles.icon} source={images.looking} resizeMode="cover" />
            </View>
            <Text style={look ? styles.colTxtBigOn : styles.colTxtBig}>Looking</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
      <FlatList
        data={look == true ? looking : changing}
        numColumns={2}
        columnWrapperStyle={styles.row} 
        renderItem={({item}) => {
          return (
          <View style={[styles.card, basic.shadow]}>
            <Image style={styles.cardImg} source={item.pic} resizeMode="cover" />
            <View style={styles.cardBottom}>
              <Text style={styles.cardtxt}>Hirono Mischief - Destroyer</Text>
            </View>
            {/* {
              item.looking != true &&
              <View style={styles.cardPrice}>
                <Text style={styles.price}>15€</Text>
              </View>
            } */}
          </View>
          )
        }}
        keyExtractor={item => item.id}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '95%',
    borderRadius: 80,
    backgroundColor: 'white',
  },
  content: {
    flex: 5,
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    marginTop: 20,
    alignSelf: 'center'
  },
  rowHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
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
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 20,
    marginTop: 5
  },
  rounded: {
    borderRadius: 50,
    width: 100,
    height: 100
  },
  card: {
    width: '45%',
    height:350,
    borderRadius: 6,
    marginBottom: 15,
    position: 'relative'
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: color.ultraLightPurple
  },
  cardBottom: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    borderRadius: 6,
    padding: 10,
  },
  cardtxt: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: 'white'
  },
  cardPrice: {
    backgroundColor: color.pink,
    position: 'absolute',
    width: 60,
    height: 30,
    borderRadius: 15,
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: 'white'
  },
  imgBox: {
    flexDirection: 'col',
    display: 'flex',
  },
  iconBox: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  colTxt: {
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center',
    fontSize: 18,
    color: color.grey
  },
  colTxtBig: {
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center',
    fontSize: 14,
    color: color.ligtGrey,
    marginTop: 10,
  },
  colTxtBigOn: {
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center',
    fontSize: 14,
    color: color.pink,
    marginTop: 10,
  },
  iconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 5,
    backgroundColor: color.ultraLightPurple,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBgT: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 5,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
  }
});

export default Profile;
