import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/pages/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/admin',
      component: () => import('./components/pages/User.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
  },
})

router.afterEach(function(to, from) {
  // sending analytics data
  // console.log('Global afterEach');
  // console.log( 'TO: ' + to.path);

});

export default router;