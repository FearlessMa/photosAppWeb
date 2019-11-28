import * as React from "react";
import AppLayout from "./components/layout";
import { RouteComponent } from "./router";
export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RouteComponent></RouteComponent>
      </React.Fragment>
    );
  }
}
