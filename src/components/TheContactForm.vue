<template>
    <form @submit.prevent="submitForm">
        <div class="flex">
            <div class="form-control">
            <!-- <label for="firstName">Име:</label> -->
                <input 
                    placeholder="Вашите имена" 
                    type="text" 
                    id="name" 
                    name="name" 
                    :class="{'border-red': v$.name.$error}"
                    v-model.trim="v$.name.$model" 
                    @blur="v$.name.$touch"
                    />
                <div v-if="v$.name.$error">
                    <p v-for="error of v$.name.$errors" :key="error.$uid" class="warning" >
                        <span> {{ error.$message }}</span></p>
                </div>
            </div>
            <!-- <div class="form-control">
                <label for="lastName">Фамилия:</label> 
                <input placeholder="Вашата фамилия" type="text" id="lastName" name="lastName" required/>
            </div> -->
        </div>
        <div class="flex flex-column">
            <div class="form-control">
                <!-- <label for="phone">Телефон:</label> -->
                <input 
                    placeholder="Телефон" 
                    type="number" 
                    id="phone" 
                    name="phone" 
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
                <!-- <label for="email">E-mail:</label> -->
                <input 
                    placeholder="Вашият e-mail" 
                    type="email" 
                    id="email" 
                    name="email" 
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
            <!-- <label for="request">Вашето запитване</label> -->
            <textarea 
                placeholder="Вашето запитване" 
                id="text" 
                name="text" 
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
            },
            email: { 
                required: helpers.withMessage('Моля, въведете Вашият email.', required),
                email: helpers.withMessage('Моля, въведете валиден email!', email)
            },
            text: {
                required: helpers.withMessage('Моля, въведете Вашето запитване.', required),
                // minLength: helpers.withMessage('Полето трябва да съдържа поне 20 символа.', minLength(20))
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
        @media only screen and (min-width: 1224px) {
            flex-basis: 100%;

            input {
                width: 100%;
            }
        }
    }

    input,
    textarea {
        margin-top: 1rem;
        font-size: 0.9em;
        padding: 0.5rem;
    }

    input {
        display: inline-block;

        @include responsive(medium-desktop) {
            width: 100%;
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

    .form-control {
        input {
            @include responsive(landscape-tablets) {
                width: 100%;
            }
        }

        &:first-child input {
            @media only screen and (min-width: 1224px) {
                margin-right: 1rem;
            }
        }

        .border-red {
            border-bottom: 3px solid red;
        }
        p.warning > span {
            color: red;
            font-size: 1.2rem;
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

