import axios from 'axios';
import { getCurrentInstance } from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import apiUrl from './apiUrl';

interface CodeStatus {
  [propName: number]: string
}

const codeMessage: CodeStatus = {
  400: '参数错误',
  401: '需要用户验证',
  403: '用户无权限',
  404: '资源不存在',
  405: '不支持的操作方法',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的',
  415: '服务器不支持的请求格式',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器内部错误',
  502: '应用程序错误',
  503: '维护中',
  504: '网关超时'
};

const { proxy }: any = getCurrentInstance();

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 120000,
  withCredentials: false
});

instance.interceptors.request.use(function(config) {
  NProgress.start();
  const token = window.sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  // Do something with request error
  console.error(error);
  Promise.reject(error);
});

instance.interceptors.response.use(response => {
  NProgress.done();
  // Do something with response data
  if (response.status === 200) {
    // 状态码不是ok则失败，这里直接提示，调用时不需要再提示失败
    if (response.data.code !== 'ok') {
      proxy.$message.warning(response.data.msg);
      return Promise.reject(response.data);
    }
    return response.data;
  }
  return response.data;
}, error => {
  // Do something with response error
  const data = error.response;
  console.warn('request error:', error);
  if (data) {
    const msg = codeMessage[data.status] || '未知错误';
    proxy.$message.error(msg);
    return Promise.reject(data);
  } if (!window.navigator.onLine) {
    proxy.$message.error('网络异常，请检查网络是否正常连接');
  } else {
    proxy.$message.error('请求出错，请重试');
    return Promise.reject(error);
  }
});

export default instance;
