import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  Text,
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

Icon.loadFont();

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [change, setChange] = useState(true);
  const [look, setLook] = useState(false);

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
    {id: 1, name: 'Hirono',  pic: images.gallery, model: 'model name', look: false},
    {id: 2, name: 'SkullPanda',  pic: images.gallery6, model: 'model name', exchange: true},
    {id: 3, name: 'Hirono',  pic: images.gallery3, model: 'model name', look: true},
    {id: 3, name: 'Hirono',  pic: images.gallery4, model: 'model name', exchange: true},
    {id: 3, name: 'Hirono',  pic: images.gallery5, model: 'model name', exchange: true},
  ];

  const onChangeMenu = (item) => {
    let newArr = [...menu];
        newArr[item.id].selected = !item.selected;
        setMenu(newArr);
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
        <View style={[styles.togglesBox, basic.shadow]}>
          <TouchableOpacity style={!look ? styles.toggleOn : styles.toggleOff} onPress={() => {setLook(false)}}>
            <Text style={styles.smTxt}>Échange</Text>
          </TouchableOpacity>
          <TouchableOpacity style={look ? styles.toggleOn : styles.toggleOff} onPress={() => {setLook(true)}}>
            <Text style={styles.smTxt}>Recherche</Text>
          </TouchableOpacity>
        </View>
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
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContent}>
          {
            pops.map((pop) => {
              if (menu.find((e) => {return (e.name === pop.name && e.selected == true)})
                && ((look == pop.look) || (pop.exchange == true && !look))) {
                return (
                  <View style={[styles.card, basic.shadow]}>
                    <View style={styles.imgBox}>
                      <Image style={styles.cardImg} source={pop.pic} resizeMode="cover" />
                      <LinearGradient colors={['rgba(0, 0, 0, 0.9)', 'transparent']} style={styles.nameBg}>
                        <Text style={styles.name}>{pop.name + ' ' + pop.model}</Text>
                      </LinearGradient>
                    </View>
                    <View style={[styles.btnRow, basic.shadow]}>
                      <TouchableOpacity style={[styles.smBtnRound, basic.shadow]}  onPress={() => {navigation.navigate('UserProfile');}}>
                        <Text style={styles.profileTxt}>Voir profil</Text>
                      </TouchableOpacity>
                      <Icon name={'send'} size={20} color={color.pink} />
                    </View>
                  </View>
                )
              }
            })
          }
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    width: '90%',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  badge: {
    borderRadius: 15,
    padding: 5,
    marginTop: 5,
    marginRight: 5
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
    padding: 6,
    borderRadius: 20,
  },
});

export default Home;
