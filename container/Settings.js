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
import { useSelector } from 'react-redux';
// import { logout } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authslice';
import { useAuth } from '../hooks/useAuth';

Icon.loadFont();

const Settings = ({navigation}) => {
  const [username, setUsername] = useState('Slashzita');
  const [avatar, setAvatar] = useState(images.avatar);
  const [phone, setPhone] = useState('+33620296517');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('chengxiedan@gmail.com');
  const [bug, setBug] = useState('');
  const modalRef = useRef(null);
  const modalInfoRef = useRef(null);
  const user = useAuth()
  const dispatch = useDispatch();

  console.log("user", user);
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
          <Text style={styles.title}>{'Paramètres'}</Text>
          <View style={styles.empty}/>
      </View>
      <ScrollView style={styles.center} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <Text style={styles.label}>{user?.user?.username}</Text>
        <Text style={styles.label}>{user?.user?.email}</Text>
        <Text style={styles.label}>{user?.user?.phone}</Text>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            modalInfoRef.current.open();
          }}>
          <Text style={basic.btnTxt}>{"Modifier mes infos"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            Linking.openURL('https://chat.whatsapp.com/DG3NgcmlTkw2q57cAMa0DV');
          }}>
          <Text style={basic.btnTxt}>{"Groupe Whatsapp"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btnWhiteout}
          onPress={() => {
            setBug('');
            modalRef.current.open();
          }}>
          <Text style={basic.btnTxtOut}>{"Suggestions / Bug"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btnWhiteout}
          onPress={async () => {
            dispatch(logout())
            navigation.navigate('Login');

          }}>
          <Text style={basic.btnTxtOut}>{"Se déconnecter"}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal style={styles.modal} position={"center"} ref={modalRef}>
          <Text style={styles.titleB}>Bug ou une suggestion pour améliorer AMA POP</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBug}
            multiline={true}
            value={bug}
            placeholder='Exemple: Une page pour les events'
          />
          <TouchableOpacity
            style={basic.btn}
            onPress={() => {
              modalRef.current.close();
            }}>
            <Text style={basic.btnTxt}>{"Envoyer"}</Text>
          </TouchableOpacity>
        </Modal>
      <Modal style={styles.modalInfo} position={"bottom"} ref={modalInfoRef} coverScreen={true}>
        {/* <ScrollView> */}
          <TouchableOpacity onPress={async() => {
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              quality: 1,
            });

            if (!result.canceled) {
              setAvatar(result.assets[0]);
            } else {
              alert('You did not select any image.');
            }
          }}>
          <Image style={styles.rounded} source={avatar && avatar.uri ? {uri: avatar.uri} : images.avatar} resizeMode="cover" />
          </TouchableOpacity>
            <Text style={basic.label}>{'Username'}</Text>
            <TextInput
              style={basic.input}
              onChangeText={setUsername}
              value={username}
            />
            <Text style={basic.label}>E-mail</Text>
            <TextInput
              style={basic.input}
              autoCapitalize={'none'}
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Text style={basic.label}>
              {'Password'}
            </Text>
            <TextInput
              style={basic.input}
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
            />
            <Text style={basic.label}>
              {'Phone'}
            </Text>
            <TextInput
              style={basic.input}
              keyboardType='phone-pad'
              onChangeText={setPhone}
              value={phone}
            />
            <TouchableOpacity
              style={basic.btn}
              onPress={() => {
                modalRef.current.close();
              }}>
              <Text style={basic.btnTxt}>{"Sauvegareder"}</Text>
            </TouchableOpacity>
          {/* </ScrollView> */}
        </Modal>
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
  center: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 30,
  },
  rounded: {
    borderRadius: 70,
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  label: {
    color: color.grey,
    fontSize: 18,
    fontFamily: 'rbt-Bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modal: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    height: '50%',
    width: '80%'
  },
  modalInfo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    height: '90%',
    width: '100%',
    padding: 20,
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'rbt-Bold',
    width: '90%',
    textAlign: 'center'
  },
  titleB: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
    width: '90%',
    textAlign: 'center'
  },
  input: {
    borderRadius: 6,
    padding: 20,
    backgroundColor: color.lightPurple,
    width: '80%',
    height: 200,
  }
});

export default Settings;
