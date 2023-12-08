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
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modalbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";

Icon.loadFont();

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [change, setChange] = useState(true);
  const [look, setLook] = useState(false);
  const [current, setCurrent] = useState(null);
  const [sorting, setSorting] = useState('Date croissant');
  const modalRef = useRef(null);
  const modalSortRef = useRef(null);
  

  //TODO recuperer que ceux que les gens echange
  const [menu, setMenu] = useState([
    {id: 0, name: 'Labubu', selected: false},
    {id: 1, name: 'Azura', selected: false},
    {id: 2, name: 'SkullPanda', selected: false},
    {id: 3, name: 'Hirono', selected: false},
    {id: 4, name: 'Nori', selected: false},
    {id: 5, name: 'Molly', selected: false},
    {id: 6, name: 'Hapuchichi', selected: false},
    {id: 7, name: 'Cry Baby', selected: false},
    {id: 8, name: 'Dimoo', selected: false},
  ]);

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
        <TouchableOpacity style={!look ? styles.toggleOn : styles.toggleOff} onPress={() => {modalSortRef.current.open();}}>
          <Text style={styles.smTxt}>{'Trie: ' + sorting}</Text>
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
          menu.map((item, id) => {
            return (
              <TouchableOpacity style={[styles.badge, basic.shadow, {backgroundColor: item.selected ? color.pink : color.lightPurple}]}
                onPress={() => {
                  onChangeMenu(item);
                }} key={id}>
                <Text style={styles.smTxt}>{item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
          {
            pops.map((pop) => {
              if ((menu.find((e) => {return (e.name === pop.name && e.selected == true)}) || !menu.find((e) => e.selected === true)) && 
              (!search || (search && (pop.name.toLowerCase().includes(search.toLocaleLowerCase()) || pop.model.toLowerCase().includes(search.toLocaleLowerCase()))))
              )
                // && ((look == pop.look) || (pop.exchange == true && !look))) Filtre par echange ou recherche
              {
                return (
                  <View style={[styles.card, basic.shadow]}>
                    <View style={styles.imgBox}>
                      <Image style={styles.cardImg} source={pop.pic} resizeMode="cover" />
                      <LinearGradient colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.nameBg}>
                        <Text style={styles.name}>{pop.name + ' - ' + pop.model}</Text>
                      </LinearGradient>
                    </View>
                    <View style={[styles.btnRow, basic.shadow]}>
                      <TouchableOpacity style={[styles.smBtnRound, basic.shadow]} onPress={() => {setCurrent(pop);modalRef.current.open();}}>
                        <Text style={styles.profileTxt}>Détail</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {}}>
                        <Icon name={pop.like == true ? 'heart' : 'heart-o'} size={20} color={color.pink} />
                      </TouchableOpacity>
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
        <Image style={styles.modalPic} source={(current && current.pic) && current.pic} resizeMode="cover" />
        <Text style={styles.title}>{current && (current.name + ' - ' + current.model)}</Text>
        <Text style={styles.content}>{"Note du produit exemple: J'echange tout ceux qui sont entouré"}</Text>
        <Text style={styles.content}>{"L'utilisateur veut échanger"}</Text>
        <Text style={styles.content}>{"Date d'ajout: 9 decembre 2023"}</Text>
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
              textStyle={{textDecorationLine: "none"}}
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
              textStyle={{textDecorationLine: "none"}}
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
              textStyle={{textDecorationLine: "none"}}
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
              textStyle={{textDecorationLine: "none"}}
              isChecked={sorting == 'Non favoris'}
              onPress={() => {changeRadio('Non favoris')}}
          />
        </View>
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
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    padding: 2,
    textAlign: 'center',
  },
  sub: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: color.grey
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
    fontFamily: 'Helvetica-Bold'
  },
  profileTxt: {
    color: 'white',
    fontFamily: 'Helvetica-Bold',
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
    // justifyContent: 'center'
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
    borderColor: color.pink,
    borderWidth: 1.5,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: color.lightPurple,
    marginRight: 5,
  },
  toggleOff: {
    backgroundColor: color.lightPurple,
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
    justifyContent: 'center',
    borderRadius: 20,
    height: '40%',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: 'black',
    padding: 20,
  },
  content: {
    fontSize: 22,
    fontFamily: 'Helvetica',
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
  }
});

export default Home;
