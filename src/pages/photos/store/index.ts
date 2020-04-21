
import { PHOTOS_ALBUM_LIST, LOADING } from 'store/actionTypes';
const initData = {
  photosAlbumList: [],
  loading: false,
};


const photoState = (state = initData, action) => {

  switch (action.type) {
    case PHOTOS_ALBUM_LIST:
      return Object.assign({}, state, { ...action.payload });
    case LOADING:
      return Object.assign({}, state, { ...action.payload })
    default:
      return state;
  }
}

export { photoState }