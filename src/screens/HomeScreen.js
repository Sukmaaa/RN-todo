import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Container from "../components/Container";
import { API } from "../services/API";
import { ListItem, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  //handle State
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get all data todos
  const getTodos = async () => {
    try {
      setIsLoading(true);
      const result = await API.get("/todos");

      setTodos(result.data.data);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //handle update todo
  const handleUpdate = async (todo) => {
    try {
      const { id, status } = todo;

      const data = {
        status: status === "isDone" ? "notDone" : "isDone",
      };
      const result = await API.patch(`/todo/${id}`, data);

      setTodos(result.data.data.dataTodos);
    } catch (error) {
      console.log(error);
    }
  };

  //handle delete todos
  const handleDelete = async (todo) => {
    try {
      const { id } = todo;

      const result = await API.delete(`/todo/${id}`);

      setTodos(result.data.data.dataTodos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //For Refress page at add todos
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTodos();
    });

    return unsubscribe;
  }, [navigation]);

  //Render all data todos
  const _renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        handleUpdate(item);
      }}
      bottomDivider
    >
      {item.status === "isDone" ? (
        <>
          <Text style={styles.checkmark}>
            <Ionicons name="checkmark-outline" size={30} />
          </Text>
          <Text
            style={styles.isDone}
          >
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleDelete(item);
            }}
          >
            <Ionicons name="close-outline" size={24} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={styles.notDone}
          >
            {item.title}
          </Text>
        </>
      )}
    </ListItem>
  );

  return (
    <Container>
      <View style={styles.content}>
        <FlatList
          data={todos}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          onRefresh={getTodos}
        />

        <TouchableOpacity
          style={styles.plusButton}
          activeOpacity={0.5}
          refreshing={isLoading}
          onPress={() => {
            navigation.navigate("Add Todo");
          }}
        >
          <Ionicons name="add-circle" color="#0080FF" size={80} />
        </TouchableOpacity>
      </View>
    </Container>
  )
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
  },
  fieldTodo: {
    width: "100%",
    height: 50,
    borderColor: "#0080FF",
    color: "grey",
    borderWidth: 4,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  isDone: {
    textDecorationLine: "line-through",
    fontSize: 18,
    fontWeight: "bold",
    color: "#bdbdbd",
    width: "80%",
  },
  notDone: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    width: "90%",
  },
  plusButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  checkmark: {
    color: "#3399FF",
    marginRight: 10,
  },
  plusText: {
    fontSize: 30,
    width: 70,
    height: 70,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ scale: 2 }],
  },
});

export default HomeScreen;
