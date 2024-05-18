/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { removeTodo } from "../utils/todoSlice";
import { useSelector } from "react-redux";

interface Todo {
  description: string;
  done: boolean;
  title: string;
  id: number;
}

interface TodoCardProps {
  todo: Todo;
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const list = useSelector((store: any) => store.todo.list);
  const dispatch = useDispatch();
  const { description, done, title, id } = todo;
  const indexFromStore = list.findIndex((item: Todo)=> item.id=== id)
  const deleteTodo = async () => {
    const response = await fetch(`https://hi-todo-backend.onrender.com/api/deleteTodo/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    if (!response.ok) {
      return;
    }
    dispatch(removeTodo(indexFromStore));
  };
  return (
    <div className="w-full flex  justify-between px-8 bg-white my-4 text-black">
      <h2>Title: {title} </h2>
      <p>Description: {description}</p>
      <p>Done: {`${done}`}</p>
      <button onClick={() => deleteTodo()}>🗑️</button>
    </div>
  );
};

export default TodoCard;
