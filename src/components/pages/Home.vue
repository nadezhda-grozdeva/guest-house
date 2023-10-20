<template>
    <the-navigation-menu ></the-navigation-menu>
    <the-hero></the-hero>
    <the-about id="about"></the-about>
    <the-amenities id="amenities"></the-amenities>
    <the-reviews id="reviews"></the-reviews>
    <the-reservation-form id="reservation-form"></the-reservation-form>
    <the-footer id="contacts"></the-footer>
</template>

<script>
import TheNavigationMenu from '../TheNavigationMenu.vue';

import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TheNavigationMenu,
    TheHero: defineAsyncComponent(() =>
      import('../TheHero.vue')
    ),
    TheAbout: defineAsyncComponent(() =>
      import('../TheAbout.vue')
    ),
    TheHero: defineAsyncComponent(() =>
      import('../TheHero.vue')
    ),
    TheAmenities: defineAsyncComponent(() =>
      import('../TheAmenities.vue')
    ),
    TheReviews: defineAsyncComponent(() =>
      import('../TheReviews.vue')
    ),
    TheReservationForm: defineAsyncComponent(() =>
      import('../TheReservationForm.vue')
    ),
    TheFooter: defineAsyncComponent(() =>
      import('../TheFooter.vue')
    )
  }
}

</script>