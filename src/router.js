import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
  scrollBehavior(to, from, savedPosition) {
    // console.log(window.location.href)

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
  // console.log(to, from);

});

export default router;