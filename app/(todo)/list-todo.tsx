import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";

import { TodoServices } from "@/services/todo.services";

import { Todo } from "@/types/todo.type";
import { Button, IconButton, List, Text } from "react-native-paper";
import { Stack } from "expo-router";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = TodoServices.getTodos();

      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const icons = {
    finished: "check",
    pending: "close",
    standBy: "pause",
    started: "play",
  };

  const getDateToString = (date: Date) => {
    const dates = date.toLocaleDateString("es-AR", {
      timeZone: "UTC",
    });

    return dates;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => router.navigate("create-todo")}
            />
          ),
        }}
      />
      {todos && (
        <FlatList
          style={{ width: "100%" }}
          data={todos}
          renderItem={({ item }) => (
            <List.Accordion
              style={{ width: "100%" }}
              title={item.title}
              description={item.author}
              descriptionStyle={styles.description}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={icons[item.status as keyof typeof icons]}
                />
              )}
            >
              <View style={styles.descriptionContainer}>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemCreatedAt}>
                  Creado el {getDateToString(item.createdAt)}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={()=> router.navigate(`${item.id}/edit`)}>Editar</Button>
                </View>
              </View>
            </List.Accordion>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", padding: 10, gap: 8 },
  descriptionContainer: {
    padding: 10,
    width: "100%",
    gap: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  description: {
    color: "gray",
    fontSize: 12,
  },
  itemDescription: {
    fontSize: 14,
  },
  itemCreatedAt: {
    fontSize: 12,
    color: "gray",
  },
});
