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

const Profile = ({navigation}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [tabActive, setTabActive] = useState('change');
  const [current, setCurrent] = useState(null);
  const modalRef = useRef(null);

  const favs = [
      {id: 10, pic: images.gallery2, looking: false, selling: true, changing: true, price: 14, available: true, favorite: 1},
      {id: 12, pic: images.gallery3, looking: false, selling: true, changing: true, price: 18, available: true, favorite: 2},
      {id: 13, pic: images.gallery5, looking: false, selling: true, changing: true, price: 28, available: true, favorite: 3},
      {id: 14, pic: images.gallery6, looking: false, selling: true, changing: true, price: 13, available: true, favorite: 0},
      {id: 15, pic: images.gallery2, looking: false, selling: true, changing: true, price: 18, available: true, favorite: 2},
      {id: 21, pic: images.gallery2, looking: false, selling: true, changing: true, price: 17, available: true, favorite: 4},
      {id: 21, pic: images.gallery5, looking: false, selling: true, changing: true, price: 17, available: true, favorite: 2},
    ];

  const list = [
      {id: 10, pic: images.gallery2, looking: false, selling: true, changing: true, price: 14, available: true, look: false, prio: false},
      {id: 12, pic: images.gallery3, looking: false, selling: true, changing: true, price: 18, available: true, look: true, prio: true},
      {id: 13, pic: images.gallery5, looking: false, selling: true, changing: true, price: 28, available: true, look: false, prio: false},
      {id: 14, pic: images.gallery6, looking: false, selling: true, changing: true, price: 13, available: true, look: true, prio: true},
      {id: 15, pic: images.gallery2, looking: false, selling: true, changing: true, price: 18, available: true, look: false, prio: false},
      {id: 16, pic: images.gallery, looking: false, selling: true, changing: true, price: 12, available: true, look: true, prio: true},
      {id: 17, pic: images.gallery5, looking: false, selling: true, changing: true, price: 18, available: true, look: false, prio: false},
      {id: 18, pic: images.gallery3, looking: false, selling: true, changing: true, price: 13, available: true, look: true, prio: false},
      {id: 19, pic: images.gallery2, looking: false, selling: true, changing: true, price: 12, available: true, look: false, prio: false},
      {id: 20, pic: images.gallery4, looking: false, selling: true, changing: true, price: 15, available: true, look: true, prio: false},
      {id: 21, pic: images.gallery2, looking: false, selling: true, changing: true, price: 17, available: true, look: false, prio: false},
      {id: 21, pic: images.gallery5, looking: false, selling: true, changing: true, price: 17, available: true, look: true, prio: false},
    ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, basic.shadow]}>
        {/* <UserAvatar size={90} name="userPicture" bgColor={color.grey} src={images.avatar} /> */}
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <Text style={styles.title}>SlashZita</Text>
        {/* <TouchableOpacity onPress={() => {navigation.navigate('Creation');}}>
          <Icon name={'add-circle'} size={40} color={'white'} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => {navigation.navigate('Settings')}}>
          <Icon name={'settings-sharp'} size={30} color={'white'} />
        </TouchableOpacity>
      </View>
      <View  style={styles.textRow}>
        <View style={styles.tab}>
          <TouchableOpacity style={styles.col} onPress={() => {setTabActive('change')}}>
            <Text style={tabActive == 'change' ? styles.colTxtBigOn : styles.colTxtBig}>J'échange</Text>
          </TouchableOpacity>
          {
            tabActive == 'change' && <Icon name={'triangle'} size={15} color={'white'} />
          }
        </View>
        <View style={styles.tab}>
          <TouchableOpacity style={styles.col} onPress={() => {setTabActive('look')}}>
            <Text style={tabActive == 'look' ? styles.colTxtBigOn : styles.colTxtBig}>Je recherche</Text>
          </TouchableOpacity>
          {
            tabActive == 'look' && <Icon name={'triangle'} size={15} color={'white'} />
          }
        </View>
        <View style={styles.tab}>
          <TouchableOpacity style={styles.col} onPress={() => {setTabActive('fav')}}>
            <Text style={tabActive == 'fav' ? styles.colTxtBigOn : styles.colTxtBig}>Favoris</Text>
          </TouchableOpacity>
          {
            tabActive == 'fav' && <Icon name={'triangle'} size={15} color={'white'} />
          }
        </View>
      </View>
      <View style={styles.content}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
        {
          tabActive == 'fav' ?
          favs.map((item, id) => {
              return (
                <View style={[styles.card, basic.shadow]} id={id}>
                  <TouchableOpacity onPress={() => {setCurrent(item); modalRef.current.open();}}>
                    <Image style={styles.cardImg} source={item.pic} resizeMode="cover" />
                  </TouchableOpacity>
                  <LinearGradient
                  colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.cardtitleBg}>
                    <Text style={styles.cardtitle}>Hirono Mischief - Destroyer</Text>
                  </LinearGradient>
                  <TouchableOpacity style={[styles.cardBottom, basic.shadow]} onPress={() => {navigation.navigate('Creation', {editMode: true});}}>
                    <IconMat name={'lead-pencil'} size={20} color={color.pink} />
                  </TouchableOpacity>
                  <View style={[styles.prio, basic.shadow]}>
                    <Icon name={'heart'} size={30} color={color.pink} />
                    <Text style={styles.favNb}>{item.favorite}</Text>
                  </View>
                </View>
              )
          }) :
          list.map((item, id) => {
            if (tabActive == 'change' && item.look != true || tabActive == 'look' && item.look == true)
              return (
                <View style={[styles.card, basic.shadow]} id={id}>
                  <TouchableOpacity onPress={() => {setCurrent(item); modalRef.current.open();}}>
                    <Image style={styles.cardImg} source={item.pic} resizeMode="cover" />
                  </TouchableOpacity>
                  <LinearGradient
                  colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.cardtitleBg}>
                    <Text style={styles.cardtitle}>Hirono Mischief - Destroyer</Text>
                  </LinearGradient>
                  <TouchableOpacity style={[styles.cardBottom, basic.shadow]} onPress={() => {navigation.navigate('Creation', {editMode: true});}}>
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
          })
        }
        </View>
      </ScrollView>
      <Modal style={styles.modal} position={"bottom"} ref={modalRef} coverScreen={true}>
        <Image style={styles.modalPic} source={(current && current.pic) && current.pic} resizeMode="cover" />
        <Text style={styles.modalTitle}>{current && (current.name + ' - ' + current.model)}</Text>
        <Text style={styles.desc}>{"Note du produit exemple: J'echange tout ceux qui sont entouré"}</Text>
        <Text style={styles.desc}>{"L'utilisateur veut échanger"}</Text>
        <Text style={styles.desc}>{"Date d'ajout: 9 decembre 2023"}</Text>
        <View style={basic.break} />
        <TouchableOpacity
            style={basic.btnWhiteout}
            onPress={() => {
              modalRef.current.close();
              navigation.navigate('Creation', {editMode: true});
            }}>
            <Text style={basic.btnTxtOut}>Modifier</Text>
        </TouchableOpacity>
      </Modal>
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
    fontFamily: 'rbt-Bold',
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
    fontFamily: 'rbt-Bold',
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
  colTxtBig: {
    fontFamily: 'rbt-Bold',
    alignSelf: 'center',
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
  },
  colTxtBigOn: {
    fontFamily: 'rbt-Bold',
    alignSelf: 'center',
    fontSize: 22,
    color: 'white',
    marginBottom: 10,
  },
  favNb: {
    fontFamily: 'rbt-ExtraBold',
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
    fontFamily: 'rbt-Bold',
    color: 'black',
    padding: 20,
  },
  desc: {
    fontSize: 22,
    fontFamily: 'rbt-Regular',
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});

export default Profile;
