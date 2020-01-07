import { Reducer } from "redux";
import { LOGIN, LOGOUT, RESET, REFERENCE } from "store/actionTypes";
import { sessionStorageUtils } from 'utils'

const initState = {}
const defaultState = (sessionStorageUtils.getItem('state') as any)?.loginReducer || initState;
console.log('defaultState: ', defaultState);
export const loginReducer: Reducer = (state = defaultState, action: MYAPP.DataAction) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { ...action.payload });
    case LOGOUT:
      return Object.assign({}, state, { ...action.payload });
    case RESET:
      return Object.assign({}, initState);
    case REFERENCE:
      console.log('REFERENCE: ', REFERENCE);
      return Object.assign({}, { ...action.payload.loginReducer });
    default:
      return state;
  }
};
