import React from "react";
import ReactDOM from "react-dom/client";
import { appRouter } from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import dataStore from "./utils/dataStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={dataStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
