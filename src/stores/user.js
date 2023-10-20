import { reactive } from 'vue';

// STORE
import { defineStore } from 'pinia'

// FIREBASE
import { firebaseApp } from '../firebase.js'
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedUser: {},
  }),
  getters: {
    getLoggedUser(state) {
        return state.loggedUser
    }
  },
  actions: {
    isLoggedUser(state) {
        const auth = getAuth();
        const user = auth.currentUser;
        let isLogged = false

        if(user) {
            state.loggedUser = {
                uid: user.uid,
                username: user.email,
                name: user.displayName,
                phone: user.phoneNumber
            }
            isLogged = true;
        }
        return isLogged;
    },
    async loginUser(user) {
        const state=this.$state;
        const auth = getAuth();
        let loggedIn = false;

        await signInWithEmailAndPassword(auth, user.username, user.password)
        .then((userCredential) => {
            state.loggedUser = {
                uid: userCredential.user.uid,
                username: userCredential.user.email,
                name: userCredential.user.displayName,
                phone: userCredential.user.phoneNumber
            }
            loggedIn = true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
        return loggedIn
    },
    logoutUser() {
        const auth = getAuth();
        let loggedIn = true;

        signOut(auth).then(() => {
            loggedIn = false;
        }).catch((error) => {
            console.log(error)
        });
        return loggedIn
    }
  }
})
