import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  Button,
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

Icon.loadFont();

const Settings = ({navigation}) => {
  const [bug, setBug] = useState('');
  const modalRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.center}>
        <Image style={styles.rounded} source={images.avatar} resizeMode="cover" />
        <Text style={styles.label}>Username</Text>
        <Text style={styles.label}>example98@gmail.com</Text>
        <Text style={styles.label}>+33620323287</Text>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            Linking.openURL('https://chat.whatsapp.com/DG3NgcmlTkw2q57cAMa0DV');
          }}>
          <Text style={basic.btnTxt}>{"Whatsapp group"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            setBug('');
            modalRef.current.open();
          }}>
          <Text style={basic.btnTxt}>{"Suggestions / Bug"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={basic.btnWhiteout}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={basic.btnTxtOut}>{"Log out"}</Text>
        </TouchableOpacity>
      </View>
      <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={modalRef}>
          <Text style={styles.title}>Bug ou une suggestion pour améliorer AMA POP</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBug}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    justifyContent: 'center'
  },
  rounded: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  label: {
    color: color.grey,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    alignSelf: 'center'
  },
  modal: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  modal3: {
    height: '50%',
    width: '80%'
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  title: {
    fontSize: 20,
    color: color.grey,
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
  }
});

export default Settings;
