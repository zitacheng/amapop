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
  const [modalImg, setModalImg] = useState('');
  const modalRef = useRef(null);

  const answers = [
    {id: 1, user: 'Anna' , answer: 'Je pense que Lorem ipsum', likes: 32, img: images.gallery6},
    {id: 2, user: 'Jean', answer: 'Je pense que Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum', likes: 1},
    {id: 3, user: 'Marc', answer: 'Je pense que Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum', likes: 5, img: images.gallery4},
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
                <Text style={styles.contentDesc}>{ route.params.topic.desc}</Text>
                <TouchableOpacity onPress={() => {setModalImg(images.gallery5); modalRef.current.open()}}>
                  <Image style={styles.topicImg} source={images.gallery5} resizeMode="cover" />
                </TouchableOpacity>
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
                                            <Text style={styles.username}>{item.user}</Text>
                                            <Text style={styles.ago}>{'il y a 2h'}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.icon}>
                                                <Icon name={'heart'} size={20} color={color.pink} />
                                                <Text style={styles.contentTxt}>{item.likes}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={styles.answer}>{item.answer}</Text>
                                    {
                                      item.img && 
                                      <TouchableOpacity onPress={() => {setModalImg(item.img); modalRef.current.open()}}>
                                        <Image style={styles.topicImg} source={item.img} resizeMode="cover" />
                                      </TouchableOpacity>
                                    }
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
        <Modal style={styles.modalImg} position={"center"} ref={modalRef} coverScreen={true}>
          <Image style={styles.bigImg} source={modalImg} resizeMode="contain" />
        </Modal>
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
    fontFamily: 'rbt-Bold',
    width: '90%',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'rbt-Bold',
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
    fontFamily: 'rbt-Medium',
    textAlign: 'center'
  },
  contentDesc: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'rbt-Medium',
  },
  dateTxt: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'rbt-Light',
    textAlign: 'right',
    color: 'grey'
  },
  answer: {
    fontSize: 16,
    fontFamily: 'rbt-Regular',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontFamily: 'rbt-Medium',
  },
  ago: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'rbt-Light',
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
    fontFamily: 'rbt-Regular',
    fontSize: 18,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: color.pink,
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
  },
  topicImg: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  modalImg: {
    justifyContent: 'center',
    borderRadius: 20,
    height: '55%',
    width: '90%',
  },
  bigImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }
});

export default Topic;
