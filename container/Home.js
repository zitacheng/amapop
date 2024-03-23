import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Linking,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {PopDetail} from '../component/PopDetail';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modalbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useGetPopsQuery, useGetSeriesQuery, updateUserInfo } from '../services/auth';
import { API_URL, popsSerie } from "../constant/back";
import { useAuth } from '../hooks/useAuth';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const qs = require("qs")

Icon.loadFont();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

const Home = ({navigation}) => {
  // const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [current, setCurrent] = useState(null);
  const [sorting, setSorting] = useState('Date croissant');
  const user = useAuth()
  const modalRef = useRef(null);
  const modalSortRef = useRef(null);
  const modalFilterRef = useRef(null);
  const {data: fetchedPops, fetchingPops, error} = useGetPopsQuery(qs.stringify({
    filters: {
      state: {
        $eq: 'change',
      },
      $not: {
        user: user?.user?.id,
      }
    },
    populate: ['user', 'image']
  }, {encodeValuesOnly: true}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});

  const {data: fetchedSeries, fetchingSeries, error: errorSeries} = useGetSeriesQuery(qs.stringify({
    sort: ['name']
  }, {encodeValuesOnly: true}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});
  
  //TODO recuperer que ceux que les gens echange
  const [menu, setMenu] = useState(popsSerie);


  const onChangeMenu = (item) => {
    let newArr = [...menu];
        newArr[item.id].selected = !item.selected;
        setMenu(newArr);
  }

  const changeRadio = (val) => {
    setSorting(val);
    modalSortRef.current.close();
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      updateUserInfo({id: user?.user?.id, data: {expoPushToken: token}})
      .unwrap().then((res) => {

      });
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
      <Image style={basic.logo} source={images.logoWhite} resizeMode="cover" />
      <View style={basic.search}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
          }}>
          <Icon name={'search'} size={20} color={color.pink} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <View style={basic.break} />
      <View style={styles.btnSelect}>
        <View style={styles.togglesBox}>
          <TouchableOpacity style={styles.toggleOn} onPress={() => {modalSortRef.current.open();}}>
            <Text style={styles.smTxt}>{'Trie: ' + sorting}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.togglesBoxFilter}>
          <TouchableOpacity style={selected.length >= 1 ? styles.toggleOn : styles.toggleOff} onPress={() => {modalFilterRef.current.open();}}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={[selected.length >= 1 ? styles.smTxt : styles.smTxtOff]}>{'Filtre' + (selected.length > 0 ? ': ' : ' ') + selected.toString()}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.togglesBox}>
          <TouchableOpacity style={!look ? styles.toggleOn : styles.toggleOff} onPress={() => {setLook(false)}}>
            <Text style={styles.smTxt}>Échange</Text>
          </TouchableOpacity>
          <TouchableOpacity style={look ? styles.toggleOn : styles.toggleOff} onPress={() => {setLook(true)}}>
            <Text style={styles.smTxt}>Recherche</Text>
          </TouchableOpacity>
        </View> */}
        {
          // menu.map((item, id) => {
          //   return (
          //     <TouchableOpacity style={[styles.badge, basic.shadow, {backgroundColor: item.selected ? color.pink : color.lightPurple}]}
          //       onPress={() => {
          //         onChangeMenu(item);
          //       }} key={id}>
          //       <Text style={styles.smTxt}>{item.name}</Text>
          //     </TouchableOpacity>
          //   )
          // })
        }
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
          {
            fetchedPops?.data.map((pop, id) => {
              if ((selected.find((e) => {return (e === pop.attributes.serie)}) || selected.length <= 0) && 
              (!search || (search && (pop.attributes.name.toLowerCase().includes(search.toLocaleLowerCase()) || pop.attributes.serie.toLowerCase().includes(search.toLocaleLowerCase()))))
              )
                // && ((look == pop.attributes.look) || (pop.attributes.exchange == true && !look))) Filtre par echange ou recherche
              {
                return (
                  <View style={[styles.card, basic.shadow]} key={id}>
                    <View style={styles.imgBox}>
                      <Image style={styles.cardImg} source={pop.attributes.image.data && pop.attributes.image.data.length > 0 ? {uri:API_URL + pop.attributes.image.data[0].attributes.url} : images.noimg} resizeMode="cover" />
                      <LinearGradient colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.nameBg}>
                        <Text style={styles.name}>{pop.attributes.serie + ' - ' + pop.attributes.name}</Text>
                      </LinearGradient>
                    </View>
                    <View style={[styles.btnRow, basic.shadow]}>
                      <TouchableOpacity style={[styles.smBtnRound, basic.shadow]} onPress={() => {setCurrent(pop);modalRef.current.open();}}>
                        <Text style={styles.profileTxt}>Détail</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => {}}>
                        <Icon name={pop.like == true ? 'heart' : 'heart-o'} size={20} color={color.pink} />
                      </TouchableOpacity> */}
                      <TouchableOpacity onPress={() => {Linking.openURL('whatsapp://send?text=' + 'Bonjour j\'ai vu que tu as ' + pop.attributes.serie + ' - ' + pop.attributes.name + ' je suis interessé' +'&phone=+33768628787')}}>
                        <Image style={styles.whatsapp} source={images.whatsapp} resizeMode="cover" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate('Chatting',
                        {
                          pop: pop,
                          popId: pop.id,
                          ownerId: pop.attributes.user.data.id,
                          userId: user?.user?.id,
                          image:  pop.attributes.image,
                          username: pop.attributes.user.data.attributes.username,
                          home: true,
                        }
                        )}}>
                        <Icon name={'send'} size={20} color={color.pink} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
            })
          }
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
      <PopDetail modalRef={modalRef} pop={current} showBtn={true} navigation={navigation} userId={user?.user?.id} />
      <Modal style={styles.modalSort} position={"bottom"} ref={modalSortRef} coverScreen={true}>
        <Text style={styles.title}>Trier par:</Text>
        <View style={styles.radioBox}>
          <BouncyCheckbox
              size={25}
              style={styles.radio}
              fillColor={color.pink}
              unfillColor="#FFFFFF"
              text="Date de mise à jour"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{textDecorationLine: "none", fontFamily: 'rbt-Light', fontSize: 18}}
              isChecked={sorting == 'Date croissant'}
              onPress={() => {changeRadio('Date croissant')}}
          />
          <BouncyCheckbox
              size={25}
              style={styles.radio}
              fillColor={color.pink}
              unfillColor="#FFFFFF"
              text="Pertinence"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{textDecorationLine: "none", fontFamily: 'rbt-Light', fontSize: 18}}
              isChecked={sorting == 'Pertinence'}
              onPress={() => {changeRadio('Pertinence')}}
          />
          <BouncyCheckbox
              size={25}
              style={styles.radio}
              fillColor={color.pink}
              unfillColor="#FFFFFF"
              text="Favoris"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{textDecorationLine: "none", fontFamily: 'rbt-Light', fontSize: 18}}
              isChecked={sorting == 'Favoris'}
              onPress={() => {changeRadio('Favoris')}}
          />
          <BouncyCheckbox
              size={25}
              style={styles.radio}
              fillColor={color.pink}
              unfillColor="#FFFFFF"
              text="Non favoris"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{textDecorationLine: "none", fontFamily: 'rbt-Light', fontSize: 18}}
              isChecked={sorting == 'Non favoris'}
              onPress={() => {changeRadio('Non favoris')}}
          />
        </View>
      </Modal>
      <Modal style={styles.modalFilter} position={"center"} ref={modalFilterRef} coverScreen={true}>
        <Text style={styles.modalTitle}>Filtrer par:</Text>
        <ScrollView>
        <View style={styles.btnSelect}>
          {
            fetchedSeries?.data?.map((item, id) => {
              return (
                <TouchableOpacity style={[styles.badge, {backgroundColor: selected.includes(item.attributes.name) ? color.pink : 'white'}]}
                  onPress={() => {
                      let newArr = [...selected];
                          if (selected.indexOf(item.attributes.name) == -1)
                            newArr.push(item.attributes.name)
                          else
                            newArr.splice(selected.indexOf(item.attributes.name), 1)
                          setSelected(newArr);

                  }} key={id}>
                  <Text style={[selected.includes(item.attributes.name) ? styles.smTxt :  styles.smTxtOff]}>{item.attributes.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        </ScrollView>
        <TouchableOpacity
            style={basic.btn}
            onPress={() => {
              setSelected([]);
            }}>
            <Text style={basic.btnTxt}>Effacer</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.close}
            onPress={() => {
              modalFilterRef.current.close()
            }}>
              <IconAnt name={'closecircle'} size={20} color={color.pink} />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: color.pink
  },
  icon: {
    padding: 2,
  },
  input: {
    padding: 10,
    width: '80%',
  },
  card: {
    width: '45%',
    height: 220,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    marginBottom: 15,
    position: 'relative',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  flat: {
    flex: 1,
    width: '90%',
  },
  nameBg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    minHeight: 40,
    maxHeight: 80,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 5,
    paddingRight: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  },
  name: {
    fontSize: 18,
    fontFamily: 'rbt-ExtraBold',
    color: 'white',
    padding: 2,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    backgroundColor: 'white',
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingLeft: 10,
  },
  imgBox: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  topBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 15,
    backgroundColor: color.green
  },
  smTxt: {
    color: 'white',
    fontFamily: 'rbt-Bold',
    fontSize: 14
  },
  smTxtOff: {
    color: color.pink,
    fontFamily: 'rbt-Bold',
    fontSize: 14
  },
  profileTxt: {
    color: 'white',
    fontFamily: 'rbt-Bold',
    padding: 5,
  },
  smBtnRound: {
    backgroundColor: color.pink,
    padding: 5,
    borderRadius: 20
  },
  btnRow: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'space-between',
    width: '100%',
    height: '30%',
    borderRadius: 35,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnSelect: {
    flexDirection: 'row',
    display: 'flex',
    width: '92%',
    marginTop: 5,
    flexWrap: 'wrap',
    // paddingRight: 10,
    // justifyContent: 'center',
  },
  badge: {
    borderRadius: 15,
    padding: 5,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 6,
    borderColor: color.pink,
    borderWidth: 1,
  },
  togglesBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    marginRight: 5,
  },
  togglesBoxFilter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: color.pink,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginRight: 5,
    maxWidth: '50%'
  },
  toggleOff: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
  },
  toggleOn: {
    backgroundColor: color.orange,
    color: 'white',
    padding: 9,
    borderRadius: 20,
  },
  modal: {
    justifyContent: 'flex-start',
    borderRadius: 20,
    height: '90%',
    width: '100%',
  },
  modalSort: {
    borderRadius: 20,
    height: '40%',
    width: '100%',
  },
  modalFilter: {
    justifyContent: 'space-between',
    borderRadius: 20,
    height: '50%',
    width: '95%',
    padding: 20,
    position: 'relative',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 22,
    fontFamily: 'rbt-Bold',
    color: 'black',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'rbt-Bold',
    color: 'black',
  },
  content: {
    fontSize: 22,
    fontFamily: 'rbt-Regular',
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  modalPic: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  radioBox: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  radio: {
    marginBottom: 10,
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  whatsapp: {
    width: 20,
    height: 20
  }
});

export default Home;
