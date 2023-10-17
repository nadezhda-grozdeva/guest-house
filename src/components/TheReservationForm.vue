<template>
    <div class="wrapper text-center" >
        <img class="wrapper-bg" src="../assets/images/appointments-bg.jpg" alt="Борумовата къща" />
        <base-card class="wrapper-app">
            <base-subheading #subheading class="text-center">Резервирай сега</base-subheading>
            <div class="app-form text-left">
                <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label for="name">Име:</label>
                        <input 
                            :class="{'border-red': v$.name.$error}"
                            type="text" 
                            id="name" 
                            name="name" 
                            v-model.trim="v$.name.$model" 
                            @blur="v$.name.$touch"/>
                        <div v-if="v$.name.$error">
                            <p v-for="error of v$.name.$errors" :key="error.$uid" class="warning" >
                                <span> {{ error.$message }}</span></p>
                        </div>
                    </div>
                    <div class="form-control">
                        <label for="phone">Телефон:</label>
                        <input 
                            :class="{'border-red': v$.phone.$error}" 
                            type="number"
                            id="phone"  
                            name="phone"
                            v-model.trim="v$.phone.$model" 
                            @blur="v$.phone.$touch"/>
                        <div v-if="v$.phone.$error">
                            <p v-for="error of v$.phone.$errors" :key="error.$uid" class="warning" >
                                <span>{{ error.$message }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="form-control">
                        <label for="email">E-mail:</label>
                        <input 
                            :class="{'border-red': v$.email.$error}" 
                            type="email" 
                            id="email" 
                            name="email" 
                            v-model.trim="v$.email.$model" 
                            @blur="v$.email.$touch"/>
                        <div v-if="v$.email.$error">
                            <p v-for="error of v$.email.$errors" :key="error.$uid" class="warning" >
                                <span>{{ error.$message }}</span>
                            </p>
                        </div>
                    </div>
                    <the-calendar 
                        :class="{'border-red': invalidCalendarInput}"  
                        :calendarPlaceholder="calendarPlaceholder"
                        @sendDataToResForm="dataFromCalendar" 
                        @invalidCalendar="invalidCalendar" 
                    ></the-calendar>
                    <div v-if="invalidCalendarInput">
                        <p class="warning" >
                            <span>Моля, изберете дата на настаняване и дата на напускане!</span>
                        </p>
                    </div>
                    <div class="flex">
                        <p>Брой нощувки: {{ datesRange.length }}</p>
                        <p>Общо лева: <span>{{ totalPrice }}*</span></p>
                    </div>
                    <p class="text-small">*Цена за нощувка - 490лв. при минимална заетост 2 нощувки</p>
                    <div class="form-control">
                        <base-button #base-button class="button">Резервирай</base-button>
                    </div>
                </form>
            </div>
        </base-card>
    </div>
</template>

<script>
import { ref, reactive, computed, nextTick } from 'vue';

//CALENDAR STORE
import { useCalendarStore } from '../stores/calendar';

//VUELIDATE
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, integer } from '@vuelidate/validators'

//COMPONENTS
import TheCalendar from '@/components/TheCalendar.vue';
import BaseButton from './UI/BaseButton.vue';
import BaseSubheading from '@/components/UI/BaseSubheading.vue';
import BaseCard from './UI/BaseCard.vue';

export default {
    components: {
        TheCalendar,
        BaseButton,
        BaseSubheading,
        BaseCard,
    },
    setup() {
        const datesToBeDisabled = reactive([]);
        const datesRange = reactive([]);
        const invalidCalendarInput = ref(false);
        const calendarPlaceholderDefault = ref('Настаняване - Напускане');
        let calendarPlaceholder = ref('');
        calendarPlaceholder.value = calendarPlaceholderDefault.value

        const pricePerNight = ref(490);


        const calendarStore = useCalendarStore();

        const state = reactive({
            name: '',
            phone: '',
            email: ''
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
            }
        }

        const v$ = useVuelidate(rules, state)

        async function submitForm() {
            const isFormValid = await v$.value.$validate()
            if(!datesRange || datesRange.length === 0) {
                invalidCalendarInput.value = true
            } else {
                invalidCalendarInput.value = false
            }

            if (isFormValid && !invalidCalendarInput.value) {
                calendarStore.addDisabledDates(datesToBeDisabled)
                // RESET FORM
                state.name='';
                state.phone='';
                state.email='';
                v$.value.$reset();
                calendarPlaceholder.value = calendarPlaceholderDefault.value;
            }
        }

        function dataFromCalendar(data) {
            const datesRangeList = data.datesRangeList;
            const datesToBeDisabledList = data.datesToBeDisabled;

            // ADD CHECK-IN AND CHECK-OUT DATES
            datesToBeDisabledList.forEach(element => {
                datesToBeDisabled.push(element)
            });

            //SET CALENDAR PLACEHOLDER WITH CHECK-IN AND CHECK-OUT DATES
            calendarPlaceholder.value = `${datesToBeDisabled[0].toString().split("-").reverse().join("-")} - ${datesToBeDisabled[1].toString().split("-").reverse().join("-")}`


            // ADD DATES RANGE BETWEEN CHECK-IN AND CHECK-OUT DATES
            datesRangeList.forEach(element => {
                datesRange.push(element)
                const elIndex = datesToBeDisabled.indexOf(element)
                if (elIndex < 0) {
                    datesToBeDisabled.push(element)
                }
            });
        }

        function invalidCalendar(isValid) {
            invalidCalendarInput.value = isValid.value
        }

        const totalPrice = computed(function() {
            return datesRange.length * pricePerNight.value
        })

        return {
            state, v$,
            submitForm,
            dataFromCalendar,
            totalPrice,
            datesRange,
            invalidCalendar,
            invalidCalendarInput,
            calendarPlaceholder
        }
    }

}
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.wrapper {
    position: relative;

    @media only screen and (min-width: 768px) {
        padding: 4rem 1rem;
    }

    @include responsive(portrait-tablets) {
        padding: 4rem 0;
    }

    &-bg {
        @include blured-img-bg(5px);
    }

    &-app {
        margin: 0 auto;
        border: 3px solid #000;
        background-color: rgba(255,255,255, 0.7);
        padding: 2rem 0 3rem;

        @media only screen and (min-width: 1224px) {
            width: 80%;
        }

        @media only screen and (min-width: 600px) and (max-width: 1224px) {
            width: 90%;
        }

        @include responsive(phone) {
            width: 90%;
        }

        .app-form {
            font: 2rem $font-family-text;
            color: $base-text-color;
            margin: 3rem auto;

            @media only screen and (min-width: 993px) {
                width: 60%;
            }

            @media only screen and (min-width: 768px) and (max-width: 992px) {
                width: 80%;
            }

            @include responsive(portrait-tablets) {
                width: 90%;
            }

            input {
                display: block;
                width: 100%;
                font: inherit;
                margin: 0.5rem 0;
            }

            select {
            width: auto;
            }

            input[type='checkbox'],
            input[type='radio'] {
            display: inline-block;
            width: auto;
            margin-right: 1rem;
            }

            input[type='checkbox'] + label,
            input[type='radio'] + label {
            font-weight: normal;
            }

            label {
                margin-top: 1 rem;
            }

            .border-red {
                border-bottom: 3px solid red;
            }
            p.warning > span {
                color: red;
                font-size: 1.2rem;
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

            .flex {
                justify-content: space-between;

                @include responsive(phone) {
                    flex-direction: column;
                }

                p {
                    font: 2rem $font-family-text;
                    color: $base-text-color;

                    @media only screen and (min-width: 601px) {
                        margin: 2rem 0;
                    }

                    @include responsive(portrait-tablets) {
                        margin-top: 1rem;
                    }

                    span {
                        font-weight: 700;
                        letter-spacing: 7px;
                    }
                }
            }
            .text-small {
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
        }
    }
}

.border-red {
    border-bottom: 3px solid red;
}


</style>