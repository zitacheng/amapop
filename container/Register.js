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
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import arrow from '../assets/arrow.png';
import cgu from '../assets/cgu.pdf'; //TODO UPDATE CGU
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
// import {translate} from '../constant/config.js';
import {registerInstal} from '../component/Utils.js';
import {Load} from '../component/Load';
import {Confirmation} from '../component/Confirmation';
// import Pdf from 'react-native-pdf';
import {RFValue} from 'react-native-responsive-fontsize';
import {saveLang} from '../component/Utils';

Icon.loadFont();
// const Parse = require('parse/react-native.js');

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [warning, setWarning] = useState(false);

  //   const [countryCode, setCountryCode] = useState('FR');
  //   const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  //   const onSelect = (res) => {
  //     console.log(res);
  //     setCountryCode(res.cca2);
  //     setCountry(res);
  //   };

  function registerUser() {
    // (country.trim().toLowerCase() === 'france' && !siret) ||
    // (country !== '' &&
    //   (!countrie.includes(country.trim().toLowerCase()) ||
    //     !countrieFr.includes(country.trim().toLowerCase())) &&
    //   !tvaNum)

    // else if (
    //   (discover == 'others' && !other) ||
    //   (categories.includes('others') && !otherCat) ||
    //   (activities.includes('others') && !otherAct)
    // ) {
    //   Alert.alert(
    //     translate('err_register'),
    //     translate('fill_all'),
    //     [{text: translate('ok'), onPress: () => setLoading(false)}],
    //     {
    //       cancelable: true,
    //     },
    //   );
    //   setWarning(true);
    // }

    if (
      !email ||
      !firstname ||
      !password
    ) {
      Alert.alert(
        'error',
        'Fill all',
        [{text: 'ok', onPress: () => setLoading(false)}],
        {
          cancelable: true,
        },
      );
      setWarning(true);
    } else {
      setLoading(true);
      const User = Parse.Object.extend('User');
      const query = new User();
      query.set('email', email);
      query.set('firstname', firstname);
      query.set('password', password);
      if (Platform.OS == 'android') {
        query.set('notif', true);
      }
      var parseFile = new Parse.File(kbis.fileName, {
        base64: kbis.base64,
      });
      query.set('kbis', parseFile);
      query.save().then(
        (res) => {
          var params = {
            msg: 'Nouveau compte créé',
            id: 'hZ3cUOCL6b',
          };
          Parse.Cloud.run('notif', params);
          var params = {
            msg: 'Nouveau compte créé',
            id: 'dZ7gGhrLhW',
          };
          Parse.Cloud.run('notif', params);
          let user = Parse.User;
          user
            .logIn(email, password)
            .then(function (userRes) {
              saveLang(userRes);
              if (Platform.OS == 'android') {
                registerInstal(userRes);
              }
              setLoading(false);
              setCreated(true);
            })
            .catch(function (error) {
              setLoading(false);
              Alert.alert(
                'Error login',
                'Please login from the login page',
                [{text: 'ok'}],
                {
                  cancelable: true,
                },
              );
            });
        },
        (error) => {
          setLoading(false);
          Alert.alert(
            'Error registering',
            'Email already exist',
            [{text: 'ok'}],
            {
              cancelable: true,
            },
          );
        },
      );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* {showNotif && !loading && (
        <Notif
          setCreated={setCreated}
          newAccount={true}
          navigation={navigation}
        />
      )} */}
      {created && !loading && !showNotif && (
        <Confirmation
          header={'Thank you for registering'}
          sub={'See you'}
          navigation={navigation}
          newAccount={true}
          setShowNotif={setShowNotif}
        />
      )}
      {!created && !showNotif && (
        <>
          <View style={styles.first}>
            <Image style={styles.logo} source={logo} resizeMode="contain" />
          </View>
          <TouchableOpacity
            style={basic.back}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image style={styles.back} source={arrow} resizeMode="contain" />
          </TouchableOpacity>
          {/* <MultiLang /> */}
          <Load loading={loading} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={styles.scrollContent}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              <Text style={styles.field}>
                <Text style={{color: color.pink}}>*</Text>
                {'Required field'}
              </Text>
              {warning == true && civil == null ? (
                <Text style={styles.redTxt}>{'This field is mandatory'}</Text>
              ) : null}
              <Text style={styles.label}>
                {'Firstname'}{' '}
                <Text style={{color: color.pink}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setFirstname}
                value={firstname}
              />
              {warning == true && !lastname ? (
                <Text style={styles.redTxt}>{'This field is mandatory'}</Text>
              ) : null}
              <Text style={styles.label}>
                E-mail <Text style={{color: color.pink}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                autoCapitalize={'none'}
                placeholder={'Email'}
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
              />
              {warning == true && !email ? (
                <Text style={styles.redTxt}>{'This field is mandatory'}</Text>
              ) : null}
              <Text style={styles.label}>
                {'Password'}{' '}
                <Text style={{color: color.pink}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
              />
              {warning == true && !password ? (
                <Text style={styles.redTxt}>{'This field is mandatory'}</Text>
              ) : null}
              {/* {warning == true && !politic ? (
                <Text style={styles.redTxt}>{'Please accept the Terms of service.'}</Text>
              ) : null} */}
              <TouchableOpacity
                style={basic.btn}
                disabled={loading}
                onPress={() => {
                  registerUser();
                }}>
                <Text style={basic.btnTxt}>{'Registration'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={styles.row}>
              <Text style={styles.bottomTxt}>
                {'Already have an account?'}
              </Text>
              <Text style={styles.pinkTxt}>{'Login'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {showPdf ? (
        <View style={styles.pdfScreen}>
          {/* <Pdf
            spacing={0}
            source={cgu}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link presse: ${uri}`);
            }}
            style={styles.pdf}
          /> */}
          <TouchableOpacity
            style={[basic.smbtn, {width: '60%', alignSelf: 'center'}]}
            onPress={() => {
              setShowPdf(false);
            }}>
            <Text style={basic.smbtnTxt}>{'Back'}</Text>
          </TouchableOpacity>
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
  first: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    width: '100%',
    height: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  field: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-start',
    fontSize: RFValue(15),
    fontFamily: 'D-DINCondensed',
  },
  proFiled: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: RFValue(18),
    marginBottom: 15,
    fontFamily: 'D-DINCondensed-Bold',
  },
  fieldsm: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'D-DINCondensed',
  },
  checkTxt: {
    fontSize: RFValue(16),
    marginTop: 5,
    fontFamily: 'D-DINCondensed',
    fontWeight: '300',
  },
  logo: {
    width: '60%',
    height: '40%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'D-DINCondensed-Bold',
  },
  titleLine: {
    fontSize: RFValue(22),
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'D-DINCondensed-Bold',
  },
  line: {
    height: 0.5,
    backgroundColor: 'black',
    flex: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    padding: 10,
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
    fontSize: RFValue(18),
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
  rowRadio: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
  },
  radio: {
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
    margin: 0,
  },
  radioMode: {
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  radioSell: {
    borderColor: 'transparent',
    borderWidth: 0,
    width: '50%',
    padding: 0,
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  radioSellOther: {
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  radioOther: {
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    marginLeft: 4,
  },
  inputOther: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.4,
    padding: 5,
    width: 150,
  },
  check: {
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
    width: 20,
    marginLeft: 19,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'D-DINCondensed-Bold',
    fontSize: 24,
  },
  checkRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '80%',
  },
  checkCol: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pdf: {
    flex: 1,
  },
  pdfBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  policy: {
    fontFamily: 'D-DINCondensed-Bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  redTxt: {
    color: 'red',
    fontSize: RFValue(12),
    textAlign: 'left',
    width: '80%',
    fontFamily: 'D-DINCondensed',
    marginTop: 4,
  },
  pdfScreen: {
    flex: 1,
    position: 'absolute',
    marginTop: 45,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 60,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  back: {
    width: 30,
    height: 40,
  },
  kbisBtn: {
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 1,
    borderStyle: 'dotted',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  kbisIcon: {
    width: 20,
    height: 20,
    // marginRight: 'auto',
  },
  kbisTxt: {
    color: 'black',
    fontSize: RFValue(14),
    alignSelf: 'center',
    fontFamily: 'D-DINCondensed-Bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '80%',
  },
});

export default Register;

{
  /* <CountryPicker
{...{
  countryCode,
  withFilter: false,
  withFlag: true,
  withCountryNameButton: true,
  withAlphaFilter: false,
  withCallingCode: false,
  withEmoji: true,
  onSelect,
  withModal: true,
  translation: I18n.locale === 'fr' ? 'fra' : '',
}}
visible
/> */
}
