
import * as axios from 'axios';
import api from './api';

const a: any = axios;

// 添加响应拦截器
a.interceptors.response.use(function (response: any) {
  // 对响应数据做点什么
  return response.data;
}, function (error: string) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


const fetchData: MyApp.IFetchData = {
  get: (url: string, params: {}, method = 'get') => a[method](api[url], params),
  post: (url: string, params: {}, method = 'post') => a[method](api[url], params)
}

export default fetchData;