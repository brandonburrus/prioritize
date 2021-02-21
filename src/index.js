import React from "react";
import App from "./AppRoot";
import reduxStore from "./redux/store";
import { Provider } from "react-redux";
import { render } from "react-dom";

render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById("app")
);
