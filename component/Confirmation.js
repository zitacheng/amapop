import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import {color} from '../constant/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {basic} from '../constant/basic';
import {RFValue} from 'react-native-responsive-fontsize';

// eslint-disable-next-line prettier/prettier
export const Confirmation = ({header, sub, navigation, setStep, stepVal, newAccount, setShowNotif}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="ios-checkmark-circle-outline"
          size={130}
          color={color.pink}
        />
        <Text style={[styles.header, {marginBottom: 20}]}>{header}</Text>
        <Text style={styles.header}>{sub}</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={basic.btn}
          onPress={() => {
            if (newAccount === true) {
              if (Platform.OS == 'ios') {
                setShowNotif(true);
              } else {
                navigation.navigate('NotValidate');
              }
            } else {
              setStep(stepVal ? stepVal : 0);
            }
          }}>
          <Text style={basic.btnTxt}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontFamily: 'Helvetica-Bold',
    fontSize: RFValue(20),
    marginTop: 40,
    textTransform: 'uppercase',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: 250,
    lineHeight: 25,
  },
  bottom: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
});
