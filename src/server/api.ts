interface IApi {
  readonly [name: string]: string
}

const api: IApi = {
  login: '/user/login',
  logout: '/user/logout',
  getMenuList: "/menu",
  uploadPhotos: '/upload/photos',
  getUserInfo: '/userInfo',
  photosCreate:'/photos/create',
  photosAlbum:'/photo/album',
}

export default api;