import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import { useHeaderHeight } from '@react-navigation/elements'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as ImagePicker from 'expo-image-picker';
import { useCreatePopMutation } from '../services/auth';

Icon.loadFont();

const Creation = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [other, setOther] = useState('');
  const [serie, setSerie] = useState('');
  const [checked, setChecked] = useState('change');
  const [prio, setPrio] = useState(false);
  const [img1, setImg1] = useState(null);
  const [createPop] = useCreatePopMutation()
  const height = useHeaderHeight()

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

  const cleanVariables = () => {
    setImg1(null);
    setSerie(null);
    setName('');
    setNote('');
    setOther('');
  }


  return (
    <SafeAreaView style={styles.container}>
        <View style={basic.containerBg} />
        <View style={basic.containerBgBotWhite} />
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
            <TouchableOpacity style={[(route.params && route.params.editMode) ?styles.hide : styles.backUp]}
                onPress={() => {
                    navigation.navigate('Profile');
                }}>
                <Icon name={'arrow-left'} size={20} color={'white'} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{(route.params && route.params.editMode) ? 'Modifier votre popmart' : 'Ajouter un popmart'}</Text>
            <View style={styles.empty}/>
        </View>
        <ScrollView style={styles.scroll}  contentContainerStyle={{ flex: 1, justifyContent: 'flex-end'}}>
          <KeyboardAwareScrollView keyboardVerticalOffset={height}
              behavior={Platform.OS === "ios" ? "padding" : 'height'}
              style={{flex: 1}} enabled>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.form}>
                      {/* <Text style={styles.info}>Ajouter une image qui représente le ou les popmarts que vous recherchez/échangez</Text> */}
                      <Text style={basic.label}>Ajouter une image</Text>
                      <View style={styles.imgRow}>
                          <TouchableOpacity style={styles.addImg} onPress={async() => {
                            let result = await ImagePicker.launchImageLibraryAsync({
                              allowsEditing: true,
                              quality: 1,
                            });

                            if (!result.canceled) {
                              setImg1(result.assets[0]);
                            } else {
                              alert('You did not select any image.');
                            }
                          }}>
                            {
                              img1 ? <Image style={styles.addPic} source={{uri: img1.uri}} resizeMode="cover" />
                              : <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                            }
                          </TouchableOpacity>
                          {/* <TouchableOpacity style={styles.addImg}>
                              {
                              img2 ? <Image style={styles.addPic} source={{uri: img2.uri}} resizeMode="cover" />
                              : <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                            }
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addImg}>
                              {
                              img3 ? <Image style={styles.addPic} source={{uri: img3.uri}} resizeMode="cover" />
                              : <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                            }
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.addImg}>
                              {
                              img4 ? <Image style={styles.addPic} source={{uri: img4.uri}} resizeMode="cover" />
                              : <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />
                            }
                          </TouchableOpacity> */}
                      </View>
                      <Text style={basic.label}>Série</Text>
                      <View style={styles.btnRow}>
                      {
                          menu.map((item, id) => {
                              return (
                                <TouchableOpacity style={[styles.badge, {backgroundColor: (serie && item.id == serie.id) ? color.pink : color.lightPurple}]}
                                  onPress={() => {
                                    setSerie(item)
                                  }} key={id}>
                                  <Text style={styles.smTxt}>{item.name}</Text>
                                </TouchableOpacity>
                              )
                            })
                      }
                      </View>
                      {
                          serie && serie.id == 9 && <>
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
                          onChangeText={setName}
                          value={name}
                          placeholder='Exemple: Mime silent'
                      />
                      <Text style={basic.label}>Statut</Text>
                      <View style={styles.radioBox}>
                      <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                          <RadioButton.Item color={color.pink} labelStyle={{fontFamily: 'rbt-Bold'}} label="Je veux l'échanger" value="change" />
                          <RadioButton.Item color={color.pink} labelStyle={{fontFamily: 'rbt-Bold'}} label="Je cherche ce modèle" value="looking" />
                          <RadioButton.Item color={color.pink} labelStyle={{fontFamily: 'rbt-Bold'}} label="Elle est réservé" value="booked" />
                      </RadioButton.Group>
                      </View>
                      {
                        checked == 'look' &&
                        <>
                          <Text style={basic.label}>Priorité</Text>
                          <BouncyCheckbox
                              size={25}
                              fillColor={color.pink}
                              unfillColor="#FFFFFF"
                              text="Recherche en priorité"
                              iconStyle={{ borderColor: "red" }}
                              innerIconStyle={{ borderWidth: 2 }}
                              textStyle={{textDecorationLine: "none", fontFamily: 'rbt-Bold', fontSize: 18, color: 'black'}}
                              onPress={() => {setPrio(!prio)}}
                          />
                        </>
                      }
                      <Text style={basic.label}>Une note</Text>
                      <TextInput
                          style={basic.input}
                          onChangeText={setNote}
                          value={note}
                          placeholder="Exemple: Je l'échange que contre le modele x"
                      />
                      <View style={basic.break} />
                      <TouchableOpacity
                          style={basic.btn}
                          onPress={() => {
                            createPop({data: {note: note, name: name, serie: serie.name, priority: prio, state: checked, image: img1}}).unwrap().then((res) => {
                                console.log("res ", res);
                            })
                            cleanVariables();
                          }}>
                          <Text style={basic.btnTxt}>{(route.params && route.params.editMode) ? "Sauvegarder" : "Ajouter"}</Text>
                      </TouchableOpacity>
                      {
                        (route.params && route.params.editMode) &&
                          <TouchableOpacity
                            style={basic.btn}
                            onPress={() => {
                              cleanVariables();
                            }}>
                            <Text style={basic.btnTxt}>Supprimer</Text>
                        </TouchableOpacity>
                      }
                      <View style={basic.break} />
                  </View>
              </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    backgroundColor: 'white'
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
    padding: 5,
  },
  title: {
    padding: 10,
    fontFamily: 'rbt-Bold',
    fontSize: 28,
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
  addPic: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
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
  },
  scroll: {
    width: '100%',
  },
  info: {
    marginTop: 20,
    fontSize: 18,
    color: color.pink,
    marginBottom: 10,
    fontFamily: 'rbt-Bold',
    width: '100%',
    textAlign: 'center',
  }
});

export default Creation;
