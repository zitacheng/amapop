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
import cgu from '../assets/cgu.pdf'; //TODO UPDATE CGU
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {registerInstal} from '../component/Utils.js';
import {Load} from '../component/Load';
import {Confirmation} from '../component/Confirmation';
import {RFValue} from 'react-native-responsive-fontsize';
import {saveLang} from '../component/Utils';

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
      <StatusBar barStyle="dark-content" />
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
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              <Text style={styles.label}>
                {'Username'}{' '}
                <Text style={{color: color.pink}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
              />
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
              <TouchableOpacity
                style={(!username || !password || !email) ? basic.btnDis : basic.btn}
                disabled={(!username || !password || !email) &&loading}
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
                {'Already have an account? '}
              </Text>
              <Text style={styles.pinkTxt}>{'Login'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {showPdf ? (
        <View style={styles.pdfScreen}>
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
    backgroundColor: color.orange
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
});

export default Register;
