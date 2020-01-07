
import { MENU_LIST, ACTIVE_MENU, RESET, REFERENCE } from 'store/actionTypes';
import { sessionStorageUtils } from 'utils'

const initState = { menuList: [], activeMenu: [] };
const defaultState = (sessionStorageUtils.getItem('state') as any).menuState || initState;

export const menuState = (state = defaultState, action: MYAPP.DataAction) => {
  switch (action.type) {
    case MENU_LIST:
      return Object.assign({}, state, { ...action.payload });
    case ACTIVE_MENU:
      return Object.assign({}, state, { ...action.payload })
    case RESET:
      return Object.assign({}, initState);
    case REFERENCE:
      console.log('REFERENCE: ', REFERENCE);
      return Object.assign({}, { ...action.payload.menuState});
    default:
      return state;
  }
}