/* eslint-disable @typescript-eslint/no-explicit-any */
import TodoCard from "./TodoCard";
import { useSelector } from "react-redux";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
}
const TodoList = () => {
  const list = useSelector((store: any) => store.todo.list);
  const user = useSelector((store: any) => store.user.user);

  return (
    <div className="flex flex-col min-h-96 overflow-y-auto items-center">
      <h1 className="text-xl text-center">Todos</h1>
      {!user ? (
        <p className="h-10 text-center m-auto">You need to Login</p>
      ) : list.length === 0 ? (
        <p>Empty</p>
      ) : (
        list.map((todo: Todo) => <TodoCard key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
