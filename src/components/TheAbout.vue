<template>
    <div class="wrapper">
        <!-- <div class="wrapper-img">
            <img src="../assets/images/about-us.png" alt="Borumovata kushta"/>
        </div> -->
        <div class="wrapper-text text-center">
            <base-subheading #subheading>Кои сме ние?</base-subheading>
            <!-- <h2>За нас...</h2> -->
            <p>Само на 5 минути от центъра на Велико Търново, нашата къща за гости е разположена в подножието на борова гора, освен уникалният чист въздух това ви осигурява и най-прекрасната гледка в района. Всяка от трите спални е оборудвана с висок клас матрак и са разположени на вторият етаж и отново предлагат освен уединение и невероятна гледка. Външно оборудвано барбекю с маса изцяло оборудвана кухня и просторна всекидневна и огромен зелен двор са много малка част от всичко което ви очаква при нас. </p>
        </div>
        <the-gallery></the-gallery>
    </div>
</template>

<script>
import BaseSubheading from './UI/BaseSubheading.vue';
import TheGallery from './TheGallery.vue';

export default {
    components: { 
        BaseSubheading,
        TheGallery
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.wrapper {
    padding: 5rem 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: column;
    position: relative;

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
            top: 1rem;
            right: 1rem;
            // transform: rotate(-180deg);
            transform: scaleX(-1);
        }
    }

    &-text {
        padding: 0 0 5rem;
        margin: 0 auto;
        position: relative;

        @media only screen and (min-width: 768px) {
            max-width: 70%;
        }

        @include responsive(portrait-tablets) {
            width: 90%;
        }

        p {
            @include text-styles;
        }
    }

}



</style>