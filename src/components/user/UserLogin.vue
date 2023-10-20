<template>
    <div class="wrapper text-center">
        <base-card class="wrapper-content">
            <h3>Вход</h3>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="username">Потребителско име</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        :class="{'border-red': v$.username.$error}"
                        v-model.trim="v$.username.$model" 
                        @blur="v$.username.$touch"
                        />
                    <div v-if="v$.username.$error">
                        <p v-for="error of v$.username.$errors" :key="error.$uid" class="warning" >
                            <span> {{ error.$message }}</span></p>
                    </div>
                </div>
                <div class="form-control">
                    <label for="password">Парола</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        :class="{'border-red': v$.password.$error}"
                        v-model.trim="v$.password.$model" 
                        @blur="v$.password.$touch"
                        />
                    <div v-if="v$.password.$error">
                        <p v-for="error of v$.password.$errors" :key="error.$uid" class="warning" >
                            <span> {{ error.$message }}</span></p>
                    </div>
                </div>
                <div class="form-control">
                    <base-button #base-button class="button">Вход</base-button>
                </div>
            </form>
        </base-card>
    </div>
</template>

<script>
import { reactive } from 'vue';

// VUELIDATE
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, integer } from '@vuelidate/validators'

// COMPONENTS
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue'


export default {
    components: {
        BaseCard,
        BaseButton
    },
    emits: ['userLoginData'],
    setup(_,{emit}) {
        const state = reactive({
            username: '',
            password: ''
        })

        const rules = {
            username: {
                required: helpers.withMessage('Моля, въведете email.', required),
                email: helpers.withMessage('Моля, въведете валиден email!', email),
                minLength: helpers.withMessage('Полето трябва да съдържа поне 6 символа.', minLength(6))
            },
            password: {
                required: helpers.withMessage('Моля, въведете парола.', required),
                minLength: helpers.withMessage('Полето трябва да съдържа поне 6 символа.', minLength(6))
            }
        }

        const v$ = useVuelidate(rules, state)

        function submitForm(data) {
            const isFormValid = v$.value.$validate();

            if (isFormValid) {
                const userData = {
                    username: state.username,
                    password: state.password
                }

                emit('userLoginData', userData)
            }

        }
        return {
            state, v$,
            submitForm
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';


.wrapper {
    padding: 5rem 1rem;

    .wrapper-content {
        padding: 5rem;

        h3 {
            text-transform: uppercase;
            font-size: 1.5em;
            line-height: 3rem;
            margin-bottom: 2rem;
        }

        .form-control {
            margin-bottom: 2rem;

            input {
                display: block;
                height: 2.5rem;
            }

            .border-red {
                border-bottom: 3px solid red;
            }

            p.warning {
                color: red;
                font-size: 1.2rem;
                text-align: left;
            }
        }
    }
}

</style>

