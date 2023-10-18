<template>
  <header>
    <div class="wrapper">
    </div>
  </header>
  <main>
    <the-navigation-menu></the-navigation-menu>
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

import { defineAsyncComponent } from 'vue'

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
  }
}

</script>

<style lang="scss">
@import './assets/styles/main.scss';
// @import '../assets/styles/variables.scss';
// @import '../assets/styles/mixins.scss';
// @import '../assets/styles/animations.scss';
</style>
