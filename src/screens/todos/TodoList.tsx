import { View, Text, Alert, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Todo } from "../../utils/types";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { Button, CheckBox, Input, Layout } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CreateTodo from "./CreateTodo";

const TodoList = () => {
  const navigation: any = useNavigation();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Todo[]>([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredTodos);
  };

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
    const toggleDone = () => {
      updateDoc(ref, { done: !item.done });
    };

    const handleDelete = () => {
      Alert.alert("", "Silmek istediğinize emin misiniz?", [
        { text: "Cancel", style: "cancel" },
        { text: "SİL", onPress: () => deleteDoc(ref) },
      ]);
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
          <Text>{item?.desc}</Text>
        </View>
        <Button
          style={styles.deleteButton}
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
        <Input
          placeholder="Search"
          size="large"
          style={styles.searchInput}
          accessoryRight={() => (
            <Icon
              name={searchResults.length > 0 ? "window-close" : "magnify"}
              size={24}
              color="gray"
              onPress={() => (setSearchResults([]), setSearchQuery(""))}
            />
          )}
          onChangeText={handleSearch}
          value={searchQuery}
        />

        <FlatList
          data={searchResults.length > 0 ? searchResults : todos}
          renderItem={renderTodoItem}
        />
      </View>
    </>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 1,
    backgroundColor: "white",
  },
  searchInput: {
    borderWidth: 0.5,
    marginVertical: 15,
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
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d1d1d1",
    backgroundColor: "white",
  },
  deleteButton: {
    flex: 0.1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
