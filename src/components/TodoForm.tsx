import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../utils/todoSlice";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    const response = await fetch("http://localhost:3000/api/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    dispatch(addTodo(data.data));
  };
  return (
    <div className="py-8 mx-auto min-h-96 bg-green-200">
      <h1 className="text-xl text-center">Add a Todo</h1>
      <form className="p-4 w-full my-4" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex gap-3 w-4/5 mx-auto justify-between items-center">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title of the todo"
            className="p-2 w-full"
            type="text"
          ></input>
        </div>
        <div className="flex mt-4 gap-3 w-4/5 mx-auto justify-between items-center">
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description of the todo"
            className="p-2 w-full"
            type="text"
          ></input>
        </div>
        <div className="w-5/12 mx-auto">
          <button className="p-2 mt-8 w-full mx-auto border border-blue-700 bg-blue-300">
            Add the todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
