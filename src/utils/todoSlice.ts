import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  list: object[];
}

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
  } as TodoState,
  reducers: {
    todoList: (state, action) => {
      state.list = action.payload;
    },
    addTodo: (state, action: PayloadAction<object>) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.list.splice(action.payload, 1);
    },
  },
});
export const { todoList, addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
