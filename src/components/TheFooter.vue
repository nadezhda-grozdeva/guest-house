<template>
    <div  class="wrapper flex animated-div" ref="target" :class="{'animate': animate }">
        <div class="wrapper-address">
            <h3>Борумовата къща</h3>
            <p>гр. Дебелец 5030, обл. В. Търново</p>
            <p>ул. Александър Стамболийски 80</p>
            <p>Телефон: 087 888 9662</p>
            <div class="flex social">
                <a href="https://www.facebook.com/profile.php?id=100088121561341" target="_blank" title="Посети страницата">
                    <img src="../assets/images/icons/square-facebook.svg" alt="Facebook icon"/>
                </a>
                <a href="https://www.instagram.com/borumovata.kashta/?ref=buffer-resources" target="_blank" title="Посети страницата">
                    <img src="../assets/images/icons/square-instagram.svg" alt="Instagram icon"/>
                </a>
            </div>
        </div>
        <div class="wrapper-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11662.276276118253!2d25.6132912!3d43.0504976!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a927acec32e919%3A0x3930ede62e27fbac!2z0JHQvtGA0YPQvNC-0LLQsNGC0LAg0JrRitGJ0LA!5e0!3m2!1sbg!2sbg!4v1697230073845!5m2!1sbg!2sbg" width="450" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="wrapper-contact-form">
            <h3 class="text-center">Имате въпрос?</h3>
        <the-contact-form></the-contact-form>
        </div>
    </div>
</template>

<script>
//  COMPOSABLE
import { useIntersectionObserver } from '../composables/intersectionObserver.js'


// COMPONENTS
import TheContactForm from './TheContactForm.vue';

export default {
    components: {
        TheContactForm,
    },
    setup() {
        const { animate, target } = useIntersectionObserver()

        return {
            animate,
            target
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';
@import '../assets/styles/animations';

.wrapper {
    padding: 4rem 0;
    font: 1.5rem $font-family-text;
    color: #191919;
    background: #fff;
    margin: 0 auto;

    @media only screen and (min-width: 1224px) {
        width: 80%;
    }

    @media only screen and (min-width: 992px) {
        flex-direction: row;
        justify-content: space-between;
    }

    @media only screen and (min-width: 768px) and (max-width: 1224px) {
        padding: 4rem 1rem;
        width: 90%;
    }

    @include responsive(landscape-tablets) {
        flex-direction: column;
        text-align: center;
        align-items: center;
    }

    &.animated-div {
        opacity: 0;
        transition: all 2s;
    }

    &.animated-div.animate {
        opacity: 1;
    }

    & > div {
        @media only screen and (min-width: 993px) {
            flex-basis: 30%;
            padding: 0 .7rem;
        }

        @include responsive(medium-desktop) {
            margin-bottom: 3rem;
        }
    }

    @include responsive(landscape-tablets) {
        flex-direction: column;
        text-align: center;
    }

    h3 {
        text-transform: uppercase;
        font-size: 1.5em;
        line-height: 3rem;
    }

    &-address {
        line-height: 3rem;

        .social {

            @include responsive(landscape-tablets) {
                justify-content: center;
            }

            img {
                width: 30px;
                margin-right: 1rem;
            }
        }
    }

    &-map {
        @media only screen and (min-width: 992px) {
            max-width: 60%;
        }

        @include responsive(landscape-tablets) {
            width: 90%;
        }

        iframe {
            max-width: 100%;
        }
    }

    &-contact-form {
        @include responsive(landscape-tablets) {
            width: 450px;
            max-width: 90%;
            margin: 0 auto;
        }

        h3 {
            margin-bottom: 1rem;
        }
    }
}
</style>