import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Alert,
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
import { useCreatePopMutation, useGetSeriesQuery } from '../services/auth';
import { useAuth } from '../hooks/useAuth';

const qs = require("qs")
Icon.loadFont();

const Creation = ({navigation, route}) => {
  const [loading,setLoading] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [other, setOther] = useState('');
  const [serie, setSerie] = useState([]);
  const [checked, setChecked] = useState('change');
  const [prio, setPrio] = useState(false);
  const [img1, setImg1] = useState(null);
  const [createPop] = useCreatePopMutation()
  const height = useHeaderHeight()
  const user = useAuth();
  const {data: fetchedSeries, fetchingSeries, error: errorSeries} = useGetSeriesQuery(qs.stringify({
    sort: ['name']
  }, {encodeValuesOnly: false}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});

  const cleanVariables = () => {
    setImg1(null);
    setSerie([]);
    setName('');
    setNote('');
    setOther('');
  }

  console.log("serie ", serie)

  return (
    <SafeAreaView style={styles.container}>
        <Load loading={loading} />
        <View style={basic.containerBg} />
        <View style={basic.containerBgBotWhite} />
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.title}>{'Ajouter un popmart'}</Text>
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
                              allowsEditing: false,
                              aspect: [1, 1],
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
                      <Text style={basic.label}>Série<Text style={basic.mandatory}>*</Text></Text>
                      <View style={styles.btnRow}>
                      {
                          fetchedSeries?.data?.map((item, id) => {
                            if (item.id == 11)
                              return (
                                <TouchableOpacity style={[styles.badge, {backgroundColor: (serie && (serie.find(el => el.id === item.id))) ? color.pink : color.lightPurple}]}
                                  onPress={() => {
                                    let tmp = [...serie];
                                    let idx = tmp.findIndex(el => el.id === item.id);
                                    if (idx >= 0)
                                      tmp.splice(idx, 1);
                                    else
                                      tmp.push({name: item.attributes.name, id: item.id});
                                    setSerie(tmp)
                                  }} key={id}>
                                  <Text style={styles.smTxt}>{item.attributes.name}</Text>
                                </TouchableOpacity>
                              )
                            })
                      }
                       <TouchableOpacity style={[styles.badge, {backgroundColor: (serie &&(serie.find(el => el.id === -1))) ? color.pink : color.lightPurple}]}
                          onPress={() => {
                            setSerie([{name: 'Autre', id: -1}]);

                          }} key={-1}>
                          <Text style={styles.smTxt}>Autre</Text>
                        </TouchableOpacity>
                      </View>
                      {
                          serie && serie.id == -1 && <>
                              <Text style={basic.label}>Autre serie<Text style={basic.mandatory}>*</Text></Text>
                              <TextInput
                                  style={basic.input}
                                  autoCapitalize={'none'}
                                  onChangeText={setOther}
                                  value={other}
                                  placeholder='Exemple: Collaboration avec un animé'
                              />
                          </>
                      }
                      <Text style={basic.label}>Nom du popmart<Text style={basic.mandatory}>*</Text></Text>
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
                        checked == 'looking' &&
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
                          style={((!serie && !other) || !name || (serie.id == -1 && !other)) ? basic.btnDisable : basic.btn}
                          disabled={(!serie && !other) || !name || (serie.id == -1 && !other)}
                          onPress={() => {
                            setLoading(true);
                            let data = new FormData();
                            if (img1)
                            data.append('files.image', {
                                name: 'popImg',
                                uri: img1.uri,
                                type: 'images/jpeg'
                              });
                            data.append('data', JSON.stringify({
                              name,
                              note,
                              series: serie,
                              other: serie.id == -1 ? true : false,
                              priority: prio,
                              state: checked,
                              user: user.user.id
                            }))

                            createPop(data).unwrap().then((res) => {
                                setLoading(false);
                                Alert.alert('Action réussi', 'Le pop mart a bien été modifié', [
                                  {text: 'OK'},
                                ]);
                            }).catch((err) => {
                              setLoading(false);
                            })
                            cleanVariables();
                          }}>
                          <Text style={basic.btnTxt}>{"Ajouter"}</Text>
                      </TouchableOpacity>
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
