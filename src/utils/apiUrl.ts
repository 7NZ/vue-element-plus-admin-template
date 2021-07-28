const isDev = process.env.NODE_ENV === 'development';
const prodMode = process.env.NODE_ENV === 'production';
let API: string|undefined = '';
if (isDev) {
  API = 'http://192.168.0.249:8088/';
} else if (prodMode) {
  if (process.env.VUE_APP_MODE === 'test') {
    API = process.env.VUE_APP_APIURL; // 线上测试环境接口地址，在.env.test文件中定义
  } else {
    API = 'https://api.domain.com/';
  }
}

export default API;
