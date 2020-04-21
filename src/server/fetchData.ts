
import * as axios from 'axios';
import api from './api';
import { notification } from 'antd';

const a: any = axios;

// 响应拦截器
a.interceptors.response.use(function (response: any) {
  resFormat(response)
  return response.data;
}, function (error: string) {
  // 响应错误
  return Promise.reject(error);
});


const fetchData = {
  get: (url: string, params: {} | null = null, method = 'get') => a[method](api[url], params),
  post: (url: string, params: {} | null = null, method = 'post') => a[method](api[url], params)
}

export default fetchData;

// 处理响应状态码
const resFormat = res => {
  if (res && res.data) {
    resCodeMap[res.data.code] && resCodeMap[res.data.code](res);
  }
};

const resCodeMap = {
  401: res => {
    notification.open({
      type: "error",
      message: `错误码 ${res.data.code || "暂无"}`,
      description: `${res.data.msg || "暂无"},1秒后返回登录`,
      duration: 1,
      onClose: () => {
        location.hash = "#/login";
        // location.reload();
      }
    });
  },
}