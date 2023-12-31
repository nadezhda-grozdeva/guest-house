import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router.js';
import VueLazyLoad from 'vue3-lazyload';
import App from './App.vue';


const app = createApp(App);

// USE ROUTER
app.use(router);

// USE PINIA FOR STORE
app.use(createPinia());

// USE VUE LAZYLOAD FOR IMAGES
app.use(VueLazyLoad, {});

app.mount('#app');
