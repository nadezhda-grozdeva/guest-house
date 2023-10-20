import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
    state: () => ({
        messages: [],
        firebaseEndpoint: import.meta.env.VITE_FIREBASE_API_URL,

    }),
    getters: {
        getMessages(state) {
            fetch(`${state.firebaseEndpoint}/messages.json`)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
            })
            .then((data) => {
                console.log(data)
              for (const id in data) {
                const items = data[id];
                items.forEach(item => {
                  this.messages.push(item)
                })
              }
            })
            .catch((err) => {
              // console.log(err)
            })
            return state.messages
        }
    },
    actions: {
        async addMessage(msg) {
            const state=this.$state;
            let serverResponse = {'response': '', 'message': ''}
    
            await fetch(`${state.firebaseEndpoint}/messages.json`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(msg)
            })
            .then(response => {
              if(response.ok) {
                  console.log('OK')
                  serverResponse.response = 'success'
                  serverResponse.message = `Съобщението е изпратено успешно!`;
              } else {
                  // throw new Error('Could not save data!')
                  serverResponse.response = 'error'
                  serverResponse.message = `Моля, опитайте пак по-късно!`;
              }
            })
            .catch((error) => {
                // this.error = error.message;
                serverResponse.response = 'error'
                serverResponse.message = `Моля, опитайте пак по-късно!`;
            })
            return serverResponse
        }       
    }
})
