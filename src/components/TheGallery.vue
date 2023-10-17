<template>
    <Carousel v-bind="settingsCarousel" :breakpoints="breakpoints" :transition="500" snapAlign="center" >
      <Slide v-for="slide in slides" :key="slide" >
        <div class="carousel__item">
          <img v-lazy="slide" alt="Борумовата Къща" />
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
</template>

<script>
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  setup () {
    const slides = [
        '../src/assets/images/gallery/outside-house.jpg',
        '../src/assets/images/gallery/outside-pool.jpg',
        '../src/assets/images/gallery/outside-garden-2.jpg',
        '../src/assets/images/gallery/outside-garden.jpg',
        '../src/assets/images/gallery/inside-living-room.jpg',
        '../src/assets/images/gallery/inside-living-room-2.jpg',
        '../src/assets/images/gallery/inside-living-room-3.jpg',
        '../src/assets/images/gallery/inside-living-room-4.jpg',
        '../src/assets/images/gallery/inside-living-room-5.jpg',
    ];
    const settingsCarousel = {
        itemsToShow: 1,
        // snapAlign: 'center',
    };

    const breakpoints = {
        0: {
            itemsToShow: 1,
        },
        601: {
            itemsToShow: 2,
        },
        992: {
            itemsToShow: 3,
            snapAlign: 'center',
        },
    }

    return {
      slides,
      settingsCarousel,
      breakpoints
    }
  }
}
</script>

<style scoped>

</style>