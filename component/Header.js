import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {StyleSheet, Image, Text} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';

export const Header = ({title, setStep, stepVal, navigation, addMarg}) => {
  return (
    <>
      <View style={addMarg ? styles.rowBig : styles.row}>
        {(setStep || navigation) && (
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              if (setStep) {
                setStep(stepVal);
              } else if (navigation) {
                navigation.goBack();
              }
            }}>
            <Image style={styles.icon} source={arrow} resizeMode="contain" />
          </TouchableOpacity>
        )}
        <Image style={styles.logo} source={images.logo} resizeMode="contain" />
      </View>

      {title && <Text style={styles.title}>{title}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textTransform: 'uppercase',
    fontFamily: 'D-DINCondensed-Bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 50,
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height: 50,
  },
  rowBig: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    height: 50,
  },
  back: {
    paddingLeft: 15,
    position: 'absolute',
  },
  icon: {
    width: 30,
    height: 40,
  },
});
