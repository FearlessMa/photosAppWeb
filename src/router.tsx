import * as React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch} from "react-router-dom";
import AppLayout from "./components/layout";
import Login from "./pages/login";
import { connect } from 'react-redux';
import { fetchData } from 'src/server';
import { USER_INFO } from "store/actionTypes";

const Page404 = () => <div>404</div>;

interface IRouter {
  key?: string | number; //map key
  exact?: boolean; //唯一匹配
  path: string; // path
  component: React.ComponentClass | any;
  // auth?: boolean;
  // authPath?: string;
  requiresAuth?: boolean; //是否需要验证身份
}

const routerMap: IRouter[] = [
  {
    exact: true,
    path: "/login",
    requiresAuth: false,
    component: Login
  },
  {
    // exact: true,
    path: "/",
    requiresAuth: true,
    component: AppLayout
  },
  {
    path: "*",
    requiresAuth: false,
    component: Page404
  }
];
interface IRenderRouters {
  routerMap: IRouter[],
  auth?: boolean;
  authPath?: string;
  extraProps?: any;
  switchProps?: any;
}
const renderRouters = ({ routerMap, auth, authPath = '/login', extraProps = {}, switchProps = {}, ...otherProps }: IRenderRouters) => {
  return (
    <React.Fragment>
      {routerMap ? (
        <Switch {...switchProps}>
          {routerMap.map((route: IRouter, i: number) => {
            return (
              <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                render={(props: any = {}) => {
                  return renderRoute(({ route, auth, authPath, props, extraProps, otherProps }));
                }}
              />
            );
          })}
        </Switch>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.loginReducer ? state.loginReducer.isLogin : false
  }
};
const mapDispatchToProps = dispatch => {
  return { getUserInfo: () => dispatch({ type: 'getUserInfo' }), setUserInfo: (data) => dispatch({ type: USER_INFO, payload: data }) }
}


const RouteComponent = props => {
  console.log('props: ', props);
  return (
    <Router>
      {renderRouters({ routerMap, ...props })}
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteComponent)

const renderRoute = ({ route, auth, authPath, props, extraProps, otherProps }) => {

  // 登录状态下去login 重定向
  if (authPath == route.path) {
    if (auth) {
      return <Redirect to={{ pathname: '/', state: { form: props.location } }} />
    }
    return <route.component
      {...props}
      {...extraProps}
      auth={auth}
      route={route}
    />
  }
  if (auth) {
    return <route.component
      {...props}
      {...extraProps}
      auth={auth}
      route={route}
    />
  } else {
    fetchData.get('getUserInfo').then(res => {
      if (res.code === 200) {
        otherProps.setUserInfo({
          userInfo: res.userInfo,
          isLogin: true
        })
      } else {
        location.hash = "#" + authPath;
      }
    })
  }
  return null;
}