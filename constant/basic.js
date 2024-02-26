import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {color} from './color';

export const basic = StyleSheet.create({
  btn: {
    backgroundColor: color.pink,
    alignSelf: 'center',
    padding: 15,
    minWidth: '75%',
    marginTop: 15,
    borderRadius: 6,
  },
  btnDisable: {
    backgroundColor: color.grey,
    alignSelf: 'center',
    padding: 15,
    minWidth: '75%',
    marginTop: 15,
    borderRadius: 6,
  },
  btnWhiteout: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding: 15,
    minWidth: '75%',
    marginTop: 15,
    borderRadius: 6,
    borderColor: color.pink,
    borderWidth: 2,
  },
  btnTxt: {
    color: 'white',
    fontSize: RFValue(16),
    alignSelf: 'center',
    fontFamily: 'rbt-Bold',
    textTransform: 'uppercase',
  },
  btnTxtOut: {
    color: color.pink,
    fontSize: RFValue(16),
    alignSelf: 'center',
    fontFamily: 'rbt-Bold',
    textTransform: 'uppercase',
  },
  btnDis: {
    backgroundColor: color.ligtGrey,
    alignSelf: 'center',
    padding: 15,
    minWidth: '75%',
    marginTop: 15,
    borderRadius: 6,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'rbt-Bold',
    width: '100%',
  },
  input: {
    borderRadius: 6,
    padding: 20,
    backgroundColor: color.lightPurple,
    width: '100%',
    fontFamily: 'rbt-Regular'
  },
  break: {
    height: 20,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logo: {
    height: 30,
    width: 100,
    margin: 30
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 8,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  btnOff: {
    backgroundColor: 'grey',
    alignSelf: 'center',
    padding: 15,
    minWidth: '75%',
    marginTop: 15,
  },
  btnOffFull: {
    backgroundColor: '#D5D5D5',
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    marginTop: 30,
  },
  btnLight: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    padding: 15,
    minWidth: '75%',
    marginTop: 10,
  },
  smBtnRound: {
    backgroundColor: color.pink,
    padding: 5,
    borderRadius: 15
  },
  containerBg: {
    backgroundColor: color.pink,
    width: '100%',
    height: '50%',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  containerBgBotWhite: {
    backgroundColor: color.white,
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  smbtn: {
    backgroundColor: 'black',
    padding: 10,
    minWidth: '30%',
    marginBottom: 10,
    marginTop: 10,
  },

  barIcon: {
    width: 20,
    height: 20,
  },
  back: {
    top: '7%',
    left: 20,
    position: 'absolute',
  },
  backSm: {
    top: '3%',
    left: 20,
    position: 'absolute',
  },
  add: {
    bottom: 25,
    right: 0,
    position: 'absolute',
    padding: 10,
    paddingRight: 0,
  },
  addTop: {
    top: 40,
    position: 'absolute',
    padding: 20,
  },
  spinnerTextStyle: {
    color: 'white',
    fontFamily: 'rbt-Bold',
  },
  upper: {
    textTransform: 'uppercase',
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
    fontFamily: 'rbt-Bold',
    fontSize: RFValue(24),
  },
  center: {
    alignSelf: 'center',
  },
  centerItem: {
    alignItems: 'center',
  },
  txtLight: {
    color: 'white',
    fontSize: RFValue(11),
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Futura-Medium',
  },
});
