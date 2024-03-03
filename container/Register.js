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
  Linking,
  TouchableOpacity,
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {Load} from '../component/Load';
import { useDispatch } from 'react-redux';
import { useSignupMutation, useLazyGetMeQuery } from '../services/auth';
import { setCredentials, setUser } from '../slices/authslice';
import PhoneInput from "react-native-phone-number-input";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { useHeaderHeight } from '@react-navigation/elements'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const qs = require("qs")

Icon.loadFont();

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [accept, setAccept] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const [getMe] = useLazyGetMeQuery();
  const refMail = useRef(null);
  const refPass = useRef(null);
  const refPhone = useRef(null);
  const height = useHeaderHeight()
  const [formattedValue, setFormattedValue] = useState("");

  function registerUser() {
    setLoading(true);
    signup({username, password, email, phone}).unwrap().then((res) => {
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
        navigation.navigate('TabScreen');
      });
    }).catch((err) => {
      setLoading(false);
      Alert.alert('Erreur', err.data?.error?.message?.includes('Email') ? "Email ou nom d'utilisateur déjà prise." : 'Erreur de serveur, veuillez réessayer ultérieurement.', [
        {text: 'OK'},
      ]);
    })
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
        <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
        <KeyboardAwareScrollView keyboardVerticalOffset={height}
          behavior={Platform.OS === "ios" ? "padding" : 'height'}
          style={{flex: 1}} enabled>
          <Text style={basic.label}>{"Nom d'utilisateur"}</Text>
          <TextInput
            style={basic.input}
            onChangeText={setUsername}
            value={username}
            onSubmitEditing={() => refMail?.current?.focus()}
          />
          <Text style={basic.label}>E-mail</Text>
          <TextInput
            style={basic.input}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            ref={refMail}
            onSubmitEditing={() => refPass?.current?.focus()}
          />
          <Text style={basic.label}>
            {'Mot de passe'}
          </Text>
          <TextInput
            style={basic.input}
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}
            ref={refPass}
            onSubmitEditing={() => refPhone?.current?.focus()}
          />
          <Text style={basic.label}>
            {'Téléphone'}
          </Text>
          {/* <TextInput
            style={basic.input}
            keyboardType='phone-pad'
            onChangeText={setPhone}
            value={phone}
            ref={refPhone}
          /> */}
          <PhoneInput
            ref={refPhone}
            defaultCode="FR"
            defaultValue={phone}
            placeholder="Celui de whatsapp"
            layout="first"
            onChangeText={setPhone}
            containerStyle={styles.inputPhone}
            textContainerStyle={styles.inputPhone}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
          />
          <View style={basic.break} />
          <View style={styles.rowPolitic}>
            <BouncyCheckbox
                size={25}
                fillColor={color.pink}
                unfillColor="#FFFFFF"
                text=""
                style={{width: '10%', marginRight: 10,}}
                innerIconStyle={{ borderWidth: 2}}
                textStyle={{textDecorationLine: "none"}}
                onPress={() => {setAccept(!accept)}}
            />
            <TouchableOpacity onPress={() => {Linking.openURL('http://amapop.fr/politic')}}>
              <Text style={{fontFamily: 'rbt-Regular'}}>J'accepte les conditions générale d'utilisation, <Text style={{fontFamily: 'rbt-Bold'}}>voir le CGU</Text></Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={((!username || !password || !email) || loading || !accept) ? basic.btnDisable : basic.btn}
            disabled={(!username || !password || !email) || loading || !accept}
            onPress={() => {
              registerUser();
            }}>
            <Text style={basic.btnTxt}>{'Créer un compte'}</Text>
          </TouchableOpacity>
          </KeyboardAwareScrollView>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  first: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
    width: '100%',
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
  rowPolitic: {
    flexDirection: 'row',
    marginTop: 10, 
    marginBottom: 10,
    width: '80%',
  },
  back: {
    width: 30,
    height: 40,
  },
  inputPhone: {
    borderRadius: 6,
    backgroundColor: color.lightPurple,
    fontFamily: 'rbt-Regular',
  }
});

export default Register;
