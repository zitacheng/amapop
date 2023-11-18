import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {color} from '../constant/color';

export const MultiLang = (param) => {
  return (
    <View
      style={param && param.bottom == true ? styles.bottom : styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    right: 20,
    position: 'absolute',
  },
  bottom: {
    bottom: 20,
    left: 20,
    position: 'absolute',
  },
  lang: {
    fontSize: 20,
    fontFamily: 'D-DINCondensed-Bold',
    color: color.grey
    // marginRight: 10,
  },
  selected: {
    fontSize: 20,
    fontFamily: 'D-DINCondensed-Bold',
    color: color.pink,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  bar: {
    backgroundColor: color.grey,
    width: 2,
    height: 20,
    marginRight: 5,
    marginLeft: 5,
  },
});
