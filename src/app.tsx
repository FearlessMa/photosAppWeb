import * as React from "react";
import RouteComponent from "./router";


interface Iprops {
  [name: string]: any
}
interface Istate {
  [name: string]: any
}
export default class App extends React.Component<Iprops, Istate>{
  componentDidMount() {
    const { store } = this.props;
    // 刷新页面 存储状态
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('state', JSON.stringify(store.getState()))
    });
  }
  render() {
    return (
      <React.Fragment>
        <RouteComponent {...this.props}></RouteComponent>
      </React.Fragment>
    );
  }
}
