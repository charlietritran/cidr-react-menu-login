import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { Provider } from "react-redux";
//import store from './redux/store';
import store from "./store";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { fetchCidrData } from "./redux/reducers/appSlice";

store.dispatch(fetchCidrData);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
