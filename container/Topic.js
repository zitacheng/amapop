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
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { useHeaderHeight } from '@react-navigation/elements'

Icon.loadFont();

const Topic = ({navigation, route}) => {
  const [username, setUsername] = useState('Slashzita');
  const [avatar, setAvatar] = useState(images.avatar);
  const [msg, setMsg] = useState('');
  const height = useHeaderHeight()

  const answers = [
    {id: 1, user: 'Anna' , answer: 'Je pense que Lorem ipsum', likes: 32},
    {id: 2, user: 'Jean', answer: 'Je pense que Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', likes: 1},
    {id: 3, user: 'Marc', answer: 'Je pense que Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum', likes: 5},
  ];

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
                    </View>
                    <View>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name={'heart'} size={20} color={color.pink} />
                            <Text style={styles.contentTxt}>{'19'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.contentTxt}>{ route.params.topic.desc}</Text>
                <Text style={styles.dateTxt}>{'24/02/2023'}</Text>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={120}
            enabled style={styles.keyboardContainer}>
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <ScrollView style={styles.centerScroll}
                    contentContainerStyle={{justifyContent: 'center', padding: 15, paddingBottom: 20}}>
                    {
                        answers.map((item, id) => {
                            return (
                                <View style={[styles.commentBox, basic.shadow]} id={id}>
                                    <View style={styles.row}>
                                        <Image style={styles.smAvatar} source={images.avatar} resizeMode="cover"/>
                                        <View style={styles.max}>
                                            <Text>{item.user}</Text>
                                            <Text>{'il y a 2h'}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.icon}>
                                                <Icon name={'heart'} size={20} color={color.pink} />
                                                <Text style={styles.contentTxt}>{item.likes}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text>{item.answer}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.bottom}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMsg}
                        value={msg}
                        placeholderTextColor="white"
                        placeholder='Écris ton message ici '
                    />
                    <TouchableOpacity style={styles.icon}>
                        <Icon name={'send'} size={20} color={color.pink} />
                    </TouchableOpacity>
                </View>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
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
    padding: 20,
  },
  centerScroll: {
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
    justifyContent: 'center'
  },
  contentTxt: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Helvetica',
  },
  dateTxt: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Helvetica',
    textAlign: 'right',
    color: 'grey'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  smAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  input: {
    padding: 10,
    flex: 1,
    width: '80%',
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: color.pink,
    // shadowColor: color.ligtGrey,
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 8,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center'
  },
  commentBox: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  keyboardContainer: {
    flex: 1,
  }
});

export default Topic;
