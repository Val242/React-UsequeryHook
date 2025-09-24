import useTodo from "./Hooks/useTodos";

function TodoList() {
  const { data: todos, isLoading, isError } = useTodo();

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Error fetching todos</p>;

  return (
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

  );
}

export default TodoList;
