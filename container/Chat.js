import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';

Icon.loadFont();

const Chat = ({navigation}) => {
  const [search, setSearch] = useState('');
  const contacts = [
    {id: 1, name: 'Matthieu',  pic: images.gallery, msg: 'Est ce que tu veux echanger ?'},
    {id: 2, name: 'Puuline',  pic: images.gallery2, msg: 'Bonjour !'},
    {id: 3, name: 'Justine',  pic: images.gallery3, msg: 'À quel heure'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
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
      <View style={[styles.list, basic.shadow]}>
        <Text style={styles.title}>Conversation</Text>
        <ScrollView style={styles.scroll}>
          {
            contacts.map((item, id) => {
                return (
                  <TouchableOpacity style={styles.contactLane} onPress={() => {navigation.navigate('Chatting');        }}>
                  <Image style={styles.contactImg} source={item.pic} resizeMode="cover" key={id} />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactTitle}>{item.name}</Text>
                    <Text style={styles.contactTxt}>{item.msg}</Text>
                  </View>
                </TouchableOpacity>
              )
          })
        }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  icon: {
    padding: 2,
  },
  input: {
    padding: 10,
    width: '80%',
  },
  list: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    width: '95%',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica',
    color: color.grey,
    marginBottom: 20,
  },
  contactLane: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
  },
  contactInfo: {
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  contactImg: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  contactTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16
  },
  contactTxt: {
    fontFamily: 'Helvetica',
    fontSize: 16
  },
  scroll: {
    width: '100%'
  }
});

export default Chat;
