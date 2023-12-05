import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {images} from '../constant/images';
import arrow from '../assets/arrow.png';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../constant/color';
import {basic} from '../constant/basic';
import {MultiLang} from '../component/Multilang';
import {Load} from '../component/Load';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { RadioButton, Checkbox } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";

Icon.loadFont();

const Creation = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [other, setOther] = useState('');
  const [serie, setSerie] = useState('');
  const [checked, setChecked] =useState('first');
  const [prio, setPrio] =useState('first');

  const menu = [
    {id: 0, name: 'Labubu', selected: false},
    {id: 1, name: 'Azura', selected: false},
    {id: 2, name: 'SkullPanda', selected: false},
    {id: 3, name: 'Hirono', selected: false},
    {id: 4, name: 'Nori', selected: false},
    {id: 5, name: 'Molly', selected: false},
    {id: 6, name: 'Hapuchichi', selected: false},
    {id: 7, name: 'Cry Baby', selected: false},
    {id: 8, name: 'Dimoo', selected: false},
    {id: 9, name: 'Autre', selected: false},
  ];

  return (
    <SafeAreaView style={styles.container}>
        <View style={basic.containerBg} />
        <View style={basic.containerBgBotWhite} />
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
            <TouchableOpacity style={[(route.params && route.params.editMode) ?styles.hide : styles.backUp]}
                onPress={() => { navigation.goBack();}}>
                <Icon name={'arrow-left'} size={20} color={'white'} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{(route.params && route.params.editMode) ? 'Modifier votre popmart' : 'Ajouter un popmart'}</Text>
            <View style={styles.empty}/>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.form}>
                    <Text style={basic.label}>Ajouter des images</Text>
                    <View style={styles.imgRow}>
                        <TouchableOpacity style={styles.addImg}>
                            <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addImg}>
                            <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addImg}>
                            <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addImg}>
                            <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={basic.label}>Série</Text>
                    <View style={styles.btnRow}>
                    {
                         menu.map((item, id) => {
                            return (
                              <TouchableOpacity style={[styles.badge, {backgroundColor: item.id == serie ? color.pink : color.lightPurple}]}
                                onPress={() => {
                                  setSerie(item.id)
                                }} key={id}>
                                <Text style={styles.smTxt}>{item.name}</Text>
                              </TouchableOpacity>
                            )
                          })
                    }
                    </View>
                    {
                        serie == 9 && <>
                            <Text style={basic.label}>Autre serie</Text>
                            <TextInput
                                style={basic.input}
                                autoCapitalize={'none'}
                                keyboardType="email-address"
                                onChangeText={setOther}
                                value={other}
                            />
                        </>
                    }
                    <Text style={basic.label}>Nom du popmart</Text>
                    <TextInput
                        style={basic.input}
                        autoCapitalize={'none'}
                        keyboardType="email-address"
                        onChangeText={setName}
                        value={name}
                    />
                    <Text style={basic.label}>Objectif de la publication</Text>
                    <View style={styles.radioBox}>
                    <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                        <RadioButton.Item color={color.pink} label="Je veux l'échanger" value="first" />
                        <RadioButton.Item color={color.pink} label="Je cherche ce modèle" value="second" />
                    </RadioButton.Group>
                    </View>
                    <Text style={basic.label}>Priorité</Text>
                    {/* <Checkbox.Item color={color.pink} label="Recherche en priorité" status={prio ? 'checked' : 'unchecked'} onPress={() => {
                        setPrio(!prio);
                    }}/> */}
                    <BouncyCheckbox
                        size={25}
                        fillColor={color.pink}
                        unfillColor="#FFFFFF"
                        text="Recherche en priorité"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{textDecorationLine: "none"}}
                        onPress={() => {setPrio(!prio)}}
                    />
                    <TouchableOpacity
                        style={basic.btn}
                        onPress={() => {
                        }}>
                        <Text style={basic.btnTxt}>{(route.params && route.params.editMode) ? "Sauvegarder" : "Ajouter"}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  back: {
    width: 30,
    height: 40,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: color.pink,
    padding: 10,
  },
  title: {
    padding: 10,
    fontFamily: 'Helvetica-Bold',
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    color: 'white'
  },
  backUp: {
    justifyContent: 'center',
    width: '10%',
    opacity: 0
  },
  empty: {
    width: '10%',
  },
  icon: {
    alignSelf: 'center',
    padding: 10,
  },
  form: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  imgRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  addImg: {
    backgroundColor: color.lightPurple,
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center'
  },
  badge: {
    borderRadius: 15,
    padding: 5,
    marginTop: 5,
    marginRight: 5
  },
  smTxt: {
    color: 'white',
    fontFamily: 'Helvetica-Bold'
  },
  btnRow: {
    flexDirection: 'row',
    display: 'flex',
    width: '90%',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  radioBox: {
    backgroundColor: 'white',
  }
  
});

export default Creation;
