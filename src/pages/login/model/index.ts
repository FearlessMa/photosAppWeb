import { LOGIN } from "store/actionTypes";
import { Action } from "redux";

interface DataAction extends Action {
  data: any
}

export const loginSagas = {
  * fetchLogin({ call, put, fetchData }, action: DataAction) {
    console.log('action: ', action);
    const res = yield call(fetchData.post, "login", { ...action.data });
    if (res.code === 200) {
      yield put({ type: LOGIN, data: res.data });
    } else {
      
    }
    console.log('res: ', res);
  },
}


export default loginSagas;
