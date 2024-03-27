import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Linking,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { images } from "../constant/images";
import Modal from 'react-native-modal';
import { API_URL, stateSentence } from "../constant/back";
import { basic } from "../constant/basic";
import DialogInput from "react-native-dialog-input";
import { useCreateReportMutation } from "../services/auth";
export const PopDetail = ({ pop, navigation, modalDetail, setModalDetail, showBtn, userId }) => {
  const [signal, setSignal] = useState(false);
  const [createReport] = useCreateReportMutation();

  function closeModal() {
    setModalDetail(false);
  }

  return (
    <Modal
      style={styles.modal}
      position={"bottom"}
      isVisible={modalDetail}
      coverScreen={true}
    >
      {
        <ScrollView style={styles.modalScroll}>
          <Image
            style={styles.modalPic}
            source={
              pop?.attributes?.image && pop?.attributes?.image.data.length > 0
                ? { uri: API_URL + pop?.attributes.image.data[0].attributes.url }
                : images.noimg
            }
            resizeMode="cover"
          />
          <Text style={styles.title}>
            {(pop?.attributes?.series?.length > 1 ? 'Multiple' : pop?.attributes?.series[0].name) + " - " + pop?.attributes?.name}
          </Text>
          <Text style={styles.content}>
            {"Note du pop: " +
              (pop?.attributes.note ? pop?.attributes.note : "Pas de note")}
          </Text>
          <Text style={styles.content}>
            {stateSentence(pop?.attributes?.state)}
          </Text>
          <Text style={styles.content}>
            {"Date d'ajout: " +
              new Date(pop?.attributes?.createdAt).toLocaleDateString()}
          </Text>
          {
                pop?.attributes?.series?.length > 1 &&
                <Text style={styles.content}>{"Liste des sérites: "}
                {
                  pop?.attributes?.series?.map((item, id) => {
                    return(
                      item.name + (id === pop?.attributes.series.length - 1 ? '' : ', ')
                    )
                  })

                }
                </Text>
              }
          <View style={basic.break} />
          {showBtn && (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "whatsapp://send?text=" +
                      "Bonjour j'ai vu que tu as " +
                      (pop?.attributes?.series?.length > 1 ? 'Multiple' : pop.attributes.series[0].name) +
                      " - " +
                      pop?.attributes?.name +
                      " je suis interessé" +
                      "&phone=+33768628787"
                  );
                }}
              >
                <Image
                  style={styles.whatsapp}
                  source={images.whatsapp}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  modalRef.current.close();
                  navigation.navigate("Chatting", {
                    pop: pop,
                    popId: pop.id,
                    ownerId: pop?.attributes?.user.data.id,
                    userId: userId,
                    image: pop?.attributes?.image,
                    username: pop?.attributes?.user.data.attributes.username,
                    home: true,
                  });
                }}
              >
                <Image
                  style={styles.whatsapp}
                  source={images.chat}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  modalRef.current.close();
                  navigation.navigate("UserProfile", {
                    userId: pop.attributes.user.data.id,
                    username: pop.attributes.user.data.attributes.username,
                  });
                }}
              >
                <Image
                  style={styles.whatsapp}
                  source={images.profile}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          )}
          {showBtn && (
            <>
              <Text style={styles.sub}>
                Contactez par whatsapp ou via amapop.
              </Text>
              <Text style={styles.sub}>
                Voir son profil pour voir ceux qu'il recherche
              </Text>
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              setSignal(true);
            }}
            style={styles.report}
          >
            <Image
              style={styles.reportImg}
              source={images.caution}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <DialogInput
            isDialogVisible={signal}
            title={"Raison de signalement"}
            hintInput={"Votre message ici"}
            submitText={"Signaler"}
            submitInput={(inputText) => {
              if (inputText)
                createReport({
                  data: {
                    reason: inputText,
                    pop: pop.id,
                    user: pop.attributes.user.data.id,
                  },
                })
                  .unwrap()
                  .then((res) => {
                    setSignal(false);
                    Alert.alert("Bien reçu", "Merci de votre signalement.", [
                      { text: "OK" },
                    ]);
                  })
                  .catch((err) => {
                    Alert.alert(
                      "Erreur de serveur",
                      "Veuillez réessayer ultérieurement",
                      [{ text: "OK" }]
                    );
                  });
            }}
            closeDialog={() => {
              setSignal(false);
            }}
          ></DialogInput>
          <TouchableOpacity onPress={closeModal} style={styles.closeBox}>
            <Image style={styles.close} source={images.close} resizeMode="cover" />
          </TouchableOpacity>
          <View style={basic.break} />
          <View style={basic.break} />
        </ScrollView>
        }
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 80,
    borderRadius: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    fontSize: 22,
    fontFamily: "rbt-Regular",
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  modalPic: {
    height: 600, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "rbt-Bold",
    color: "black",
    padding: 20,
  },
  whatsapp: {
    height: 40,
    width: 40,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 15,
    marginBottom: 20,
  },
  sub: {
    fontFamily: "Helvetica",
    marginLeft: 20,
    fontWeight: "200",
  },
  report: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  reportImg: {
    width: 40,
    height: 40,
  },
  box: {
    position: "relative",
  },
  modalScroll: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  closeBox: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    width: 30,
    height: 30,
  }
});
