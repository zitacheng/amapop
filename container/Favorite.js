import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
// import {translate} from '../constant/config.js';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';

Icon.loadFont();

const Favorite = ({navigation}) => {
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  }
});

export default Favorite;
