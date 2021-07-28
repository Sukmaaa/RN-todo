import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Container from "../components/Container";
import { API } from "../services/API";
import { Button } from "react-native";

const AddTodoScreen = ({ navigation }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = async () => {
    try {
      const data = {
        title: newTodo,
        status: "uncompleted",
      };
      const result = await API.post("todo", data);
      setNewTodo("");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    <Container>
      <View style={styles.content}>
        <Text style={styles.title}>Fill with your activities</Text>
        <Separator />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.todoInput}
            maxLength={34}
            placeholder="What do you think?"
            value={newTodo}
            onChangeText={(val) => {
              setNewTodo(val);
            }}
          />
        </View>

        <TouchableOpacity >
          <Button
            onPress={handleAdd}
            title="Add todo"
            style={styles.addButton}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoInput: {
    borderWidth: 2,
    borderColor: "#0080FF",
    height: 50,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    width: "100%",
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default AddTodoScreen;
