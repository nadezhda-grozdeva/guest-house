<template>
  <header>
    <div class="wrapper">
    </div>
  </header>
  <main>
    <template v-if="windowWidth < 768">
      <the-navigation-menu ></the-navigation-menu>
    </template>
    <the-hero></the-hero>
    <the-about id="about"></the-about>
    <the-amenities id="amenities"></the-amenities>
    <the-reviews id="reviews"></the-reviews>
    <the-reservation-form id="reservation-form"></the-reservation-form>
    <the-footer id="contacts"></the-footer>
  </main>
</template>

<script>
import TheNavigationMenu from './components/TheNavigationMenu.vue';

import { ref, defineAsyncComponent, onMounted, onUnmounted } from 'vue'

export default {
  components: {
    TheNavigationMenu,
    TheHero: defineAsyncComponent(() =>
      import('./components/TheHero.vue')
    ),
    TheAbout: defineAsyncComponent(() =>
      import('./components/TheAbout.vue')
    ),
    TheHero: defineAsyncComponent(() =>
      import('./components/TheHero.vue')
    ),
    TheAmenities: defineAsyncComponent(() =>
      import('./components/TheAmenities.vue')
    ),
    TheReviews: defineAsyncComponent(() =>
      import('./components/TheReviews.vue')
    ),
    TheReservationForm: defineAsyncComponent(() =>
      import('./components/TheReservationForm.vue')
    ),
    TheFooter: defineAsyncComponent(() =>
      import('./components/TheFooter.vue')
    )
  },
  setup() {
    const windowWidth = ref(window.innerWidth);

    onMounted(() => {
      window.addEventListener('resize', () => {windowWidth.value = window.innerWidth} )
    })
    onUnmounted(() => {
      window.removeEventListener('resize', () => {windowWidth.value = window.innerWidth})
    })

    return {
      windowWidth
    }
  }
}

</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
