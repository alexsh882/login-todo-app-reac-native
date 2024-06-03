import { ThemedView } from "@/components/ThemedView";
import { Todo } from "@/types/todo.type";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Checkbox, HelperText, TextInput } from "react-native-paper";

export default function CreateTodo() {
  const defaultValues = {
    title: "",
    description: "",
    status: "pending",
    author: "",
    createdAt: new Date(),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>({
    defaultValues,
  });

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = (data: Todo) => {
    console.log(data);
    router.navigate("list-todo");
  };

  return (
    <ThemedView
      style={{
        width: "100%",
        padding: 16,
        gap: 16,
      }}
    >
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
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>Add Todo</Button>
    </ThemedView>
  );
}
