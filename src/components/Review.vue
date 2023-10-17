<template>
    <base-card class="review" :class=review.source>
        <div class="review-content" :class="{scroll: showFullText}">
            <p class="review-content-text">{{ !showFullText && reviewFullText.length > textMaxLength ? reviewShortText : reviewFullText }}
            <button class="review-full-text-link" v-if="!showFullText && reviewFullText.length > textMaxLength" @click="showReviewFullText">[Виж целия текст]</button>
            <button class="review-full-text-link" v-if="showFullText && reviewFullText.length > textMaxLength" @click="showReviewFullText">[Скрий текста]</button>
            </p>
            <div class="review-content-footer">
                <p>{{ review.date }}</p>
                <p class="review-author">{{ review.author }}</p>
            </div>
        </div>
        <img class="review-bg" src="../assets/images/reviews-bg.jpg" alt="Борумовата къща" />
    </base-card>
</template>

<script>
import BaseCard from './UI/BaseCard.vue';
import { ref } from 'vue';

export default {
    components: {
        BaseCard,
    },
    props: ['review'],
    setup(props) {
        let showFullText = ref(false);
        let reviewFullText = props.review.review;
        let reviewShortText = ref(null);
        let textMaxLength = ref(185);

        if (reviewFullText.length > textMaxLength.value) {
            reviewShortText.value = reviewFullText.substring(0,textMaxLength.value) + ' ...';
        }

        function showReviewFullText() {
            showFullText.value = !showFullText.value;
        };

        return {
            reviewFullText,
            reviewShortText,
            showFullText,
            showReviewFullText,
            textMaxLength
        }
    }
}

</script>

<style scoped lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';
.review {
    margin: 2rem 1rem 4rem;
    position: relative;
    padding: 6rem 2rem 6rem;
    color: $base-text-color;
    font-family: $font-family-text;
    font-size: 1.3rem;
    min-height: 27rem;
    background-color: rgba(255,255,255, 0.55);

    @include responsive(portrait-tablets) {
        width: 90%;
    }

    &:after,
    &:before {
        display: block;
        width: 70px;
        height: 70px;
        position: absolute;
        opacity: .2;
    }

    &:after {
        content: url('../assets/images/icons/quote-right-solid.svg');
        bottom: 0.5rem;
        right: 1rem;
    }

    &:before {
        content: url('../assets/images/icons/quote-left-solid.svg');
        top: 0;
        left: 1rem;
    }

    &-bg {
        @include blured-img-bg(5px);
    }

    &-content {

        &.scroll {
            height: 100%;
            overflow-y: auto;
        }

        &-text {
        margin-bottom: 2rem;
        }

        &-full-text-link{
            color: #727272;

            &:hover {
            text-decoration: underline;
            }
        }

        &-footer {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: space-between;
        }
    }

}

// .review.facebook:after {
//     display: block;
//     content: '';
//     width: 50px;
//     height: 50px;
//     background: url('../assets/images/Facebook.png') no-repeat center;
//     background-size: cover;
//     position: absolute;
//     bottom: -2rem;
//     left: 50%;
//     transform: translate(-50%);
// }

</style>