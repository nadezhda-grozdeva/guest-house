<template>
    <Carousel v-bind="settingsCarousel" :breakpoints="breakpoints" :transition="500" snapAlign="center" >
      <Slide v-for="slide in slides" :key="slide.id" >
        <div class="carousel__item">
          <img v-lazy="{src: `${slide.src}`}" alt="Борумовата Къща" />
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
        {
          id: 1,
          src: new URL('@/assets/images/gallery/outside-house.jpg', import.meta.url).href
        },
        {
          id: 2,
          src: new URL('@/assets/images/gallery/outside-pool.jpg', import.meta.url).href
        },
        {
          id: 3,
          src: new URL('@/assets/images/gallery/outside-garden-2.jpg', import.meta.url).href
        },
        {
          id: 4,
          src: new URL('@/assets/images/gallery/outside-garden.jpg', import.meta.url).href
        },
        {
          id: 5,
          src: new URL('@/assets/images/gallery/inside-living-room.jpg', import.meta.url).href
        },
        {
          id: 6,
          src: new URL('@/assets/images/gallery/inside-living-room-2.jpg', import.meta.url).href
        },
        {
          id: 7,
          src: new URL('@/assets/images/gallery/inside-living-room-3.jpg', import.meta.url).href
        },
        {
          id: 8,
          src: new URL('@/assets/images/gallery/inside-living-room-4.jpg', import.meta.url).href
        },
        {
          id: 9,
          src: new URL('@/assets/images/gallery/inside-living-room-5.jpg', import.meta.url).href
        },
    ];
    const settingsCarousel = {
        itemsToShow: 1,
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