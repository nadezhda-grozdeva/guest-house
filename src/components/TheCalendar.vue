<template>
    <div class="date-picker">
        <VueDatePicker
            no-today
            range
            auto-apply
            multi-calendars
            min-range="2"
            no-disabled-range
            :min-date="new Date()"
            :highlight-week-days="[0, 6]"
            ignore-time-validation
            :placeholder="calendarPlaceholder"
            :enable-time-picker="false"
            :preview-format="calendarPreviewDates"
            @update:model-value="handleDate"
            @closed="closedCalendar"
            :disabled-dates="disabledDates"
            :format="'dd/MM/yyyy'"
            />
    </div>
</template>

<script>
import { reactive, ref, computed } from 'vue';

import { useCalendarStore } from '../stores/calendar';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import '../assets/styles/calendar.css';

export default {
    components: { VueDatePicker },
    props: ['calendarPlaceholder'],
    emits: ['sendDataToResForm', 'invalidCalendar'],
    setup(props, {emit}) {
        const datesToBeDisabled = reactive([]);

        const datesRange = reactive([]);
        const calendarPreviewDates = ref('null');
        const invalidCalendarInput = ref(false)

        const calendarStore = useCalendarStore();
        const disabledDates = calendarStore.getDisabledDates;

        const invalidCountDatesSelected = ref(false);

        function formatDates(dataArray) {
            const newArray = [];

            for (let i = 0; i < dataArray.length; i++) {
                const day = dataArray[i].getDate();
                const month = dataArray[i].getMonth() + 1;
                const year = dataArray[i].getFullYear();

                newArray.push(`${year}-${month}-${day}`)
            }
            return newArray
        }

        function handleDate(modelData) {
            if (!modelData && modelData.length != 2 && !modelData[1]) {
                invalidCalendarInput.value = true;
                emit('invalidCalendar', invalidCalendarInput)
                return
            } else {
                datesToBeDisabled.splice(0);
                datesRange.splice(0);
                invalidCalendarInput.value = false;
                // Add check-in and check-out dates to the datesToBeDisabled
                const selectedRangeList = formatDates(modelData);
                selectedRangeList.forEach(element => {
                    datesToBeDisabled.push(element)
                });

                const startDate = modelData[0];
                const endDate = modelData[1];
                const currentDate = startDate;
                const dates = [];

                while (currentDate < endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                // Calculating count of accommodation night
                const datesRangeList = formatDates(dates);

                emit('sendDataToResForm', {datesToBeDisabled, datesRangeList})
                emit('invalidCalendar', invalidCalendarInput)
            }
        }

        function closedCalendar() {
            emit('invalidCalendar', invalidCalendarInput)
        }

        return {
            handleDate,
            datesToBeDisabled,
            disabledDates,
            datesRange,
            calendarPreviewDates,
            invalidCountDatesSelected,
            closedCalendar
            // datesRangeList
        }
    }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';

.date-picker {
    .validate {
        color: red;
        margin-top: .5rem;
    }
}
.flex {
    justify-content: space-between;
    
    p {
        font: 2rem $font-family-text;
        color: $base-text-color;
        margin: 2rem 0;

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

.border-red {
    border-bottom: 3px solid red;
}
</style>