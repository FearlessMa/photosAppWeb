
import { MENU_LIST } from 'store/actionTypes'

export const menuModel = {
  * fetchMenu({ call, fetchData, put, notice }) {
    const res = yield call(fetchData.get, 'getMenuList')
    console.log('res: getMenuList', res);

    if (res.code === 200) {
      yield put({ type: MENU_LIST, payload: { menuList: res.data } });
    } else {
      notice('error', '菜单获取失败', res.message)
    }
  }
}
