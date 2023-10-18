import { createRouter, createMemoryHistory } from 'vue-router';

const router = createRouter({
  history: createMemoryHistory(),
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

});

export default router;