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
// import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [change, setChange] = useState(true);
  const [look, setLook] = useState(false);

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
                      <View style={[styles.topBtn, basic.shadow]}>
                        <Text style={styles.smTxt}>{'Plus'}</Text>
                      </View>
                    </View>
                    <Text style={styles.name}>{pop.name}</Text>
                    <Text style={styles.sub}>{pop.model}</Text>
                    <View style={styles.btnRow}>
                      <TouchableOpacity style={basic.smBtnRound}>
                        <Text style={styles.smtxt}>{pop.look == true ? 'Recherche' : 'Échanger'}</Text>
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
    backgroundColor: color.green
  },
  smTxt: {
    color: 'white',
    fontFamily: 'Helvetica-Bold'
  },
  btnRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
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
