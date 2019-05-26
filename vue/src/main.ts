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

Vue.filter('pluralize', (value: string, count: number) => {
  if (!value) {
    return '';
  }

  return value + (count === 1 ? '' : 's');
});

new Vue({
  render: (h) => h(App)
}).$mount('#app');
