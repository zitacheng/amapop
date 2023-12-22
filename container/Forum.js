import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  View,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {color} from '../constant/color';
import {images} from '../constant/images';
import {basic} from '../constant/basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import UserAvatar from 'react-native-user-avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';

const Forum = ({navigation}) => {
  const modalRef = useRef(null);
  const [search, setSearch] = useState('');

  const topics = [
    {id: 1, title: 'histoire de hirono' , desc: 'Est ce que vous connaissez les histoire de chaque hirono?', likes: 32, answers: 14, views: 21},
    {id: 2, title: 'date de sortie des dragon', desc: 'Quand sort la nouvelle collection de nouvel an chinois dragon en france?', likes: 1, answers: 1, views: 5},
    {id: 3, title: 'Display de figurines', desc: 'Vous utilisez quoi comme display pour affichez vos figurines ?', likes: 5, answers: 5, views: 7},
    {id: 3, title: 'Savoir si ce sont des vrai', desc: 'Comment vous différencier les figurines vrai ou faux ?', likes: 16, answers: 8, views: 11},
    {id: 3, title: 'Comment trouver le modele television', desc: 'Vous avez des astuces pour trouver le secret tele de hirono ?', likes: 20, answers: 21, views: 35},
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
      <ScrollView style={styles.scroll}>
          {
            topics.map((item, id) => {
                return (
                <TouchableOpacity style={[styles.topic, basic.shadow]} onPress={() => {
                    // navigation.navigate('Chatting');
                    }}>
                    <View style={styles.row}>
                        <View style={styles.content}>
                            <Text style={styles.title}  numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                            <Text style={styles.desc} numberOfLines={2} ellipsizeMode='tail'>{item.desc}</Text>
                        </View>
                        <View>
                            <Image style={styles.avatar} source={images.avatar} resizeMode="cover" key={id} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name={'chatbox'} size={15} color={color.pink} />
                        <Text style={styles.bottom}>{item.answers}</Text>
                        <AntIcons name={'like1'} size={15} color={color.pink} />
                        <Text style={styles.bottom}>{item.likes}</Text>
                        <Ionicons name={'time-outline'} size={15} color={color.pink} />
                        <Text style={styles.bottom}>6d</Text>
                        <Ionicons name={'eye'} size={15} color={color.pink} />
                        <Text style={styles.bottom}>{item.views}</Text>
                    </View>
                </TouchableOpacity>
              )
            })
          }
      </ScrollView>
      <TouchableOpacity style={styles.add}>
        <Ionicons name={'add'} size={30} color={'white'} />
      </TouchableOpacity>
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
    backgroundColor: 'white',
    // position: 'absolute'
  },
  add: {
    backgroundColor: color.pink,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    padding: 2,
  },
  input: {
    padding: 10,
    width: '80%',
  },
  topic: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 5,
  },
  content: {
    flex: 5
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  scroll: {
    width: '100%',
    marginTop: 20,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: color.pink
  },
  desc: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    width: '90%',
  },
  bottom: {
    marginRight: 12,
    marginLeft: 4,
    fontFamily: 'Helvetica-bold',
    color: color.grey
  }
});

export default Forum;
