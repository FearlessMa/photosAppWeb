import * as React from "react";
import { Menu, Icon, Divider, Skeleton } from "antd";
import { ClickParam, MenuProps } from "antd/lib/menu";
import { menuModel } from './model';
import { registerSaga } from 'src/store';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ACTIVE_MENU, OPEN_KEYS } from 'store/actionTypes';

registerSaga(menuModel)
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

interface Iprops {
  [name: string]: any;
}
interface Istate {
  [name: string]: any;
}

const mapStateToProps = state => {
  const { menuState } = state;
  return ({ menuList: menuState.menuList, activeMenu: menuState.activeMenu, openKeys: menuState.openKeys });
}
const mapDispatchToProps = dispatch => ({
  fetchMenu() { dispatch({ type: 'fetchMenu' }) },
  setActiveMenu(activeMenu) { dispatch({ type: ACTIVE_MENU, payload: { activeMenu } }) },
  setOpenKeys(openKeys) { dispatch({ type: OPEN_KEYS, payload: { openKeys } }) }
});

@(withRouter as any)
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class AppMenus extends React.Component<Iprops, Istate> {
  constructor(readonly props: Iprops) {
    super(props);
    this.props.fetchMenu();
    this.state = { selectKeys: this.props.activeMenu || [], openKeys: this.props.openKeys || [] }
  }

  menuOnClick = (params: ClickParam) => {
    const { item, key, keyPath, domEvent } = params;
    const { history } = this.props;
    console.log("domEvent: ", domEvent);
    console.log("keyPath: ", keyPath);
    console.log("key: ", key);
    console.log("item: ", item);
    this.setSelectMenuKeys([key]);
    const path = key.split('-')[0];
    if (history.location.pathname !== path) {
      this.props.history.push(path);
    }
  };
  setSelectMenuKeys = (keysList: string[]) => {
    this.setState({ selectKeys: keysList });
    this.props.setActiveMenu(keysList);
  }
  openChange = (openKeys: string[]) => {
    console.log('openKeys: ', openKeys);
    this.setState({ openKeys });
    this.props.setOpenKeys(openKeys);
  }
  render() {
    const { openKeys } = this.state;
    return (
      <React.Fragment>
        <MenuIFC
          onClick={this.menuOnClick}
          inlineCollapsed={true}
          menuList={this.props.menuList}
          selectKeys={this.state.selectKeys}
          defaultKeys={[this.props.menuList[0] ? this.props.menuList[0].path + '-0' : '']}
          openChange={this.openChange}
          openKeys={openKeys}
        />
      </React.Fragment>
    );
  }
}

// 继承antd MenuProps属性
interface IMenuProps extends MenuProps {
  [name: string]: any,
  menuOnClick?: (data: ClickParam) => void;
  menuList: any[]
}

const MenuIFC: IFCspace.IFC = (props: IMenuProps): React.ReactElement => {
  const { onClick, menuList, selectKeys, defaultKeys, openChange, openKeys } = props;
  const createMenu = (list) => {
    return list.map((item, index) => {
      if (Array.isArray(item.children)) {
        return (
          <SubMenu
            key={item.path + '-' + index}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }
          >
            {createMenu(item.children)}
          </SubMenu>
        )
      } else {
        return (<MenuItem key={item.path + '-' + index}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </MenuItem>)
      }
    })
  }
  return (
    <React.Fragment>
      <Menu
        mode="inline"
        theme="dark"
        onClick={onClick}
        selectedKeys={selectKeys.length ? selectKeys : defaultKeys}
        onOpenChange={openChange}
        openKeys={openKeys}
      >
        {createMenu(menuList)}
      </Menu>
    </React.Fragment>
  );
};
