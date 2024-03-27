import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Image,
  Alert,
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
import Modal from 'react-native-modal';
import { useAuth } from '../hooks/useAuth';
import { useGetPopsQuery, useRemovePopMutation } from '../services/auth';
import { API_URL, stateSentence } from "../constant/back";
import {Load} from '../component/Load';

const qs = require("qs")

const Profile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [tabActive, setTabActive] = useState('change');
  const [current, setCurrent] = useState(null);
  const modalRef = useRef(null);
  const [modalDetail, setModalDetail] = useState(false);
  const [removePop] = useRemovePopMutation();
  const user = useAuth()
  const {data: fetchedPops, fetchingPops, error} = useGetPopsQuery(qs.stringify({
    filters: {
      user: {id: user?.user?.id}
    },
    populate: ['user', 'image']
  }, {encodeValuesOnly: true}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});


  const favs = [
      // {id: 10, pic: images.gallery2, looking: false, selling: true, changing: true, price: 14, available: true, favorite: 1},
    ];

  // function stateSentence() {
  //   switch (current.state) {
  //     case "looking":
  //       return "Je recherche ce modèle";
  //     case "change":
  //       return "À échanger";
  //     case "booked":
  //       return "Ce modèle est éservé";
  //     default:
  //       return "";
  //   }
  // }

  function closeModal() {
    setModalDetail(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Load loading={loading} />
      <View style={[styles.header, basic.shadow]}>
        {/* <UserAvatar size={90} name="userPicture" bgColor={color.grey} src={images.avatar} /> */}
        <Image style={styles.rounded} source={user?.user?.avatar && user?.user?.avatar.length > 0 ? {uri:API_URL + user.user.avatar[0].url} : images.noimg} resizeMode="cover" />
        <Text style={styles.title}>{user?.user?.username}</Text>
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
        {/* <View style={styles.tab}>
          <TouchableOpacity style={styles.col} onPress={() => {setTabActive('fav')}}>
            <Text style={tabActive == 'fav' ? styles.colTxtBigOn : styles.colTxtBig}>Favoris</Text>
          </TouchableOpacity>
          {
            tabActive == 'fav' && <Icon name={'triangle'} size={15} color={'white'} />
          }
        </View> */}
      </View>
      <View style={styles.content}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
        {
          tabActive == 'fav' ?
          favs.map((item, id) => {
              return (
                <View style={[styles.card, basic.shadow]} id={id} key={id}>
                  <TouchableOpacity onPress={() => {setCurrent(item); setModalDetail(true)}}>
                    <Image style={styles.cardImg} source={item.pic} resizeMode="cover" />
                  </TouchableOpacity>
                  <LinearGradient
                  colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.cardtitleBg}>
                    <Text style={styles.cardtitle}>{(item.series.length > 1 ? 'Multiple' : item.series[0].name) + ' - ' + item.name}</Text>
                  </LinearGradient>
                  <TouchableOpacity style={[styles.cardBottom, basic.shadow]} onPress={() => {navigation.navigate('Edit', {editMode: true});}}>
                    <IconMat name={'lead-pencil'} size={20} color={color.pink} />
                  </TouchableOpacity>
                  <View style={[styles.prio, basic.shadow]}>
                    <Icon name={'heart'} size={30} color={color.pink} />
                    <Text style={styles.favNb}>{item.favorite}</Text>
                  </View>
                </View>
              )
          }) :
          fetchedPops?.data?.map((item, id) => {
            if ((tabActive == 'change' && (item.attributes.state == 'change' || item.attributes.state == 'booked')) || (tabActive == 'look' && item.attributes.state == 'looking'))
              return (
                <View style={[styles.card, basic.shadow]} id={id} key={id}>
                  <TouchableOpacity onPress={() => {setCurrent(item); setModalDetail(true)}}>
                    {
                      item?.attributes?.image?.data && item.attributes.image.data.length > 0 ?
                      <Image style={styles.cardImg} source={{uri:API_URL + item.attributes.image.data[0].attributes.url}} resizeMode="cover" />
                      :
                      <Image style={styles.cardImg} source={images.noimg} resizeMode="cover" />
                    }
                  </TouchableOpacity>
                  <LinearGradient
                  colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.cardtitleBg}>
                    <Text style={styles.cardtitle}>{(item.attributes?.series?.length > 1 ? 'Multiple' : item.attributes?.series[0].name)  + ' - ' + item.attributes.name}</Text>
                  </LinearGradient>
                  {
                    item.attributes.state == 'booked' &&
                    <Image style={styles.booked} source={images.booked} resizeMode="cover" />
                  }
                  <TouchableOpacity style={[styles.cardBottom, basic.shadow]} onPress={() => {navigation.navigate('Edit', {editMode: true, pop: item});}}>
                    <IconMat name={'lead-pencil'} size={20} color={color.pink} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cardBottomLeft, basic.shadow]} onPress={() => {
                     Alert.alert('Supression de popmart', 'Êtes vous sûre de vouloir supprimer ce popmart ?', [
                      {
                          text: 'Annuler',
                          style: 'cancel',
                      },
                      {
                          text: 'Oui',
                          onPress: () => {
                              setLoading(true);
                              removePop({id: item.id}).unwrap().then((res) => {
                                  setLoading(false);
                                  Alert.alert('Action réussi', 'Votre popmart a bien été supprimé', [
                                  {text: 'Ok'}
                                  ]);
                               }).catch((err) => {
                                  setLoading(false);
                                  Alert.alert('Erreur', 'Erreur de serveur, veuillez réessayer ultérieurement.', [
                                    {text: 'OK'},
                                  ]);
                                })
                          },
                      },
                        
                    ]);
                  }}>
                    <IconMat name={'delete'} size={20} color={color.pink} />
                  </TouchableOpacity>
                  {
                    item.priority &&
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
        <Modal style={styles.modal} coverScreen={true} isVisible={modalDetail} scrollHorizontal={true}>
          {
            current &&
            <ScrollView style={styles.modalScroll}>
              {/* <View style={styles.imgBox}> */}
              <Image style={styles.modalPic} source={current.attributes?.image?.data && current.attributes.image.data.length > 0 ? {uri:API_URL + current.attributes.image.data[0].attributes.url} : images.noimg} resizeMode="contain" />
              {/* </View> */}
              <Text style={styles.modalTitle}>{(current.attributes.series.length > 1 ? 'Multiple' :  current.attributes.series[0].name) + ' - ' + current.attributes.name}</Text>
              <Text style={styles.desc}>{"Note: " + (current.attributes.note ? current.attributes.note : "Pas de note")}</Text>
              <Text style={styles.desc}>{stateSentence(current.attributes.state)}</Text>
              <Text style={styles.desc}>{"Date d'ajout: " + new Date(current.attributes.createdAt).toLocaleDateString()}</Text>
              {
                current.attributes.series.length > 1 &&
                <Text style={styles.desc}>{"Liste des sérites: "}
                {
                  current?.attributes?.series?.map((item, id) => {
                    return(
                      item.name + (id === current.attributes.series.length - 1 ? '' : ', ')
                    )
                  })

                }
                </Text>
              }
              <View style={basic.break} />
                <TouchableOpacity
                    style={basic.btnWhiteout}
                    onPress={() => {
                      setModalDetail(false);
                      navigation.navigate('Edit', {editMode: true, pop: current});
                    }}>
                    <Text style={basic.btnTxtOut}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.closeBox}>
                  <Image style={styles.close} source={images.close} resizeMode="cover" />
                </TouchableOpacity>
                <View style={basic.break} />
                <View style={basic.break} />
            </ScrollView>
          }
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
  cardBottomLeft: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  booked: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: '80%',
    objectFit: 'contain'
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
  modalScroll: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 80,
    borderRadius: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgBox: {
    width: '100%',
    height: 600,
    backgroundColor: 'pink',
  },
  modalPic: {
    height: 600, 
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
  closeBox: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    width: 30,
    height: 30,
  }
});

export default Profile;
