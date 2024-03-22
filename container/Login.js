import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {images} from '../constant/images';
import {basic} from '../constant/basic';
import {Load} from '../component/Load';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useLazyGetMeQuery } from '../services/auth';
import { setCredentials, setUser } from '../slices/authslice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { useHeaderHeight } from '@react-navigation/elements'
import { API_URL } from "../constant/back";

const qs = require("qs")

Icon.loadFont();

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passForgot, setPassForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();
  const refPass = useRef(null);
  const height = useHeaderHeight()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Load loading={loading} />
      <ScrollView style={styles.centerBox} contentContainerStyle={{ flex: 1, justifyContent: 'center'}}>
        <KeyboardAwareScrollView keyboardVerticalOffset={height}
          behavior={Platform.OS === "ios" ? "padding" : 'height'}
          contentContainerStyle={{ flex: 1, justifyContent: 'center'}}
          style={{flex: 1}} enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <Image style={styles.logo} source={images.logoPink} resizeMode="contain" />
            <Text style={basic.label}>{passForgot ? "E-mail" : "E-mail / Nom d'utilisateur"}</Text>
            <TextInput
              style={basic.input}
              autoCapitalize={'none'}
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              onSubmitEditing={() => refPass?.current?.focus()}
            />
            {
              !passForgot ?
              <>
              <Text style={basic.label}>{'Mot de passe'}</Text>
              <View style={styles.searchSection}>
                <TextInput
                  ref={refPass}
                  style={styles.inputPass}
                  onChangeText={setPassword}
                  secureTextEntry={!show}
                  value={password}
                />
                <TouchableOpacity
                  style={styles.eye}
                  onPress={() => {
                    setShow(!show);
                  }}>
                  <Icon name={show ? 'eye' : 'eye-off'} size={20} color={color.pink} />
                </TouchableOpacity>
              </View>
              <View style={basic.break} />
              <TouchableOpacity
                style={(loading || !email || !password) ? basic.btnDisable : basic.btn}
                disabled={loading || !email || !password}
                onPress={() => {
                  setLoading(true);
                  login({identifier: email, password: password}).unwrap().then((res) => {
                    setLoading(false);
                    dispatch(setCredentials(res));
                    getMe(qs.stringify({
                      filters: {},
                      populate: [
                        'pops',
                        'pops.image',
                        'avatar',
                      ],
                    }, {encodeValuesOnly: true})).unwrap().then((res) => {
                      dispatch(setUser({user: res}));
                      console.log("res ", res)
                      navigation.navigate('TabScreen');
                    });
                  }).catch((err) => {
                    setLoading(false);
                    Alert.alert('Erreur', err.data?.error?.message?.includes('Invalid') ? "Identifiant incorrect." : 'Erreur de serveur, veuillez réessayer ultérieurement.', [
                      {text: 'OK'},
                    ]);
                  })
                }}>
                  <Text style={basic.btnTxt}>{"Se connecter"}</Text>
                </TouchableOpacity>
              <TouchableOpacity
                style={basic.btnWhiteout}
                disabled={loading}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={basic.btnTxtOut}>{"Créer un compte"}</Text>
              </TouchableOpacity>
              </> :
              <TouchableOpacity
              style={(passForgot && !email) ? basic.btnDisable : basic.btn}
              disabled={passForgot && !email}
              onPress={() => {
                setLoading(true);
                fetch(API_URL + '/api/auth/forgot-password', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email
                  })
                })
                .then(response => {setLoading(false);return response.json()})
                .then(data => {
                  Alert.alert('Envoyé', 'Un mail de réinitialisation vous a été envoyé.', [
                    {text: 'OK'},
                  ]);
                  setLoading(false);
                })
                .catch(() => {
                  Alert.alert('Erreur', 'Erreur du serveur, veuillez réessayer plus tard.', [
                    {text: 'OK'},
                  ]);
                  setLoading(false);
                });
              }}>
                <Text style={basic.btnTxt}>{"Réinitialiser"}</Text>
              </TouchableOpacity>
            }
              </>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </ScrollView>
        {
          !passForgot &&
          <TouchableOpacity
          style={styles.passForgot}
          disabled={loading}
          onPress={() => {
            setPassForgot(true);
          }}>
          <Text style={styles.passTxt}>Mot de passe oublié?</Text>
        </TouchableOpacity>
        }
      {
        passForgot &&
        <TouchableOpacity style={styles.backUp}
          onPress={() => {
            setPassForgot(false);
          }}>
          <Icon name={'chevron-back-outline'} size={30} color={'black'} style={styles.icon} />
        </TouchableOpacity>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  logo: {
    height: '15%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'Helvetica-Bold',
  },
  passForgot: {
    alignSelf: 'center',
  },
  passTxt: {
    fontFamily: 'Helvetica',
    marginTop: 10,
    fontSize: 13,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  bottomTxt: {
    textAlign: 'auto',
    fontSize: 16,
    fontFamily: 'Helvetica',
    marginBottom: 10,
    color: 'white'
  },
  pinkTxt: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: color.pink,
  },
  row: {
    flexDirection: 'row',
  },
  back: {
    width: 30,
    height: 40,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 8,
    backgroundColor: color.lightPurple
  },
  eye: {
    padding: 2,
  },
  centerBox: {
    display: 'flex',
    flex: 5,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  backUp: {
    position: 'absolute',
    top: 35,
    left: 0,
    justifyContent: 'center',
    padding: 20,
  },
});

export default Login;
