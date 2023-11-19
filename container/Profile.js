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
        <View style={styles.imgBox}>
          <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
          <View style={styles.titleBox}>
            <Text style={styles.title}>Username</Text>
              <View style={styles.rowHead}>
                <TouchableOpacity style={styles.col} onPress={() => {setSell(true)}}>
                  <Text style={styles.colTxt}>J'echange</Text>
                  <Text style={styles.colTxt}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.col} onPress={() => {setSell(false)}}>
                  <Text style={styles.colTxt}>Je veux</Text>
                  <Text style={styles.colTxt}>23</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={sell ? styles.badgeOn : styles.badgeOff} onPress={() => {setSell(true)}}>
                  <Text style={styles.txt}>To sell / exchange</Text>
                </TouchableOpacity>
                <TouchableOpacity style={!sell ? styles.badgeOn : styles.badgeOff} onPress={() => {setSell(false)}}>
                  <Text style={styles.txt}>Looking</Text>
                </TouchableOpacity> */}
              </View>
          </View>
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
            <View style={styles.cardBottom}>
              <Text style={styles.cardtxt}>Hirono Mischief - Destroyer</Text>
            </View>
            <View style={styles.cardPrice}>
              <Text style={styles.price}>15€</Text>
            </View>
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
  },
  header: {
    marginTop: 20,
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  out: {
    position: 'absolute',
    top :90,
    right: 20,
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
  rowHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    padding: 15,
  },
  title: {
    color: color.pink,
    fontFamily: 'Helvetica',
    fontSize: 20,
  },
  rounded: {
    borderRadius: 50,
    width: 100,
    height: 100
  },
  card: {
    width: '45%',
    height:300,
    borderRadius: 6,
    marginBottom: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative'
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: color.grey
  },
  cardBottom: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
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
    flexDirection: 'row',
    display: 'flex',
    width: '80%'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  colTxt: {
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center',
    fontSize: 18
  }
});

export default Profile;
