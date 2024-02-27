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
import { useGetSeriesQuery, useUpdatePopMutation, useRemovePopMutation } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from "../constant/back";

const qs = require("qs")
Icon.loadFont();

const Edit = ({navigation, route}) => {
  const [loading,setLoading] = useState(false);
  const [name, setName] = useState(route?.params?.pop.attributes.name);
  const [note, setNote] = useState(route?.params?.pop.attributes.note);
  const [other, setOther] = useState('');
  const [serie, setSerie] = useState('');
  const [checked, setChecked] = useState(route?.params?.pop.attributes.state);
  const [prio, setPrio] = useState(route?.params?.pop.attributes.priority);
  const [img1, setImg1] = useState(null);
  const [updatePop] = useUpdatePopMutation();
  const [removePop] = useRemovePopMutation();
  const height = useHeaderHeight();
  const user = useAuth();
  const {data: fetchedSeries, error: errorSeries, isLoading: loadingSeries, isFetching: fetchingSeries} = useGetSeriesQuery(qs.stringify({
    sort: ['name']
  }, {encodeValuesOnly: true}), {refetchOnMountOrArgChange: true, refetchOnFocus: true});

  const cleanVariables = () => {
    setImg1(null);
    setSerie(null);
    setName('');
    setNote('');
    setOther('');
  }

  return (
    <SafeAreaView style={styles.container}>
        <Load loading={loading} />
        <View style={basic.containerBg} />
        <View style={basic.containerBgBotWhite} />
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backUp}
              onPress={() => {
                cleanVariables();
                navigation.goBack();
              }}>
              <Icon name={'arrow-left'} size={20} color={'white'} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>{'Modifier votre popmart'}</Text>
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
                            }
                          }}>
                            {
                                route?.params?.pop?.attributes?.image?.data?.length > 0 ?
                                <Image style={styles.addPic} source={{uri: API_URL + route.params.pop.attributes.image.data[0].attributes.url}} resizeMode="cover" /> :
                              (img1 ? <Image style={styles.addPic} source={{uri: img1.uri}} resizeMode="cover" />
                              : <IconAnt name={'plus'} size={30} color={'white'} style={styles.icon} />)
                            }
                          </TouchableOpacity>
                      </View>
                      <Text style={basic.label}>Série<Text style={basic.mandatory}>*</Text></Text>
                      <View style={styles.btnRow}>
                      {
                          fetchedSeries?.data?.map((item, id) => {
                            if (route?.params?.pop.attributes.serie == item.attributes.name && !serie) {
                                setSerie(item);
                            }
                            if (id == (fetchedSeries.data.length -1) && !serie) {
                                setSerie({id: -1, name: 'Autre'})
                                setOther(route?.params?.pop.attributes.serie);
                            }
                              return (
                                <TouchableOpacity style={[styles.badge, {backgroundColor: (serie && item.id == serie.id) ? color.pink : color.lightPurple}]}
                                  onPress={() => {
                                    setSerie(item)
                                  }} key={id}>
                                  <Text style={styles.smTxt}>{item.attributes.name}</Text>
                                </TouchableOpacity>
                              )
                            })
                      }
                       <TouchableOpacity style={[styles.badge, {backgroundColor: (serie && serie.id == -1) ? color.pink : color.lightPurple}]}
                          onPress={() => {
                            setSerie({name: 'Autre', id: -1});

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
                          style={(!serie || !name || (serie.id == -1 && !other)) ? basic.btnDisable : basic.btn}
                          disabled={!serie || !name || (serie.id == -1 && !other)}
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
                              serie: serie.id == -1 ? other : serie.name,
                              other: serie.id == -1 ? true : false,
                              priority: prio,
                              state: checked,
                              user: user.user.id
                            }))

                            updatePop({data: data, id: route?.params?.pop.id}).unwrap().then((res) => {
                                setLoading(false);
                                Alert.alert('Action réussi', 'Vos modifications ont bien été prise en compte.', [
                                  {text: 'OK'},
                                ]);
                              }).catch((err) => {
                                setLoading(false);
                                Alert.alert('Erreur', 'Erreur de serveur, veuillez réessayer ultérieurement.', [
                                  {text: 'OK'},
                                ]);
                              })
                            cleanVariables();
                          }}>
                          <Text style={basic.btnTxt}>Modifier</Text>
                      </TouchableOpacity>
                        <TouchableOpacity
                            style={basic.btn}
                            onPress={() => {
                                Alert.alert('Supression de popmart', 'Êtes vous sûre de vouloir supprimer ce popmart ?', [
                                    {
                                        text: 'Annuler',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Oui',
                                        onPress: () => {
                                            setLoading(true);
                                            removePop({id: route?.params?.pop.id}).unwrap().then((res) => {
                                                setLoading(false);
                                                cleanVariables();
                                                Alert.alert('Action réussi', 'Votre popmart a bien été supprimé', [
                                                {
                                                    text: 'Ok',
                                                    onPress: () => {
                                                        cleanVariables();
                                                        navigation.goBack();   
                                                    },
                                                }
                                                ]);
                                             }).catch((err) => {
                                                setLoading(false);
                                                Alert.alert('Erreur', 'Erreur de serveur, veuillez réessayer ultérieurement.', [
                                                  {text: 'OK'},
                                                ]);
                                              })
                                        },
                                    },
                                      
                                  ]);
                            }}>
                            <Text style={basic.btnTxt}>Supprimer</Text>
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
    opacity: 1
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

export default Edit;
