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
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [look, setLooking] = useState(true);
  const looking = [
      {id: 1, pic: images.gallery6, looking: true, selling: false, changing: false, price: null, available: false, prio: true},
      {id: 2, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false, prio: false},
      {id: 3, pic: images.gallery3, looking: true, selling: false, changing: false, price: null, available: false, prio: true},
      {id: 4, pic: images.gallery5, looking: true, selling: false, changing: false, price: null, available: false, prio: false},
      {id: 5, pic: images.gallery, looking: true, selling: false, changing: false, price: null, available: false, prio: true},
      {id: 6, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false, prio: false},
      {id: 7, pic: images.gallery5, looking: true, selling: false, changing: false, price: null, available: false, prio: true},
      {id: 8, pic: images.gallery2, looking: true, selling: false, changing: false, price: null, available: false, prio: false},
      {id: 9, pic: images.gallery4, looking: true, selling: false, changing: false, price: null, available: false, prio: true},
    ];

  const changing = [
      {id: 10, pic: images.gallery2, looking: false, selling: true, changing: true, price: 14, available: true},
      {id: 12, pic: images.gallery3, looking: false, selling: true, changing: true, price: 18, available: true},
      {id: 13, pic: images.gallery5, looking: false, selling: true, changing: true, price: 28, available: true},
      {id: 14, pic: images.gallery6, looking: false, selling: true, changing: true, price: 13, available: true},
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
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <Text style={styles.title}>SlashZita</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Creation');}}>
          <Icon name={'add-circle'} size={40} color={'white'} />
        </TouchableOpacity>
      </View>
      <View  style={styles.textRow}>
        <TouchableOpacity style={styles.col} onPress={() => {setLooking(false)}}>
          <Text style={!look ? styles.colTxtBigOn : styles.colTxtBig}>J'échange</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.col} onPress={() => {setLooking(true)}}>
          <Text style={look ? styles.colTxtBigOn : styles.colTxtBig}>Je recherche</Text>
        </TouchableOpacity>
      </View>
      <View  style={styles.iconBox}>
        <Icon name={'triangle'} size={15} color={!look ? 'white' : 'transparent'} />
        <Icon name={'triangle'} size={15} color={look ? 'white' : 'transparent'} />
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
            <LinearGradient
            colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.cardtitleBg}>
              <Text style={styles.cardtitle}>Hirono Mischief - Destroyer</Text>
            </LinearGradient>
            <TouchableOpacity style={[styles.cardBottom, basic.shadow]}>
              <IconMat name={'lead-pencil'} size={20} color={color.pink} />
            </TouchableOpacity>
            {
              item.prio &&
              <View style={[styles.prio, basic.shadow]}>
                <Icon name={'star'} size={30} color={color.orange} />
              </View>
            }
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
    backgroundColor: color.pink,
  },
  header: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '95%',
  },
  content: {
    flex: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    marginTop: 20,
    alignSelf: 'center'
  },
  title: {
    color: 'white',
    fontFamily: 'Helvetica-Bold',
    fontSize: 28,
    padding: 10,
    flex: 1,
  },
  rounded: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  card: {
    width: '45%',
    height: 260,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
    backgroundColor: 'white',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: color.ultraLightPurple
  },
  cardBottom: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  prio: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardtitleBg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardtitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    textAlign: 'center',
  },
  textRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '95%',
    paddingBottom: 20,
  },
  iconBox: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '95%',
    marginBottom: -2
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
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 10,
  },
  colTxtBigOn: {
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center',
    fontSize: 22,
    color: 'white',
    marginTop: 10,
  },
});

export default Profile;
