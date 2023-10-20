<template>
    <!-- IF ADMIN IS NOT LOGGED -->
    <dialog  class="user-login-wrapper">
        <user-login
        v-if="!isLogged"
        class="user-login"
        @userLoginData="userLogin"
    ></user-login>
    </dialog>

    <!-- IF ADMIN IS LOGGED -->
    <div class="wrapper" v-if="user && isLogged">
        <h1 style="font-size: 3rem">{{ user }}</h1>
        <base-button
            v-if="isLogged"
            #base-button
            @click="userLogout"
        >Logout</base-button>
        <user-profile :user="user"></user-profile>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';

// USER STORE
import { useUserStore } from '../../stores/user';

// COMPONENTS
import UserLogin from '../user/UserLogin.vue';
import UserProfile from '@/components/user/UserProfile.vue';
import BaseButton from '@/components/UI/BaseButton.vue'

export default {
    components: {
        UserLogin,
        UserProfile,
        BaseButton
    },
    setup() {
        // const user = reactive({});
        const userStore = useUserStore();
        let checkIfLoggedUser = reactive({});
        const isLogged = ref(null);

        onMounted(function() {
            // console.log('onMounted 1')
            isLogged.value = userStore.isLoggedUser();
        });

        const user = computed(function() {
            const res = userStore.getLoggedUser;
            return res
        })

        async function userLogin(userData) {
            const response = await userStore.loginUser(userData);
            isLogged.value = response
        }
        function userLogout() {
            const res = userStore.logoutUser();
            isLogged.value = res;
        }

        return {
            user,
            isLogged,
            userLogin,
            userLogout
        }
    }
}

</script>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';

.user-login-wrapper {
    display: block;
    border: none;
}

</style>