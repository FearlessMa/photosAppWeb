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
  exact?: boolean;
  path: string;
  component: React.ComponentClass | any;
}

const routerMap: IRouter[] = [
  {
    exact: true,
    path: "/",
    component: Login
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "*",
    component: Page404
  }
];

export const RouteComponent = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path={'/'} component={Home} />
          <Route path={'/page'} component={Page} />
          <Route path={'*'} component={Page404} /> */}
        {routerMap.map((item: IRouter, i: number) => {
          return <Route {...item} key={i} />;
        })}
      </Switch>
    </Router>
  );
};
