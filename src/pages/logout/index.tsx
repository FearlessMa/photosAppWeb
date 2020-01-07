import * as React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import { registerSaga } from "store/index";
import './index.less';
import { logoutSagas } from './store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sessionStorageUtils } from 'utils';
import { RESET } from 'store/actionTypes';


export interface LogOutProps {
    [name: string]: any;
}

export interface LogOutState {
    [name: string]: any;
}

registerSaga(logoutSagas)

const MenuItem = Menu.Item;

const menu = (props) => {
    const { menuClick } = props;
    return (<Menu>
        <MenuItem key={'logout'} onClick={menuClick} ><span>注销</span></MenuItem>
    </Menu>)
}

const mapStateToProps = (state) => ({ loginData: state.loginReducer, userName: state.loginReducer.data ? state.loginReducer.data.userName : 'user' });
const mapDispatchToProps = (dispatch) => ({
    promiseLogout: () => dispatch({ type: 'fetchLogout' }),
    resetState: () => dispatch({ type: RESET })
})


@(withRouter as any)
@(connect(mapStateToProps, mapDispatchToProps) as any)
class LogOut extends React.Component<LogOutProps, LogOutState> {
    constructor(props: LogOutProps) {
        super(props);
        this.state = {};
    }
    menuClick = (data) => {
        this[data.key]();
    }
    logout = () => {
        this.clearSessionItem('state');
        this.props.promiseLogout();
        this.props.resetState();
    }
    gotoLoginPage = (isLogin) => {
        console.log('isLogin: gotoLoginPage', isLogin);
        if (!isLogin) {
            this.push('/login');
        }
    }
    push = (path) => { this.props.history.push(path); }
    clearSessionItem = (key: string) => { sessionStorageUtils.clearItem(key); }
    shouldComponentUpdate(nextProps) {
        this.gotoLoginPage(nextProps.loginData && nextProps.loginData.isLogin);
        return true;
    }
    render() {
        const menuProps = { menuClick: this.menuClick }
        return (<>
            <Dropdown overlay={menu(menuProps)}>
                <div className="logout">{this.props.userName}</div>
            </Dropdown>
        </>);
    }
}

export default LogOut;