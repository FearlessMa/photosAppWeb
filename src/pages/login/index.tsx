import * as React from "react";
import LoginUI from "./loginUI";
import "./loginUI.less";
export interface LoginProps {
  [name: string]: any;
}

export interface LoginState {
  [name: string]: any;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <LoginUI />
      </React.Fragment>
    );
  }
}

export default Login;