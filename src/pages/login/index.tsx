import * as React from "react";
import LoginUI from "./loginUI";
import "./loginUI.less";
import { registerSaga } from "store/index";
import { loginSagas } from "./model";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Form } from "antd";
import { sessionStorageUtils } from 'utils'
import { REFERENCE } from 'store/actionTypes';
//注册saga
registerSaga(loginSagas);

export interface LoginProps {
  [name: string]: any;
}

export interface LoginState {
  [name: string]: any;
}

const mapStateToProps = (state: any) => {
  return { loginData: state.loginReducer };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    promiseLogin: data => {
      dispatch({ type: "fetchLogin", data });
    },
    referenceData: data => {
      dispatch({ type: REFERENCE, payload: data })
    }
  };
};
@(connect(mapStateToProps, mapDispatchToProps) as any)
@(Form.create() as any)
class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {};
  }
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.loginData.isLogin) {
  //     console.log('nextProps: ', nextProps);
  //     this.props.history.push("/dashboard");
  //   }
  //   return true
  // }
  componentDidMount() {
    // const referenceData = sessionStorageUtils.getItem('state');
    // console.log('referenceData: ', referenceData);
    // if (referenceData) {
    //   this.props.referenceData(referenceData)
    // }
    if (this.props.loginData.isLogin) {
      this.props.history.push("/dashboard");
    }
  }
  // componentDidUpdate(prevProps){
  //   if (this.props.loginData.isLogin && !prevProps.loginData.isLogin) {
  //     this.props.history.push("/dashboard");
  //   }
  // }
  render() {
    const { promiseLogin, form } = this.props;
    return (
      <React.Fragment>
        <LoginUI promiseLogin={promiseLogin} form={form} />
      </React.Fragment>
    );
  }
}

export default Login;
