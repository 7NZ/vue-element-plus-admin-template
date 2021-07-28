import { createApp } from 'vue';
import App from './App.vue';
import { components, plugins } from './plugins/element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from './router/index';
import '@/styles/index.scss';
import _axios from '@/utils/request';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

plugins.forEach(plugin => {
  app.use(plugin as any); // ElMessage 未通过类型检查，暂用any
});

app.use(router);
app.config.globalProperties.$http = _axios;

app.mount('#app');
