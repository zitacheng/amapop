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
    fontSize: RFValue(14),
    alignSelf: 'center',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
  },
  btnTxtOut: {
    color: color.pink,
    fontSize: RFValue(14),
    alignSelf: 'center',
    fontFamily: 'Helvetica-Bold',
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
    color: color.grey,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
    width: '100%',
  },
  input: {
    borderRadius: 6,
    padding: 20,
    backgroundColor: color.ultraLightPurple,
    width: '100%',
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
  btnFutura: {
    backgroundColor: 'black',
    alignSelf: 'center',
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 0,
    justifyContent: 'center',
    minWidth: '50%',
  },
  btnFull: {
    backgroundColor: 'black',
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    marginTop: 15,
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
  smbtn: {
    backgroundColor: 'black',
    padding: 10,
    minWidth: '30%',
    marginBottom: 10,
    marginTop: 10,
  },
  smbtnOff: {
    backgroundColor: 'grey',
    padding: 10,
    minWidth: '30%',
    marginBottom: 10,
    marginTop: 10,
  },
  btnTxtFutura: {
    color: 'white',
    fontSize: RFValue(12),
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'Futura-Medium',
    textTransform: 'uppercase',
  },
  btnTxtDark: {
    color: 'black',
    fontSize: RFValue(14),
    alignSelf: 'center',
    fontFamily: 'Futura-Medium',
    textTransform: 'uppercase',
  },
  smbtnTxt: {
    color: 'white',
    fontSize: RFValue(13),
    alignSelf: 'center',
    fontFamily: 'Futura-Medium',
    textTransform: 'uppercase',
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
    fontFamily: 'Helvetica-Bold',
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
    fontFamily: 'Helvetica-Bold',
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
