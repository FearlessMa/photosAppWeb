import { LOGOUT } from "store/actionTypes";
import { Action } from "redux";

interface DataAction extends Action {
    data: any;
}

export const logoutSagas = {
    *fetchLogout({ call, put, fetchData, notice }, action: DataAction) {
        const res = yield call(fetchData.post, "logout", { ...action.data });
        console.log('res: fetchLogout', res);
        if (res.code === 200) {
            yield put({ type: LOGOUT, payload: { data: res.data, isLogin: false } });
        } else {
            notice('error', '登出失败', res.message);
        }
    }
};

