import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todoSlice from "./todoSlice";

const dataStore = configureStore({
  reducer: {
    user: authSlice,
    todo: todoSlice,
  },
});
// export type RootState = ReturnType<typeof dataStore.getState>;

export default dataStore;
