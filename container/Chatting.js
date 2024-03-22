import React, { useState, useEffect, useRef } from "react";
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
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import { images } from "../constant/images";
import { PopDetail } from "../component/PopDetail";
import Icon from "react-native-vector-icons/Ionicons";
import { color } from "../constant/color";
import { basic } from "../constant/basic";
import IconSim from "react-native-vector-icons/SimpleLineIcons";
import { API_URL } from "../constant/back";
import {
  useLazyGetMessagesQuery,
  useGetMessagesQuery,
  useCreateConversationsMutation,
  useCreateMessageMutation,
  useLazyGetConversationsQuery,
} from "../services/auth";
const qs = require("qs");

Icon.loadFont();

const Chatting = ({ navigation, route }) => {
  const [msg, setMsg] = useState("");
  const [convId, setConvId] = useState(route?.params?.convId);
  const [messages, setMessages] = useState([]);
  const [createMsg] = useCreateMessageMutation();
  const [createConv] = useCreateConversationsMutation();
  const [getConvs] = useLazyGetConversationsQuery();
  const [getMsgs] = useLazyGetMessagesQuery();
  const modalRef = useRef(null);

  const {
    data: fetchedMessages,
    fetchingMessages,
    error,
  } = useGetMessagesQuery(
    qs.stringify(
      {
        filters: {
          conversation: {
            id: {
              $eq: convId,
            },
          },
        },
        populate: ["sender", "sender.avatar"],
        sort: ["createdAt:desc"],
      },
      { encodeValuesOnly: false }
    ),
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      skip: convId == undefined,
      pollingInterval: 3000,
    }
  );

  const getMessages = () => {
    getMsgs(
      qs.stringify(
        {
          filters: {
            conversation: {
              id: {
                $eq: convId,
              },
            },
          },
          populate: ["sender", "sender.avatar"],
          sort: ["createdAt:desc"],
        },
        { encodeValuesOnly: false }
      )
    )
      .unwrap()
      .then((res) => {
        if (res.data.length > 0) {
          setMessages(res.data);
        }
      })
      .catch((err) => {
        Alert.alert("Erreur", " Veuillez réessayer ultérieurement", [
          { text: "OK" },
        ]);
      });
  };

  useEffect(() => {
    if (route.params.home) {
      getConvs(
        qs.stringify(
          {
            filters: {
              $and: [
                {
                  pop: {
                    id: {
                      $eq: route.params.popId,
                    },
                  },
                },
                {
                  users: {
                    id: {
                      $in: [route.params.ownerId, route.params.userId],
                    },
                  },
                },
              ],
            },
            populate: ["users", "pop"],
          },
          { encodeValuesOnly: true }
        )
      )
        .unwrap()
        .then((res) => {
          if (res.data.length > 0) {
            setConvId(res.data[0].id);
            // getMessages();
          }
        })
        .catch((err) => {
          Alert.alert("Erreur", " Veuillez réessayer ultérieurement", [
            { text: "OK" },
          ]);
        });
    }
  }, [route]);

  const sendMessage = (convId) => {
    createMsg({
      data: { msg: msg, sender: route.params.userId, conversation: convId },
    })
      .unwrap()
      .then((res) => {
        setMsg("");
        getMessages();
      })
      .catch((err) => {
        Alert.alert("Erreur de serveur", "Veuillez renvoyer ultérieurement", [
          { text: "OK" },
        ]);
      });
  };

  const checkConv = () => {
    //IF conv EXIST
    if (convId) {
      //CREATE MESSAGE
      sendMessage(convId);
    }
    //ELSE CREATE CONV
    else {
      createConv({
        data: {
          pop: route.params.popId,
          users: [route.params.ownerId, route.params.userId],
        },
      })
        .unwrap()
        .then((res) => {
          //THEN CREATE MEssage
          setConvId(res.data.id);

          sendMessage(res.data.id);
        })
        .catch((err) => {
          Alert.alert(
            "Erreur de serveur",
            "Veuillez réessayer ultérieurement",
            [{ text: "OK" }]
          );
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={color.pink} />
      {/* <Load loading={fetchingConvs} /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        style={styles.containerKey}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={[styles.header, basic.shadow]}>
              <TouchableOpacity
                style={styles.backUp}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconSim
                  name={"arrow-left"}
                  size={20}
                  color={"white"}
                  style={styles.icon}
                />
              </TouchableOpacity>
              {/* <Text style={styles.title}>{route.params.username}</Text> */}
              <View style={styles.popModal} position={"center"}>
                <Image
                  style={styles.popImg}
                  source={
                    route.params?.image.data &&
                    route.params?.image.data.length > 0
                      ? {
                          uri:
                            API_URL + route.params.image.data[0].attributes.url,
                        }
                      : images.noimg
                  }
                  resizeMode="cover"
                />
                <View style={styles.popRightBox}>
                  <Text style={styles.popTitle}>
                    {route.params.pop.attributes.serie +
                      " - " +
                      route.params.pop.attributes.name}
                  </Text>
                  <Text style={styles.popSub}>{route.params.username}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      modalRef.current.open();
                    }}
                    style={styles.btn}
                  >
                    <Text>Détail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

              <FlatList
              data={fetchedMessages?.data}
              style={styles.flatBox}
              renderItem={({ item }) => {
                if (item.attributes.sender.data.id != route.params.userId) {
                  return (
                    <View style={styles.chat}>
                      <View style={styles.msgRow}>
                        <Image
                          style={styles.avatar}
                          source={
                            item.attributes.sender.data.attributes.avatar.data
                              .length > 0
                              ? {
                                  uri:
                                    API_URL +
                                    item.attributes.sender.data.attributes
                                      .avatar.data[0].attributes.url,
                                }
                              : images.noimg
                          }
                          resizeMode="cover"
                        />
                        <View style={styles.msgContact}>
                          <Text style={styles.txt}>{item.attributes.msg}</Text>
                        </View>
                      </View>
                      <Text style={[styles.time, { textAlign: "left" }]}>
                        {new Date(item.attributes.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.chat}>
                      <View
                        style={[styles.msgRow, { justifyContent: "flex-end" }]}
                      >
                        <View style={styles.msg}>
                          <Text style={styles.txt}>{item.attributes.msg}</Text>
                        </View>
                        <Image
                          style={styles.avatar}
                          source={
                            item.attributes.sender.data.attributes.avatar.data
                              .length > 0
                              ? {
                                  uri:
                                    API_URL +
                                    item.attributes.sender.data.attributes
                                      .avatar.data[0].attributes.url,
                                }
                              : images.noimg
                          }
                          resizeMode="cover"
                        />
                      </View>
                      <Text style={styles.time}>
                        {new Date(item.attributes.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  );
                }
              }}
              keyExtractor={(item) => item.id}
              inverted
            />
            <View style={styles.chatBox}>
              <TextInput
                style={styles.input}
                onChangeText={setMsg}
                value={msg}
                multiline={true}
                editable={true}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  checkConv();
                }}
              >
                <Icon name={"send"} size={20} color={color.pink} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <PopDetail
        modalRef={modalRef}
        navigation={navigation}
        pop={route.params.pop}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  containerKey: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: color.lightPink,
  },
  back: {
    width: 30,
    height: 40,
  },
  backUp: {
    justifyContent: "center",
    width: "10%",
  },
  chatBox: {
    width: "80%",
    borderRadius: 40,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingRight: 10,
  },
  icon: {
    padding: 2,
  },
  input: {
    padding: 10,
    flex: 1,
    width: "80%",
    fontFamily: "Helvetica",
    fontSize: 18,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chat: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 5,
    marginBottom: 5,
  },
  flatBox: {
    width: "90%",
    marginTop: 20,
  },
  msgRow: {
    flexDirection: "row",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: color.pink,
    padding: 10,
  },
  title: {
    padding: 10,
    fontFamily: "Helvetica",
    fontSize: 24,
    width: "80%",
    textAlign: "center",
    color: "white",
  },
  txt: {
    color: "white",
    fontSize: 18,
    fontFamily: "Helvetica",
  },
  msgContact: {
    backgroundColor: color.pink,
    padding: 6,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "transparent",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginLeft: 10,
  },
  msg: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Helvetica",
    backgroundColor: color.darkOrange,
    padding: 5,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "transparent",
  },
  empty: {
    width: "10%",
  },
  popModal: {
    flexDirection: "row",
    display: "flex",
    borderRadius: 10,
    height: 80,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  popImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  popTitle: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "white",
  },
  popSub: {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "white",
  },
  popRightBox: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  btn: {
    backgroundColor: color.orange,
    borderRadius: 5,
    padding: 5,
    alignSelf: "flex-start",
  },
  time: {
    textAlign: "right",
    marginTop: 5,
  },
});

export default Chatting;
