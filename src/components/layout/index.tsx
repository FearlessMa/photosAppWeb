import * as React from 'react';
import { Layout, Row, Button, Icon } from 'antd';
import AppMenus from '../menu';
import Logo from './logo';
import './index.less';
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
  render() {

    return (
      <React.Fragment>
        <Layout className="layout-box">
          <Sider
            collapsed={this.state.collapsed}
          >
            <Logo />
            <AppMenus />
          </Sider>
          <Layout>
            <Header>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
            </Header>
            <Content>content</Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </React.Fragment >
    )
  }
}