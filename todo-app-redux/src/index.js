import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import { authInfoSuccess } from "./ducks/auth.duck";
import firebase from "./firebase-config";
import "./index.css";
import routeConfiguration from "./routeConfiguration";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";

const store = configureStore({}, firebase); //passing empty object
/* structure of div */ /* firebase sys to render */
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch(authInfoSuccess(user)); /* starting state of the app */
  ReactDOM.render(
    //wrappping main app in provide
    <React.StrictMode>
      <Provider store={store}>
        {/* //passing store */}
        <BrowserRouter>
          <Routes routes={routeConfiguration()} /> {/* routes for all apps */}{" "}
          {/* seperate routes */}
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

serviceWorker.unregister();
