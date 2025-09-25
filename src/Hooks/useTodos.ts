import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface UseTodosOptions {
  limit?: number;
}

const limitDefault = 20;

export const useTodos = ({ limit = limitDefault }: UseTodosOptions = {}) => {
  const fetchTodos = async ({ pageParam = 0 }) => {
    const res = await axios.get<Todo[]>(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: { _page: pageParam + 1, _limit: limit },
      }
    );
    return res.data;
  };

  return useInfiniteQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < limit ? undefined : allPages.length,
    staleTime: 1000 * 60, // 1 minute
  });
};
