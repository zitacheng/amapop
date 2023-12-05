import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  TextInput,
  Platform,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {Load} from '../component/Load';

Icon.loadFont();

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  function registerUser() {
    console.log("REGISTER");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
          <View style={styles.first}>
            <Image style={styles.logo} source={images.logo} resizeMode="contain" />
          </View>
          <TouchableOpacity
            style={basic.back}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image style={styles.back} source={arrow} resizeMode="contain" />
          </TouchableOpacity>
          <Load loading={loading} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={styles.scrollContent}>
            <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', paddingLeft: 30, paddingRight: 30,}}>
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
              <View style={basic.break} />
              <TouchableOpacity
                style={basic.btn}
                disabled={(!username || !password || !email) &&loading}
                onPress={() => {
                  registerUser();
                }}>
                <Text style={basic.btnTxt}>{'Registration'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  first: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    height: '100%',
    width: '100%',
    height: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    width: '50%',
    height: '20%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'Helvetica-Bold',
  },
  bottom: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  bottomTxt: {
    textAlign: 'auto',
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    color: 'white'
  },
  pinkTxt: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: color.pink,
  },
  row: {
    flexDirection: 'row',
  },
  back: {
    width: 30,
    height: 40,
  },
});

export default Register;
