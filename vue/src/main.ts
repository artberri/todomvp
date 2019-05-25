import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import Vue from 'vue';
import App from './App.vue';
import VueLocalStorage from 'vue-localstorage';
import { bootstrap } from '../../app/src';
import { TodoLocalStorageService } from './services';

bootstrap(TodoLocalStorageService);

Vue.config.productionTip = false;
Vue.use(VueLocalStorage);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
