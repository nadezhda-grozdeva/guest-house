import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_API_ENDPOINT,
    databaseURL: import.meta.env.VITE_FIREBASE_API_URL,
    projectId: 'borumovata-kushta'
}

const firebaseApp = initializeApp(firebaseConfig);

export {
    firebaseApp
}
