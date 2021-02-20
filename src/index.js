import { createElement } from "react";
import { render } from "react-dom";
import App from "./AppRoot";

render(createElement(App), document.getElementById("app"));
