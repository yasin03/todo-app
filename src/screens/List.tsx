import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import CreateTodo from "./todos/CreateTodo";
import { Button, CheckBox } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import "firebase/firestore";
import { Todo } from "../utils/types";

const List = () => {
  const navigation: any = useNavigation();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [checked, setChecked] = useState(false);

  const loadTodos = () => {
    const todoRef = collection(FIREBASE_DB, "todos");
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) =>
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo)
        );
        setTodos(todos);
      },
    });
    return () => subscriber();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const ref = doc(FIREBASE_DB, `todos/${item.id}`);
    console.log("item", item.dateTime);

    const toggleDone = () => {
      updateDoc(ref, { done: !item.done });
    };

    const handleDelete = () => {
      Alert.alert(
        "",
        "Silmek istediğinize emin misiniz?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "SİL", onPress: () => deleteDoc(ref) },
        ],
        { cancelable: false }
      );
    };

    return (
      <View key={item.id} style={styles.renderContainer}>
        <CheckBox
          style={{ flex: 0.1 }}
          checked={item.done}
          onChange={toggleDone}
        />
        <View style={{ flex: 0.8 }}>
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: item.done ? "line-through" : "none",
            }}
          >
            {item.title}
          </Text>
          <Text>{item?.toString()}</Text>
        </View>
        <Button
          style={{
            flex: 0.1,
          }}
          size="tiny"
          appearance="ghost"
          status="danger"
          accessoryRight={() => (
            <Icon name="delete-outline" size={24} color="gray" />
          )}
          onPress={handleDelete}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.listContainer}>
        <Text>List</Text>
        <FlatList data={todos} renderItem={renderTodoItem} />
      </View>

      <CreateTodo />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  textInput: {
    backgroundColor: "yellow",
    width: "100%",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  renderContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d1d1d1",
  },
});
