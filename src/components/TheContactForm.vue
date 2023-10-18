<template>
    <form @submit.prevent="submitForm">
        <div class="flex">
            <div class="form-control">
                <label for="contact-name">Вашите имена</label>
                <input 
                    type="text" 
                    id="contact-name" 
                    name="contact-name" 
                    :class="{'border-red': v$.name.$error}"
                    v-model.trim="v$.name.$model" 
                    @blur="v$.name.$touch"
                    />
                <div v-if="v$.name.$error">
                    <p v-for="error of v$.name.$errors" :key="error.$uid" class="warning" >
                        <span> {{ error.$message }}</span></p>
                </div>
            </div>
        </div>
        <div class="flex flex-column">
            <div class="form-control">
                <label for="contact-phone">Вашият телефон:</label>
                <input 
                    type="number" 
                    id="contact-phone" 
                    name="contact-phone" 
                    :class="{'border-red': v$.phone.$error}"
                    v-model.trim="v$.phone.$model" 
                    @blur="v$.phone.$touch"
                />
                <div v-if="v$.phone.$error">
                    <p v-for="error of v$.phone.$errors" :key="error.$uid" class="warning" >
                        <span> {{ error.$message }}</span></p>
                </div>
            </div>
            <div class="form-control">
                <label for="contact-email">Вашият e-mail</label>
                <input 
                    type="email" 
                    id="contact-email" 
                    name="contact-email" 
                    :class="{'border-red': v$.email.$error}"
                    v-model.trim="v$.email.$model" 
                    @blur="v$.email.$touch"
                />
                <div v-if="v$.email.$error">
                    <p v-for="error of v$.email.$errors" :key="error.$uid" class="warning" >
                        <span> {{ error.$message }}</span></p>
                </div>
            </div>
        </div>
        <div class="form-control">
            <label for="contact-text">Вашето запитване</label>
            <textarea 
                id="contact-text" 
                name="contact-text" 
                rows="4" 
                :class="{'border-red': v$.text.$error}"
                v-model.trim="v$.text.$model" 
                @blur="v$.text.$touch"
                >
            </textarea>
            <div v-if="v$.text.$error">
                <p v-for="error of v$.text.$errors" :key="error.$uid" class="warning" >
                    <span> {{ error.$message }}</span></p>
            </div>
        </div>
        <div class="form-control">
            <base-button #base-button class="button">Изпрати</base-button>
        </div>
    </form>
</template>

<script>
import { reactive } from 'vue';

// VUELIDATE
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, integer } from '@vuelidate/validators'

// COMPONENTS
import BaseButton from './UI/BaseButton.vue';

export default {
    components: {
        BaseButton,
    },
    setup() {
        const state = reactive({
            name: '',
            phone: '',
            email: '',
            text: '',
        })

        const rules = {
            name: {
                required: helpers.withMessage('Моля, въведете Вашите имена.', required),
                minLength: helpers.withMessage('Полето трябва да съдържа поне 5 символа.', minLength(5))
            },
            phone: {
                required: helpers.withMessage('Моля, въведете Вашият телефон.', required),
                integer: helpers.withMessage('Моля, въведете валиден телефонен номер.', integer),
                minLength: helpers.withMessage('Полето трябва да съдържа поне 10 символа.', minLength(10))
            },
            email: { 
                required: helpers.withMessage('Моля, въведете Вашият email.', required),
                email: helpers.withMessage('Моля, въведете валиден email!', email)
            },
            text: {
                required: helpers.withMessage('Моля, въведете Вашето запитване.', required),
                minLength: helpers.withMessage('Полето трябва да съдържа поне 10 символа.', minLength(10))
            }
        }

        const v$ = useVuelidate(rules, state)

        async function submitForm(data) {
            const isFormValid = await v$.value.$validate();
            if (isFormValid) {
                state.name='';
                state.phone='';
                state.email='';
                state.text='';
                v$.value.$reset();
                // TODO
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
@import '../assets/styles/mixins';

.flex {
    justify-content: space-around;

    @include responsive(medium-desktop) {
        flex-direction: column;
    }

    .form-control {
        position: relative;
        margin: 1rem 0;

        @media only screen and (min-width: 1224px) {
            flex-basis: 100%;

            input {
                width: 100%;
            }
        }

        label {
            position: absolute;
            z-index: 3;
            top: -14px;
            left: 10px;
            background: #fff;
            padding: 0 10px;
        }

        input,
        textarea {
            font-size: 0.9em;
            padding: 0.5rem;
            background: transparent;
            position: relative;
            z-index: 2;
        }

        input {
            display: inline-block;
            margin: 0;

            @include responsive(medium-desktop) {
                width: 100%;
            }

            @include responsive(landscape-tablets) {
                width: 100%;
            }

            &:focus ~ label {
                top: -20px;
                left: 10px;
                background: #fff;
                padding: 5px 10px;
            }
        }

        // REMOVE ARROWS ON INPUT TYPE NUMBER
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }

        &:first-child input {
            @media only screen and (min-width: 1224px) {
                margin-right: 1rem;
            }
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

    textarea {
        width: 100%;
    }
    button {
        padding: .5rem 1rem;
        margin-top: 1rem;
    }
}

</style>

