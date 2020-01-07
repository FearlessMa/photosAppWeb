import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./app";
import store from "./store";
import { Provider } from "react-redux";


const app = (
  <Provider store={store}>
    <App store={store}/>
  </Provider>
);

type element = HTMLDivElement | null;
ReactDom.render(app, document.getElementById("app") as HTMLElement);

// const body = document.querySelector("body");
// if (body) {
//   const div: element = document.createElement("div");
//   div.id = "app";
//   body.appendChild(div);
//   div.style.minHeight = "100vh";
//   ReactDom.render(app, document.getElementById("app") as HTMLElement);
// }
