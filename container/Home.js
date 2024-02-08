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
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modalbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useGetPopsQuery, useGetSeriesQuery } from '../services/auth';
import { API_URL, stateSentence, popsSerie } from "../constant/back";

const qs = require("qs")

Icon.loadFont();

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [current, setCurrent] = useState(null);
  const [sorting, setSorting] = useState('Date croissant');
  const modalRef = useRef(null);
  const modalSortRef = useRef(null);
  const modalFilterRef = useRef(null);
  const {data: fetchedPops, fetchingPops, error} = useGetPopsQuery(qs.stringify({
    filters: {
      state: {
        $eq: 'change',
      },
    },
    populate: ['user', 'image']
  }, {encodeValuesOnly: true}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});

  const {data: fetchedSeries, fetchingSeries, error: errorSeries} = useGetSeriesQuery(qs.stringify({
    sort: ['name']
  }, {encodeValuesOnly: true}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});
  
  //TODO recuperer que ceux que les gens echange
  const [menu, setMenu] = useState(popsSerie);

  const pops = [
    {id: 1, name: 'Hirono',  pic: images.gallery, model: 'Destroyer', look: false, like: true},
    {id: 2, name: 'SkullPanda',  pic: images.gallery6, model: 'model name', exchange: true, like: false},
    {id: 3, name: 'Hirono',  pic: images.gallery3, model: 'fallen angel', look: true, like: true},
    {id: 3, name: 'Hirono',  pic: images.gallery4, model: 'Unspoken', exchange: true, like: false},
    {id: 3, name: 'Hirono',  pic: images.gallery5, model: 'the silent', exchange: true, like: true},
  ];

  const onChangeMenu = (item) => {
    let newArr = [...menu];
        newArr[item.id].selected = !item.selected;
        setMenu(newArr);
  }

  const changeRadio = (val) => {
    setSorting(val);
    modalSortRef.current.close();
  }

  console.log("current ", current);
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
      <Image style={basic.logo} source={images.logo} resizeMode="cover" />
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
                      <TouchableOpacity style={[styles.smBtnRound, basic.shadow]} onPress={() => {setCurrent(pop.attributes);modalRef.current.open();}}>
                        <Text style={styles.profileTxt}>Détail</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => {}}>
                        <Icon name={pop.like == true ? 'heart' : 'heart-o'} size={20} color={color.pink} />
                      </TouchableOpacity> */}
                      <TouchableOpacity onPress={() => {Linking.openURL('whatsapp://send?text=' + 'Bonjour j\'ai vu que tu as XXX je suis interessé' +'&phone=+33768628787')}}>
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
      <Modal style={styles.modal} position={"bottom"} ref={modalRef} coverScreen={true}>
        {
          current &&
          <>
          <Image style={styles.modalPic} source={current.image && current.image.data.length > 0 ? {uri:API_URL + current.image.data[0].attributes.url} : images.noimg} resizeMode="cover" />
            <Text style={styles.title}>{current && (current.serie + ' - ' + current.name)}</Text>
            <Text style={styles.content}>{"Note du pop: " + current.note}</Text>
            <Text style={styles.content}>{stateSentence(current.state)}</Text>
            <Text style={styles.content}>{"Date d'ajout: " + new Date(current.createdAt).toLocaleDateString()}</Text>
            <View style={basic.break} />
            <TouchableOpacity
                style={basic.btn}
                onPress={() => {
                  Linking.openURL('whatsapp://send?text=' + 'Bonjour j\'ai vu que tu as XXX je suis interessé' +'&phone=+33768628787')
                }}>
                <Text style={basic.btnTxt}>Envoyer un message</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={basic.btnWhiteout}
                onPress={() => {
                  modalRef.current.close();
                  navigation.navigate('UserProfile');
                }}>
                <Text style={basic.btnTxtOut}>Voir son profil</Text>
            </TouchableOpacity>
          </>
        }
      </Modal>
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
                <TouchableOpacity style={[styles.badge, basic.shadow, {backgroundColor: selected.includes(item.attributes.name) ? color.pink : 'white'}]}
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
    backgroundColor: 'white'
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
    marginTop: 20
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
  },
  togglesBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    backgroundColor: color.pink,
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
  }
});

export default Home;
