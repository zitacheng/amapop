import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  SafeAreaView,
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

  // const count = useSelector(state => state.count);

  // function logUser() {

      // Request API.
      // axios
      //   .post('http://localhost:1337/api/auth/local', {
      //     identifier: email,
      //     password: password,
      //   })
      //   .then(response => {
      //     // Handle success.
      //     console.log('User profile', response.data.user);
      //     console.log('User token', response.data.jwt);
      //     // alert('Log in successful');
      //     navigation.navigate('TabScreen');

      //   })
      //   .catch(error => {
      //     // Handle error.
      //     console.log('An error occurred:', error.response);
      //     alert("Erreur de connexion, vérifiez le mot de passe ou l'email / nom d'utilisateur");
      //   });
  // }

  function restPass() {
    setLoading(true);
    console.log("RESET PASS")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Load loading={loading} />
      <View style={styles.centerBox}>
        <Image style={styles.logo} source={images.logo} resizeMode="contain" />
        <Text style={basic.label}>E-mail / Nom d'utilisateur</Text>
        <TextInput
          style={basic.input}
          autoCapitalize={'none'}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        {!passForgot && (
          <>
            <Text style={basic.label}>{'Mot de passe'}</Text>
            <View style={styles.searchSection}>
              <TextInput
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
          </>
        )}
        <View style={basic.break} />
        {passForgot ? (
          <>
            <TouchableOpacity
              style={!email ? basic.btnDis : basic.btn}
              disabled={!email}
              onPress={restPass}>
              <Text style={basic.btnTxt}>{"Initialize"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={basic.btn}
              onPress={() => {
                setPassForgot(false);
              }}>
              <Text style={basic.btnTxt}>{"Cancel"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={basic.btn}
              // disabled={loading || !email || !password}
              onPress={async () => {
                console.log("BEFORE LOGINUSER")
                login({identifier: email, password: password}).unwrap().then((res) => {
                  console.log(res);
                  dispatch(setCredentials(res));
                  getMe(qs.stringify({
                    filters: {},
                    populate: [
                      'pops',
                      'pops.image',
                      'avatar',
                    ],
                  }, {encodeValuesOnly: true})).unwrap().then((res) => {
                    console.log('res GETME', res);
                    dispatch(setUser({user: res}));
                    navigation.navigate('TabScreen');
                  });
                })
                // const res = await loginUser({username: email, password: password, dispatch: dispatch});
                // console.log("FINAL ", res);
                // if (res?.status === "success") {
                //   navigation.navigate('TabScreen');
                //   setEmail('')
                //   setPassword('')
                // }
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
          </>
        )}
      </View>
      {!passForgot ? (
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.bottomTxt}
            onPress={() => {
              setPassForgot(true);
            }}>
            <Text style={styles.bottomTxt}>{"Password forgot"}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white'
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
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default Login;
