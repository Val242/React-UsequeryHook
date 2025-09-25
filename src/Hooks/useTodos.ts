import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
// ✅ Define the interface for todos
interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}



const useTodo = (userId:number) => {
  // Fetch function for React Query
const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos',
{
  params:{
    userId
  }
}
  );
  return res.data;
};
return useQuery<Todo[],Error>({
    queryKey: ['users',userId,'todos'],
    queryFn: fetchTodos,

})

}
export default useTodo 
