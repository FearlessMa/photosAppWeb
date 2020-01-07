import { LOGIN } from "store/actionTypes";
import { Action } from "redux";
// import { registerSaga, registerReducer } from "store/index";

interface DataAction extends Action {
  data: any;
}

export const loginSagas = {
  *fetchLogin({ call, put, fetchData, notice}, action: DataAction) {
    console.log("action: loginSagas", action);
    const res = yield call(fetchData.post, "login", { ...action.data });
    console.log('res:loginSagas ', res);
    if (res.code === 200) {
      yield put({ type: LOGIN, payload: { data: res.data, isLogin: true } });
    } else {
      notice('error','登录失败',res.message);
    }
  }
};

// export default loginSagas;
// registerSaga(loginSagas);
