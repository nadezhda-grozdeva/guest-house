<template>
    <div class="wrapper" ref="target">
        <TransitionGroup name="fade">
            <template v-if="animate">
                <base-subheading #subheading class="text-center">другите за нас</base-subheading>
                <div class="wrapper-reviews">
                    <carousel v-bind="settings" :breakpoints="breakpoints">
                        <slide v-for="review in reviews" :key="review">
                            <review :review="review"></review>
                        </slide>
                        <template #addons>
                        <pagination />
                        </template>
                    </carousel>
                </div>
            </template>
        </TransitionGroup>

    </div>
</template>

<script>
//  COMPOSABLE
import { useIntersectionObserver } from '../composables/intersectionObserver.js'

// STORE
import { useReviewsStore } from '../stores/reviews';

// COMPONENTS
import BaseSubheading from './UI/BaseSubheading.vue';
import Review from './Review.vue';

// GALLERY CAROUSEL
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    components: {
        BaseSubheading,
        Review,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    setup() {
        const { animate, target } = useIntersectionObserver()
        const reviews = useReviewsStore().getReviews;
        const settings = {
            itemsToShow: 1,
            snapAlign: 'start',
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
            },
        }

        return {
            reviews,
            settings,
            breakpoints,
            animate,
            target
        }
    },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/animations';

.wrapper {
    min-height: 500px;
    padding: 2rem 0 4rem;
    position: relative;

    &-reviews {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        @include responsive(portrait-tablets) {
            width: 90%;
            margin: 0 auto;
        }

        .carousel {
            margin: 0 auto;
            max-width: 100%;

            @media only screen and (min-width: 1224px) {
                width: 80%;
            }

            @media only screen and (min-width: 768px) and (max-width: 1224px) {
                width: 90%;
            }

            .carousel__slide {
                align-items: self-start;
            }
        }
    }

    @media only screen and (min-width: 768px) {
        &:before {
            display: block;
            content: url('../assets/images/icons/pagelines.svg');
            font-size: 5rem;
            width: 250px;
            opacity: 0.2;
            position: absolute;
            top: 1rem;
            left: 1rem;
        }

        &:after {
            display: block;
            content: url('../assets/images/icons/pagelines.svg');
            font-size: 5rem;
            width: 250px;
            opacity: 0.2;
            position: absolute;
            z-index: -1;
            bottom: 1rem;
            right: 1rem;
            transform: rotate(-180deg);
        }
    }
}

</style>