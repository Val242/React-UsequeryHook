import { useState } from "react";
import useTodo from "./Hooks/useTodos";

function TodoList() {
  // Track the selected user (default = user 1)
  const [userId, setUserId] = useState<number>(1);

  const { data: todos, isLoading, isError } = useTodo(userId);

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Error fetching todos</p>;

  return (
    <div className="mt-6">
      {/* Select dropdown */}
      <div className="mb-4">
        <label htmlFor="user-select" className="mr-2 font-medium text-gray-700">
          Select User:
        </label>
        <select
          id="user-select"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      </div>

      {/* Todos list */}
      <ul className="space-y-3 mt-4">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="w-5 h-5 text-green-500 accent-green-500 cursor-pointer"
              />
              <span
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                todo.completed
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
