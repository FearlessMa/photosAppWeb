import * as React from 'react';
import { Layout, Row, Button, Icon, Skeleton } from 'antd';
import AppMenus from '../menu';
import Logo from './logo';
import './index.less';
import LogOut from 'src/pages/logout'
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from 'src/pages/dashboard';
import Photos from 'src/pages/photos'

const { Header, Footer, Sider, Content } = Layout;

interface IProps {
  [name: string]: any
}
interface IState {
  collapsed: boolean
}
/**
 *  页面布局 包含 Header Sider Content Footer 
 *
 * @export AppLayout 
 * @class AppLayout 
 * @params Props:any
 * @extends {React.Component<IProps, IState>}
 */
export default class AppLayout extends React.Component<IProps, IState> {
  public constructor(readonly props: IProps) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }

  toggle = (): void => {
    this.setState({ collapsed: !this.state.collapsed })
  }
  componentDidMount() {

    if (!this.props.auth) {

      this.props.history.push('/login');
    }
  }
  render() {

    return (
      <React.Fragment>
        <Layout className="layout-box">
          <Sider
            collapsed={this.state.collapsed}
            className="layout-sider"
          >
            <Logo />
            <AppMenus />
          </Sider>
          <Layout className={`layout-right ${this.state.collapsed ? 'padding' : ''}`}>
            <Header className="layout-header" style={{ zIndex: 0 }} />
            <Header className={`layout-header header-fixed ${this.state.collapsed ? 'collapsed' : ''}`}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
              <LogOut />
            </Header>
            <Content>
              <Container {...this.props} />
            </Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </React.Fragment >
    )
  }
}

const Container = (props) => {

  return (
    <div className={'container'}>
      <Switch>
        <Redirect exact from='/' to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/photos" component={Photos} />
        <Route path="*" component={() => <div>404</div>} />
      </Switch>
    </div>
  )
}