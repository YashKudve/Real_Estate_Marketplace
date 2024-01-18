// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-8cdb0.firebaseapp.com",
    projectId: "mern-estate-8cdb0",
    storageBucket: "mern-estate-8cdb0.appspot.com",
    messagingSenderId: "603044902344",
    appId: "1:603044902344:web:b16f7f97bb1c98a254bcfd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);