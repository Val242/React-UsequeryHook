import React, { useState } from "react";
import { useTodos } from "./Hooks/useTodos";
import { useTodosMutation } from "./Hooks/useTodoMutation";
import type { Todo } from "./Hooks/useTodos";

function TodoList() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } = useTodos({ limit: 5 });
  const { mutate, isPending: isAdding } = useTodosMutation();//The mutation is currently running

  // Track which page is currently displayed
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pages = data?.pages || [];
  const currentTodos = (pages[currentPageIndex] as Todo[]) || [];

  const goNext = async () => {
    if (currentPageIndex + 1 < pages.length) {
      setCurrentPageIndex((prev) => prev + 1);
    } else if (hasNextPage) {
      await fetchNextPage();
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return;
    mutate(
      { title: newTodoTitle, completed: false, userId: 1 }, // matches your `NewTodo` type
      {
        onSuccess: () => {
          setNewTodoTitle("");
          console.log("Success")
        },
         onSettled: () => {//runs after onSucceed.
          setNewTodoTitle("");
          console.log("Success1")
        },
      },
      
    );
  };

  return (
    <div className="mt-6">
      {/* Add new todo form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Enter new todo"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleAddTodo}
          disabled={isAdding || !newTodoTitle.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add Todo"}
        </button>
      </div>

      {/* Todo list */}
      <ul className="space-y-3">
        {currentTodos.map((todo) => (
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

      {/* Pagination controls */}
      <div className="mt-4 flex items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={goPrev}
          disabled={currentPageIndex === 0}
        >
          Previous
        </button>

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={goNext}
          disabled={isFetching || (!hasNextPage && currentPageIndex + 1 >= pages.length)}
        >
          Next
        </button>

        {isFetching && <span className="ml-2 text-gray-500">Fetching...</span>}
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Page {currentPageIndex + 1} of {pages.length}
        {hasNextPage ? "+" : ""}
      </p>
    </div>
  );
}

export default TodoList;
