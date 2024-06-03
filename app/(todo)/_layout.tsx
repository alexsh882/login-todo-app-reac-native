import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack>
      <Stack.Screen name="list-todo" options={{title:"Todo List"}}  />
      <Stack.Screen name="create-todo" options={{title:"Add Todo"}}  />
    </Stack>
  );
}
