import React, { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../utils/authSlice";
import { todoList } from "../utils/todoSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((store: any) => store.user.user);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    const userResponse = await fetch("https://hi-todo-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const userData = await userResponse.json();
    const todoResponse = await fetch("https://hi-todo-backend.onrender.com/api/getAllTodos", {
      credentials: "include",
    });
    if (!todoResponse.ok) {
      return;
    }
    const todoData = await todoResponse.json();
    if (userResponse.ok && todoResponse.ok) {
      dispatch(login(userData));
      dispatch(todoList(todoData.todos));
      navigate("/");
    }
    if (!userData.ok || !todoData.ok) {
      setError(userData.error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div className="h-screen-minus-header w-full mx-auto flex items-center justify-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-gray-300 w-96 p-4 flex gap-2 flex-col"
      >
        <h1 className="text-center">Login</h1>
        <div className="p-2">
          <label className="text-center ">Username</label>
          <input
            type="text"
            className="w-1/2 p-2 mx-auto"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="p-2 flex flex-col">
          <div>
            <label className="text-center">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-1/2 p-2 mx-auto"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              id="check"
              type="checkbox"
            ></input>
            <label htmlFor="check">show password</label>
          </div>
        </div>
        <button className="border p-4 bg-red-300">Submit</button>
        <div className="bg-red-400 text-black">{error}</div>
      </form>
    </div>
  );
};
export default Login;