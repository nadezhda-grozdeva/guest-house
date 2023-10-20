import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
      disabledDates: [],
      firebaseEndpoint: import.meta.env.VITE_FIREBASE_API_URL,
  }),
  getters: {
    getDisabledDates(state) {
      fetch(`${state.firebaseEndpoint}/disabledDays.json`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        for (const id in data) {
          const items = data[id];
          items.forEach(item => {
            this.disabledDates.push(item)
          })
        }
      })
      .catch((err) => {
        // console.log(err)
      })

      return state.disabledDates
    }
  },
  actions: {
    addDisabledDates(dates) {
      const state = this.$state;

      fetch(`${state.firebaseEndpoint}/disabledDays.json`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(dates)
      }).then(response => {
        if(response.ok) {
          // do something...
        } else {
          throw new Error('Could not save data!')
        }
      })
      .catch((error) => {
        console.log(error)
        this.error = error.message;
      })

      dates.forEach(el => {
        this.disabledDates.push(el)
      });
    }
  }
})
