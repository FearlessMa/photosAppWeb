import { LOGIN, USER_INFO } from "store/actionTypes";
import { Action } from "redux";

interface DataAction extends Action {
  data: any;
}

export const loginSagas = {
  *fetchLogin({ call, put, fetchData, notice }, action: DataAction) {
    const res = yield call(fetchData.post, "login", { ...action.data });
    yield put({ type: 'getUserInfo' });
    if (res.code === 200) {
      yield put({ type: LOGIN });
    } else {
      notice('error', '登录失败', res.message);
    }
  },
  *getUserInfo({ call, put, fetchData }) {
    const res = yield call(fetchData.get, "getUserInfo");
    if (res.code === 200) {
      yield put({ type: USER_INFO, payload: { userInfo: res.userInfo, isLogin: true } });
    }
    return res;
  }
};

