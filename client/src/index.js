import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import "nprogress/nprogress.css";
import { MyProvider } from "./context/DataQuesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <MyProvider>
        <RouterProvider router={router}></RouterProvider>
      </MyProvider>

      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);

reportWebVitals();
