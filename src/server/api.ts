interface IApi {
  readonly [name: string]: string
}

const api: IApi = {
  login: '/user/login'
}

export default api;