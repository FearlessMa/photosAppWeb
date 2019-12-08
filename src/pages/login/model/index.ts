import { Action } from "redux";

export const loginSagas = {
  * fetchLogin({ call, put, fetchData }, action: Action) {
    console.log("action: ", action);
    const res = yield call(fetchData.post, "login", {});
    console.log("res: ", res);
    yield put({ type: "LOGIN", data: res });
  },
}


export default loginSagas;
