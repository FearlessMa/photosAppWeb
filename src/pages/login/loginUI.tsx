import * as React from "react";
import { Component } from "react";
import { Row, Col, Form, Button, Input, Icon } from "antd";
import { FormProps } from "antd/lib/form";
import { api, fetchData } from "src/server";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FETCH_LOGIN } from "src/store/actionTypes";

const FormItem = Form.Item;
export interface LoginUIProps {
  [name: string]: any;
}

export interface LoginUIState {
  [name: string]: any;
}

const loginConfig = [
  {
    name: "userName",
    rules: [],
    icon: "user",
    defaultValue: "admin",
    type: "text"
  },
  {
    name: "password",
    rules: [],
    icon: "lock",
    defaultValue: "123456",
    type: "password"
  }
];

const mapStateToProps = (state: any) => {
  console.log("state: ", state);
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    promiseLogin: () => {
      dispatch({ type: 'fetchLogin' });
      // console.log('FETCH_LOGIN: ', FETCH_LOGIN);
    }
  };
};
@(connect(mapStateToProps, mapDispatchToProps) as any)
@(Form.create() as any)
export default class LoginUI extends React.Component<
  LoginUIProps,
  LoginUIState
> {
  constructor(props: LoginUIProps) {
    super(props);
    this.state = {};
  }

  submit = () => {
    this.props.form.validateFields((err: string, values: object) => {
      if (!err) {
        console.log("props", this.props);
        console.log("values: ", values);
        this.props.promiseLogin();
        // this.props.toLogin(values);
        // fetchData("login", values, "post").then((res: any) => {
        //   console.log("res: ", res);
        // });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="login-pages">
          <div className="login-form-box">
            <Form>
              {loginConfig.map((item, index) => {
                return (
                  <FormItem key={item.name + index}>
                    {getFieldDecorator(item.name, {
                      rules: item.rules,
                      initialValue: item.defaultValue
                    })(
                      <Input
                        prefix={
                          <Icon
                            type={item.icon}
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type={item.type}
                      />
                    )}
                  </FormItem>
                );
              })}
              <FormItem>
                <Button
                  type="primary"
                  onClick={this.submit}
                  style={{ width: "100%" }}
                >
                  submit
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// export default Form.create()(LoginUI);
