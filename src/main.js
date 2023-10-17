import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar';
import router from './router.js';
import VueLazyLoad from 'vue3-lazyload';
import App from './App.vue';

const app = createApp(App);


app.use(router);
app.use(createPinia());

// Use calendar defaults (optional)
app.use(setupCalendar, {});
app.use(VueLazyLoad, {
    // options...
  });

app.mount('#app');
