import * as React from "react";
import { Menu, Icon, Divider } from "antd";
import { ClickParam, MenuProps } from "antd/lib/menu";

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

interface Iprops {
  [name: string]: any;
}
interface Istate {
  [name: string]: any;
}

export default class AppMenus extends React.Component<Iprops, Istate> {
  constructor(readonly props: Iprops) {
    super(props);
  }

  menuOnClick = (params: ClickParam) => {
    const { item, key, keyPath, domEvent } = params;
    console.log("domEvent: ", domEvent);
    console.log("keyPath: ", keyPath);
    console.log("key: ", key);
    console.log("item: ", item);
  };

  render() {
    return (
      <React.Fragment>
        <MenuIFC onClick={this.menuOnClick} inlineCollapsed={true} />
      </React.Fragment>
    );
  }
}

// 继承antd MenuProps属性
interface IMenuProps extends MenuProps {
  // [name: string]: any,
  menuOnClick?: (data: ClickParam) => void;
}

const MenuIFC: IFCspace.IFC = (props: IMenuProps): React.ReactElement => {
  const { onClick } = props;
  return (
    <React.Fragment>
      <Menu
        mode="inline"
        theme="dark"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
      >
        <MenuItem key={"1"}>
          <Icon type="user" />
          <span>1</span>
        </MenuItem>
        <SubMenu
          key={"SubMenu"}
          title={
            <span>
              <Icon type="github" />
              <span>SubMenu</span>
            </span>
          }
        >
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
          <MenuItem>4</MenuItem>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};
