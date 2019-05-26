import Vue from 'vue';
import Router from 'vue-router';
import Todos from './components/Todos.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'selected',
  routes: [
    { path: '/', name: 'home', component: Todos, props: { filter: 'none' } },
    { path: '/active', name: 'active', component: Todos, props: { filter: 'active' } },
    { path: '/completed', name: 'completed', component: Todos, props: { filter: 'completed' } }
  ]
});
