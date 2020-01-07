interface IApi {
  readonly [name: string]: string
}

const api: IApi = {
  login: '/user/login',
  logout: '/user/logout',
  getMenuList: "/getMenuList"
}

export default api;