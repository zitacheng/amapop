import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
// import {translate} from '../constant/config.js';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';

Icon.loadFont();

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passForgot, setPassForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  function logUser() {
    navigation.navigate('Home');
  }

  function restPass() {
    setLoading(true);
    console.log("RESET PASS")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        style={basic.back}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image style={styles.back} source={arrow} resizeMode="contain" />
      </TouchableOpacity>
      {/* <MultiLang /> */}
      <Load loading={loading} />
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      {/* <Text style={styles.title}>{translate(passForgot ? 'pass_forgot_' : 'login')}</Text> */}
      <View style={styles.break} />
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#D2D6DA'}
        autoCapitalize={'none'}
        keyboardType="email-address"
        placeholder={'Email'}
        onChangeText={setEmail}
        value={email}
      />
      {!passForgot && (
        <>
          <Text style={styles.label}>{'Password'}</Text>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.inputPass}
              placeholder={'Password'}
              placeholderTextColor={'#D2D6DA'}
              onChangeText={setPassword}
              secureTextEntry={!show}
              value={password}
            />
            <TouchableOpacity
              style={styles.eye}
              onPress={() => {
                setShow(!show);
              }}>
              <Icon name={show ? 'eye' : 'eye-off'} size={20} color={'black'} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {passForgot ? (
        <>
          <TouchableOpacity
            style={basic.btn}
            disabled={!email}
            onPress={restPass}>
            <Text style={basic.btnTxt}>{"Initialize your password from the email you will receive"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={basic.btn}
            onPress={() => {
              setPassForgot(false);
            }}>
            <Text style={basic.btnTxt}>{"Annuler"}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={basic.btn}
          disabled={loading || !email || !password}
          onPress={() => {
            logUser();
          }}>
          <Text style={basic.btnTxt}>{"Login"}</Text>
        </TouchableOpacity>
      )}
      {!passForgot ? (
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}
            style={styles.row}>
            <Text style={styles.bottomTxt}>{'New user?'}</Text>
            <Text style={styles.pinkTxt}>{'Register'}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.bottomTxt}
            onPress={() => {
              setPassForgot(true);
            }}>
            <Text style={styles.bottomTxt}>{translate('pass_forgot')}</Text>
          </TouchableOpacity> */}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: '10%',
    alignSelf: 'center',
    marginTop: '40%',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'D-DINCondensed-Bold',
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    padding: 10,
    width: '80%',
  },
  inputPass: {
    padding: 10,
    flex: 1,
    width: '80%',
  },
  bottom: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    width: '80%',
    fontFamily: 'D-DINCondensed-Bold',
  },
  bottomTxt: {
    textAlign: 'auto',
    fontSize: 18,
    fontFamily: 'D-DINCondensed-Bold',
    marginBottom: 10,
  },
  pinkTxt: {
    fontFamily: 'D-DINCondensed-Bold',
    fontSize: 18,
    color: color.pink,
  },
  row: {
    flexDirection: 'row',
  },
  break: {
    height: 20,
  },
  back: {
    width: 30,
    height: 40,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    width: '80%',
  },
  eye: {
    padding: 2,
  },
});

export default Login;
