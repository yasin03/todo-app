import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate, formatTime } from "../../utils/utils";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";
import { Todo } from "../../utils/types";

const CreateTodo = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [date, setDate] = useState(formatDate(dateTime));
  const [time, setTime] = useState(formatTime(dateTime));
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    setDate(formatDate(dateTime));
    setTime(formatTime(dateTime));
  }, [dateTime]);

  const handleCreate = () => {
    let data = {
      title: title,
      desc: desc,
      dateTime: dateTime,
      done: false,
    };
    const doc = addDoc(collection(FIREBASE_DB, "todos"), data);
    console.log("data--" + JSON.stringify(data));

    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setVisible(true)}
      >
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
          animationType="slide"
          style={styles.modal}
        >
          <Card disabled={true} style={styles.modalCard}>
            <Layout
              style={{
                flexDirection: "column",
                gap: 15,
              }}
            >
              <Text>Yapılacak Ekle</Text>
              <Input placeholder="Başlık" onChangeText={setTitle} />
              <Input
                placeholder="Açıklama"
                onChangeText={setDesc}
                multiline={true}
              />
              {/* <Datepicker
                date={date}
                onSelect={(date) => {
                  setOpenDate(false);
                  setDate(date);
                }}
                accessoryLeft={() => <Icon name="calendar" size={20} />}
              /> */}

              <Button
                onPress={() => setOpenTime(true)}
                style={styles.timeButton}
                status="basic"
                accessoryLeft={() => <Icon name="clock-outline" size={20} />}
              >
                {date + " - " + time}
              </Button>
              <DateTimePickerModal
                isVisible={openTime}
                mode="datetime"
                locale="TR"
                onConfirm={(time: any) => (
                  setDateTime(time), setOpenTime(false)
                )}
                onCancel={() => setOpenTime(false)}
              />
              <Button onPress={handleCreate} status="info">
                EKLE
              </Button>
            </Layout>
          </Card>
        </Modal>
      </View>
    </>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 100,
    cursor: "pointer",
    backgroundColor: "#ef4444",
  },

  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-start",
  },
  modalContainer: {},
  modal: {
    width: "80%",
  },
  modalCard: {
    borderRadius: 10,
  },
  timeButton: {
    display: "flex",
    justifyContent: "space-between",
    color: "red",
  },
});
