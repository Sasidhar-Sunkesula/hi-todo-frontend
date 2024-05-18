import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import { useDispatch } from "react-redux";
import { login } from "./utils/authSlice";
import { useEffect} from "react";
import { todoList } from "./utils/todoSlice";

function App() {
  const dispatch = useDispatch();
  const getUserDetails = async () => {
    const response = await fetch("https://hi-todo-backend.onrender.com/api/getUserDetails", {
      credentials: "include",
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    dispatch(login(data));
  };
  const fetchTodos = async () => {
    const response = await fetch("https://hi-todo-backend.onrender.com/api/getAllTodos", {
      credentials: "include",
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    dispatch(todoList(data.todos));
  };
  useEffect(() => {
    getUserDetails();
    fetchTodos();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
export default App;
