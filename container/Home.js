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
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';
import { ScrollView } from 'react-native-gesture-handler';

Icon.loadFont();

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [change, setChange] = useState(false);
  // const menu = [
  //   {id: -1, name: 'Changer', selected: true},
  //   {id: 0, name: 'Recherche', selected: false},
  //   {id: 1, name: 'Labubu', selected: false},
  //   {id: 2, name: 'Skullpanda', selected: false},
  //   {id: 3, name: 'hirono', selected: false},
  //   {id: 4, name: 'Nori', selected: false},
  //   {id: 5, name: 'Molly', selected: false},
  //   {id: 6, name: 'Skullpanda', selected: false},
  //   {id: 7, name: 'Cry Baby', selected: false},
  //   {id: 8, name: 'Dimoo', selected: false},
  //   {id: 9, name: 'Azura', selected: false},
  // ]

  const [menu, setMenu] = useState([
    {id: 0, name: 'Changer', selected: true},
    {id: 1, name: 'Recherche', selected: false},
    {id: 2, name: 'Skullpanda', selected: false},
    {id: 3, name: 'hirono', selected: false},
    {id: 4, name: 'Nori', selected: false},
    {id: 5, name: 'Molly', selected: false},
    {id: 6, name: 'Skullpanda', selected: false},
    {id: 7, name: 'Cry Baby', selected: false},
    {id: 8, name: 'Dimoo', selected: false},
    {id: 9, name: 'Azura', selected: false},
    {id: 10, name: 'Labubu', selected: false},
  ]);

  console.log("menu ", menu)
  console.log("menu  ARRAY ", Array.isArray(menu))
  console.log("menu  ARRAY ", typeof(menu))

  const pops = [
    {id: 1, name: 'Hirono',  pic: images.gallery, username: 'Sophie', look: false},
    {id: 2, name: 'SkullPanda',  pic: images.gallery6, username: 'Max', exchange: true},
    {id: 3, name: 'Hirono',  pic: images.gallery3, username: 'Esther', look: true},
    {id: 3, name: 'Hirono',  pic: images.gallery4, username: 'Lilia', exchange: true},
    {id: 3, name: 'Hirono',  pic: images.gallery5, username: 'Marine', exchange: true},
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
        {
          menu.map((item, id) => {
            return (
              <TouchableOpacity style={[styles.badge, {backgroundColor: item.selected ? color.pink : color.lightPurple}]}
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
              return (
                <View style={[styles.card, basic.shadow]}>
                  <View style={styles.imgBox}>
                    <Image style={styles.cardImg} source={pop.pic} resizeMode="cover" />
                    <View style={[styles.topBtn, basic.shadow]}>
                      <Text style={styles.smTxt}>{pop.look ? "Cherche" : 'Échange'}</Text>
                    </View>
                  </View>
                  <Text style={styles.name}>{pop.name}</Text>
                  <Text style={styles.sub}>{pop.username}</Text>
                  <View style={styles.btnRow}>
                    <TouchableOpacity style={basic.smBtnRound}>
                      <Text style={styles.smtxt}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={basic.smBtnRound}>
                      <Text style={styles.smtxt}>Voir plus</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
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
    borderRadius: 20,
    marginBottom: 15,
    position: 'relative',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: color.ultraLightPurple,
  },
  flat: {
    flex: 1,
    width: '90%',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica'
  },
  sub: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: color.grey
  },
  smtxt: {
    color: 'white'
  },
  scroll: {
    flex: 1,
    width: '90%',
    marginTop: 20
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  imgBox: {
    position: 'relative',
    width: '90%',
    height: '60%',
    borderRadius: 20,
    marginTop: 10,
  },
  topBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 15,
    // backgroundColor: color.blue
  },
  smTxt: {
    color: 'white',
    fontFamily: 'Helvetica-Bold'
  },
  btnRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 5,
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
  }
});

export default Home;
