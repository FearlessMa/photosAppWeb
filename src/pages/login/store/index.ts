import { Reducer } from "redux";
import { LOGIN, LOGOUT, RESET, REFERENCE, USER_INFO } from "store/actionTypes";
import { sessionStorageUtils } from 'utils'

const initState = {}
export const loginReducer: Reducer = (state = initState, action: MYAPP.DataAction) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { ...action.payload });
    case LOGOUT:
      return Object.assign({}, state, { ...action.payload });
    case USER_INFO:
      return Object.assign({}, state, { ...action.payload });
    case RESET:
      return Object.assign({}, initState);
    case REFERENCE:
      return Object.assign({}, { ...action.payload.loginReducer });
    default:
      return state;
  }
};
