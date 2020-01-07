import * as React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import AppLayout from "./components/layout";
import Login from "./pages/login";
import { connect } from 'react-redux';
import { cookiesUtils } from 'utils';
const Home = (): React.ReactElement => (
  <React.Fragment>
    <AppLayout />
  </React.Fragment>
);
const LoginApp = (): React.ReactElement => (
  <React.Fragment>
    <Login />
  </React.Fragment>
);

const Page = () => <div>page</div>;
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
const renderRouters = ({ routerMap, auth, authPath = '/login', extraProps = {}, switchProps = {} }: IRenderRouters) => {
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
                  const sessionId = cookiesUtils.getCookie('sid');
                  if (!route.requiresAuth || sessionId || auth || authPath == route.path) {
                    return <route.component
                      {...props}
                      {...extraProps}
                      auth={auth}
                      route={route}
                    />
                  }
                  return <Redirect to={{ pathname: authPath, state: { form: props.location } }} />
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


const RouteComponent = props => {

  const { auth } = props;
  console.log('auth: ', auth);
  const authPath = '/login';
  return (
    <Router>
      <Switch>
        {renderRouters({ routerMap, auth: props.auth })}
        {/* <Route exact path="/login" component={Login} />
        <Route path="/" render={(props: any) => {

          return auth ? <AppLayout {...props} auth={auth} /> : <Login />
        }}
        /> */}
        {/* <Redirect from={'*'} to={{ pathname: authPath, state: { form: props.location } }} /> */}
        {/* <Route  path="/" component={AppLayout} /> */}
      </Switch>
    </Router>
  );
};

export default connect(mapStateToProps, null)(RouteComponent)

