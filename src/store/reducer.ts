import { Action, Reducer } from "redux";
import { LOGIN } from './actionTypes';

const defaultState = {};

export const reducer: Reducer = (state = defaultState, action: MYAPP.DataAction) => {
  console.log('action:11 ', action);
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { lgoinData: action.data });
    default:
      return state
  }
}