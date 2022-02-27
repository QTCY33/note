import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component: () => import('../components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/note',
      component: () => import('../components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('../components/TrashDetail.vue')
    }
  ]
})
const routerPush = Router.prototype.push
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};