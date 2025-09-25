import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface NewTodo {
  title: string;
  completed: boolean;
  userId: number;
}

export const useTodosMutation = () => {
  return useMutation({
    mutationFn: (newTodo: NewTodo) =>
      axios.post("https://jsonplaceholder.typicode.com/todos", newTodo),
  });
};
