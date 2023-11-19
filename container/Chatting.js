import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

Icon.loadFont();

const Chatting = ({navigation}) => {
  const [msg, setMsg] = useState('');
  const messages = [
    {id: 1, name: 'Matthieu',  pic: images.gallery3, msg: 'Bonjour', time: '14:00'},
    {id: 2, name: 'user',  pic: images.gallery2, msg: 'Bonjour !', time: '14:30'},
    {id: 3, name: 'Matthieu',  pic: images.gallery3, msg: 'Est ce que tu veux echanger ?anticonstitutionellement', time: '15:17'},
  ];
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <View style={[styles.header, basic.shadow]}>
                    <Text style={styles.title}>Matthieu</Text>
                </View>
                <FlatList
                    data={messages}
                    style={styles.flatBox}
                    renderItem={({item}) => {
                        if (item.name != 'user') {
                            return (
                                <View style={styles.chat}>
                                    <View style={styles.msgtInfo}>
                                        <Image style={styles.avatar} source={item.pic} resizeMode="cover" />
                                        <Text style={styles.time}>{item.time}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.msgContact}>{item.msg}</Text>
                                    </View>
                                </View>
                            )
                        }
                        else {
                            return (
                            <View style={[styles.chat, {justifyContent: 'flex-end'}]}>
                                <View>
                                <Text style={styles.msg}>{item.msg}</Text>
                                </View>
                                <View style={styles.msgtInfo}>
                                    <Image style={styles.avatar} source={item.pic} resizeMode="cover" />
                                    <Text style={styles.time}>{item.time}</Text>
                                </View>
                                
                            </View>
                            )
                        }
                    }}
                    keyExtractor={item => item.id}
                    inverted
                />
                <View style={styles.chatBox}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMsg}
                        value={msg}
                    />
                    <TouchableOpacity style={styles.icon}>
                        <Icon name={'send'} size={20} color={color.pink} />
                    </TouchableOpacity>
                </View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.backUp}
            onPress={() => { navigation.goBack();}}>
            <Image style={styles.back} source={arrow} resizeMode="contain" />
        </TouchableOpacity>
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
  back: {
    width: 30,
    height: 40,
  },
  backUp: {
    top: 70,
    left: 20,
    position: 'absolute',
  },
  chatBox: {
    width: '80%',
    borderRadius: 40,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 10,
  },
  icon: {
    padding: 2,
  },
  input: {
    padding: 10,
    flex: 1,
    width: '80%',
    fontFamily: 'Helvetica',
    fontSize: 18
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  chat: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  flatBox: {
    width: '90%',
    marginTop: 20,
  },
  msgtInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
  },
  title: {
    padding: 10,
    fontFamily: 'Helvetica',
    fontSize: 24,
  },
  msgContact: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Helvetica',
    backgroundColor: color.pink,
    padding: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'transparent',
  },
  msg: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Helvetica',
    backgroundColor: color.lightPurple,
    padding: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'transparent',
  }
});

export default Chatting;
