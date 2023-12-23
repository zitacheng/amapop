import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';
import Modal from 'react-native-modalbox';
import * as ImagePicker from 'expo-image-picker';

Icon.loadFont();

const Topic = ({navigation, route}) => {
  const [username, setUsername] = useState('Slashzita');
  const [avatar, setAvatar] = useState(images.avatar);
  const [msg, setMsg] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={basic.containerBg} />
      <View style={basic.containerBgBotWhite} />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
          <TouchableOpacity style={styles.backUp}
              onPress={() => {
                  navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={20} color={'white'} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>{'Forum'}</Text>
          <View style={styles.empty}/>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
            <Image style={styles.avatar} source={images.avatar} resizeMode="cover"/>
            <View style={styles.max}>
                <Text style={styles.headerTitle}>{ route.params.topic.title}</Text>
                <Text style={styles.contentTxt}>{'Date'}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.icon}>
                    <Icon name={'heart'} size={20} color={color.pink} />
                    <Text style={styles.contentTxt}>{'19'}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Text style={styles.contentTxt}>{ route.params.topic.desc}</Text>
        <ScrollView style={styles.center} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        </ScrollView>
        <View style={styles.bottom}>
            <TextInput
                style={styles.input}
                onChangeText={setMsg}
                value={msg}
                placeholder='Écris ton message ici '
            />
            <TouchableOpacity style={styles.icon}>
                <Icon name={'send'} size={20} color={color.pink} />
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    backgroundColor: 'white'
  },
  back: {
    width: 30,
    height: 40,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: color.pink,
    padding: 10,
  },
  content: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 30,
  },
  center: {
    flex: 1,
    display: 'flex',
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
    width: '90%',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
  },
  max: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentTxt: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    flex: 1,
    width: '80%',
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: color.ultraLightPurple,
    // borderColor: color.grey,
    // borderWidth: 0.5,
    shadowColor: color.ligtGrey,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 15,
  }
});

export default Topic;
