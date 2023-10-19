<template>
    <div class="wrapper" >
        <div class="menu-icons animated-div" @click="toggleMenuIcon">
            <img :src="menuIcon" alt="Menu icon" >
        </div>
        <Transition name="menu">
            <div class="menu" v-if="!toggleMenu" :class="{ open: !toggleMenu}">
                <ul>
                    <li><router-link to="/#about" @click.native="toggleMenuIcon">Кои сме ние?</router-link></li>
                    <li><router-link to="/#amenities" @click.native="toggleMenuIcon">Какво предлагаме?</router-link></li>
                    <li><router-link to="/#reviews" @click.native="toggleMenuIcon">Другите за нас</router-link></li>
                    <li><router-link to="/#reservation-form" @click.native="toggleMenuIcon">Резервирай сега</router-link></li>
                    <li><router-link to="/#contacts" @click.native="toggleMenuIcon">Контакти</router-link></li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        const toggleMenu = ref('false');

        const menuIcon = computed(function() {
            const menuIcon = new URL('@/assets/images/icons/bars-solid.svg', import.meta.url).href;
            const menuCloseIcon = new URL('@/assets/images/icons/xmark-solid.svg', import.meta.url).href;
            return toggleMenu.value ? menuIcon : menuCloseIcon
        })

        function toggleMenuIcon() {
            toggleMenu.value = !toggleMenu.value;
        }

        return {
            menuIcon,
            toggleMenuIcon,
            toggleMenu
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';
@import '../assets/styles/animations';

.wrapper {
    .animated-div {
        animation: fade-in 2s;
    }

    .menu-icons {
        position: fixed;
        top: 1rem;
        right: 2rem;
        z-index: 99;
        width: 3.85rem;
        height: 3.85rem;
        background-color: rgba(255,255,255, 0.8);
        padding: 1rem;
        border-radius: 50%;

        &:hover {
            cursor: pointer;
        }
    }

    .menu {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 98;
    }

    .menu.open {
        top: 0;
        right: 0;
        background-color:#fff;
        height: auto;
        font: 1.5rem $font-family-text;
        color: $base-text-color;
        line-height: 3rem;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.26);
        padding: 2rem 2rem 2rem 3rem;

            a {
                text-decoration: none;
                color: inherit;
            }

        @media only screen and (max-width: 450px) {
            width: 100%;
        }

        @media only screen and (min-width: 450px) {
            width: 25rem;
            max-width: 100%;
        }
    }
}



// TRANSITION CLASSES
.menu-enter-from,
.menu-leave-to {
    transform: translateX(25rem);
}
.menu-enter-to,
.menu-leave-from {
    transform: translateX();
}
.menu-enter-active,
.menu-leave-active {
    transition: all 0.5s ease-in;
}

</style>