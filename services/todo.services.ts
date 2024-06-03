import { Todo } from "@/types/todo.type";
import todos from "../assets/data/todos.json";

export const TodoServices = {
  getTodos: (): Todo[] => {
    const newTodos = todos.map((todo) => {
      return { ...todo, createdAt: new Date(todo.createdAt) };
    });

    return newTodos;
  },

  getTodo: (id: number): Todo | undefined => {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) return undefined;

    return { ...todo, createdAt: new Date(todo.createdAt) };
  },
};
