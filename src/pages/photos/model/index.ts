import { Action } from "redux";
import { PHOTOS_ALBUM_LIST, LOADING } from 'store/actionTypes';
interface DataAction extends Action {
  data: any;
}
const photosSagas = {
  * create({ call, put, fetchData, notice }, action: DataAction) {
    const res = yield call(fetchData.post, 'photosCreate', { ...action.data })
    if (res.code === 200) {
      notice('success', '创建成功', res.message)
    } else {
      notice('error', '创建失败', res.message)
    }
  },
  *getPhotosAlbum({ call, put, fetchData, notice }, action: DataAction) {
    yield put({ type: LOADING, payload: { loading: true } })
    const res = yield call(fetchData.post, 'photosAlbum');
    if (res.code === 200) {
      yield put({ type: PHOTOS_ALBUM_LIST, payload: { photosAlbumList: res.data } })
    } else {
      notice('error', '获取失败', res.message)
    }
    yield put({ type: LOADING, payload: { loading: false } })
    console.log('res: ', res);
  }
}


export default photosSagas;