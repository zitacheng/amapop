import React, {useState, useRef} from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';

const Forum = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [tabActive, setTabActive] = useState('change');
  const [current, setCurrent] = useState(null);
  const modalRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>

      </ScrollView>
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
    alignItems: 'center',
    flexDirection: 'row'
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
    marginBottom: 10,
  },
  colTxtBigOn: {
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center',
    fontSize: 22,
    color: 'white',
    marginBottom: 10,
  },
  favNb: {
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 2,
    shadowRadius: 3,
  },
  tab: {
    alignItems: 'center',
    marginBottom: -2,
  },
  scroll: {
    flex: 1,
    width: '100%',
    marginTop: 20
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingLeft: 10,
  },
  modal: {
    justifyContent: 'flex-start',
    borderRadius: 20,
    height: '90%',
    width: '100%',
  },
  modalPic: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: 'black',
    padding: 20,
  },
  desc: {
    fontSize: 22,
    fontFamily: 'Helvetica',
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});

export default Forum;
