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
import { useGetConversationsQuery } from "../services/auth";
import { useAuth } from '../hooks/useAuth';
import { API_URL } from "../constant/back";

const qs = require("qs");

Icon.loadFont();

const Chat = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const user = useAuth();

  const {
    data: fetchedConvs,
    error,
    isLoading: fetchingConvs,
  } = useGetConversationsQuery(
    qs.stringify(
      {
        filters: {
          users: {
              id: {
                $in: [user.id],
              }
          },

        },
        populate: ['users', 'pop', 'pop.image', 'messages.sender.avatar']
      },
      { encodeValuesOnly: true }
    ),
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image style={basic.logo} source={images.logoWhite} resizeMode="cover" />
      {/* <View style={basic.search}>
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
      </View> */}
      <View style={[styles.list, basic.shadow]}>
        <Text style={styles.title}>{fetchedConvs?.data.length > 0 ? "Conversation" : "Vous n'avez pas encore de conversation" }</Text>
        <ScrollView style={styles.scroll}>
          {
            fetchedConvs &&
            fetchedConvs.data.map((item, id) => {
              console.log("ITEM ", item)
              console.log("user ", user)
                return (
                <TouchableOpacity style={styles.contactLane} onPress={() => {navigation.navigate('Chatting', {
                  userId: user.user.id,
                  image:  item.attributes.pop.data.attributes.image,
                  home: false,
                  convId: item.id,
                  pop: item.attributes.pop.data,
                  popId: item.attributes.pop.data.id
                });}} key={item.id}>
                  <Image style={styles.contactImg} source={item.attributes.pop.data.attributes.image.data.length > 0 ? {uri:API_URL + item.attributes.pop.data.attributes.image.data[0].attributes.url} : images.noimg} resizeMode="cover" key={id} />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactTitle}>{item.attributes.pop.data.attributes.serie + ' - ' + item.attributes.pop.data.attributes.name}</Text>
                    <Text style={styles.contactTxt}>{item.attributes.messages.data.length > 0 ? item.attributes.messages.data[0].attributes.msg : ''}</Text>
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
    backgroundColor: color.pink
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
    color: 'white',
    marginBottom: 20,
  },
  contactLane: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    borderRadius: 5
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
