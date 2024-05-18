import React, { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../utils/authSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((store: any) => store.user.user);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const response = await fetch("https://hi-todo-backend.onrender.com/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName, username }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(login(data));
      navigate("/");
    }
    if (!response.ok) {
      setError(data.error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div className="h-screen-minus-header flex items-center justify-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create your account to get started.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="first-name">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2"
                id="first-name"
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="last-name">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-2"
                id="last-name"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2"
              id="username"
              placeholder="johndoe"
              // required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2"
              id="email"
              placeholder="john@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2"
              id="password"
              required
              type="password"
            />
            <p className="text-sm">
              Password should have min length of 8, 1 uppercase letter, 1
              lowercase letter, 1 number, 1 symbol
            </p>
          </div>
          <button className="w-full p-4 bg-slate-400" type="submit">
            Sign Up
          </button>
        </form>
        <div className="bg-red-400 text-black">{error}</div>
      </div>
    </div>
  );
};
export default Signup;
