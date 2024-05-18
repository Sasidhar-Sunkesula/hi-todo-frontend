/* eslint-disable @typescript-eslint/no-explicit-any */
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((store: any) => store.user.user);
  
  return (
    <div className="w-full min-h-screen bg-red-50 font-semibold p-10">
      <h1 className="text-3xl text-center">
        Hi, 
        {user ? (
          <span className="text-blue-600"> {user.data.username}</span>
        ) : (
          <span className="text-red-600">Darling</span>
        )}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-content-between place-items-center mt-10 w-full">
        <div className="w-full">
          <TodoForm />
        </div>
        <div className="p-3 w-full bg-gray-300">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Home;
