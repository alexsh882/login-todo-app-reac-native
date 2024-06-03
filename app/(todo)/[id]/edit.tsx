import { ThemedText } from "@/components/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { TodoServices } from "@/services/todo.services";
import { Todo } from "@/types/todo.type";
import { Controller, useForm } from "react-hook-form";
import { Button, HelperText, TextInput } from "react-native-paper";

export default function Edit() {
  const { id } = useLocalSearchParams();

  const [todo, setTodo] = useState<Todo | undefined>({
    title: "",
    description: "",
    status: "pending",
    author: "",
    createdAt: new Date(),
  });

  const fetchTodo = async (id: number) => {
    const todo = TodoServices.getTodo(id);    
    setTodo(todo);
    reset(todo);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Todo>();

  useEffect(() => {
    if (id) {
      fetchTodo(+id);
    }
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: Todo) => {
    console.log(data);
    router.navigate("list-todo");
  };

  return (
    <View
      style={{
        padding: 10,
        gap: 10,
      }}
    >
      {todo ? (
        <>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Title"
                keyboardType="default"
                autoCapitalize="sentences"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title && (
            <HelperText type="error" visible={hasErrors}>
              {errors.title?.message}
            </HelperText>
          )}
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Description"
                keyboardType="default"
                autoCapitalize="sentences"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && (
            <HelperText type="error" visible={hasErrors}>
              {errors.description?.message}
            </HelperText>
          )}
          <Controller
            name="author"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Author"
                keyboardType="default"
                autoCapitalize="sentences"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.author && (
            <HelperText type="error" visible={hasErrors}>
              {errors.author?.message}
            </HelperText>
          )}
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Save Todo
          </Button>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
