<template>
    <div class="wrapper">
        <img class="wrapper-bg" v-lazy="{src: 'src/assets/images/amenities.jpg'}" alt="Борумовата къща" />
        <div class="wrapper-content text-center">
            <base-subheading #subheading class="text-center">Какво предлагаме?</base-subheading>
            <div class="amenities">
                <ul>
                    <li v-for="item in insideAmenities">
                        {{ item }}
                    </li>
                </ul>
                <img v-lazy="{ src: '../assets/images/amenities-2.png'}" class="text-center"/>
                <ul>
                    <li v-for="item in outsideAmenities">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BaseSubheading from './UI/BaseSubheading.vue';

export default {
    data() {
        return {
            insideAmenities: [
                'Спалня 1: кралско легло, разтегаем диван',
                'Спалня 2: кралско легло, разтегаем диван',
                'Спалня 3: кралско легло, детска кошара',
                'Всекидневна: разтегаем диван: 160/200',
                '2 големи баня/тоалетна на всеки етаж, едната от които оборудвана с хидромасажна душкабина',
                'Голяма маса за хранене: 10 души, мека мебел, 55*TV, соло кът, разтегателен диван, релакс кресло',
                'Кабелна телевизия, Wi-Fi, достъп до стрийминг платформи',
                'Напълно оборудвана кухня',
            ],
            outsideAmenities: [
                '2 тераси с панорамна гледка',
                'Огромен зелен открит детски кът',
                'Външна покрита зона за хранене и барбекю зона',
                'Отопляем басейн',
                '1400 m2 зелен двор',
                'Паркинг',
                'Тишината, спокойствието, чистия въздух са ни природно дадени, но няма как да не ги добавим и тук'
            ],
        }
    },
    components: {
        BaseSubheading
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';


.wrapper {
    position: relative;

    @media only screen and (min-width: 601px) {
        padding: 4rem 0;
    }

    @include responsive(phone) {
        padding: 0;
    }

    &-bg {
        @include blured-img-bg(5px);
    }

    &-content {
        border: 3px solid #000;
        background-color: rgba(255,255,255, 0.7);
        padding: 3rem 0 5rem;
        margin: 0 auto;

        @media only screen and (min-width: 1224px) {
            width: 80%;
        }

        @media only screen and (min-width: 601px) and (max-width: 1224px) {
            width: 90%;
        }

        .amenities {
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            flex-direction: column;
            padding: 0 1rem;

            ul li {
                list-style-type: none;
                padding: 0 2rem 0 1rem;
                font-weight: 700;
                letter-spacing:1px;
                color: $base-text-color;
                font-family: $font-family-text;
                font-size: 1.5rem;

                &::before {
                    display: inline-block;
                    content: '\2713';
                    // color: #8dda91;
                    color: #669457;
                }
            }
        }

        img {
            width: 60%;
            margin: 2rem auto
        }
    }
}

</style>