import { defineStore } from 'pinia'

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
      reservations: [],
      firebaseEndpoint: import.meta.env.VITE_FIREBASE_API_URL,
  }),
  getters: {
    // TODO
  },
  actions: {
    async addReservation(reservation) {
        const state=this.$state;
        let serverResponse = {'response': '', 'message': ''}

        await fetch(`${state.firebaseEndpoint}/reservations.json`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(reservation)
            }).then(response => {
            if(response.ok) {
                serverResponse.response = 'success'
                serverResponse.message = `Резервация #${reservation.id} беше направена успешно!`;
            } else {
                // throw new Error('Could not save data!')
                serverResponse.response = 'error'
                serverResponse.message = `Моля, опитайте пак по-късно!`;
            }
            })
            .catch((error) => {
            this.error = error.message;
                serverResponse.response = 'error'
                serverResponse.message = `Моля, опитайте пак по-късно!`;
        })
        return serverResponse;
    }
  }
})
