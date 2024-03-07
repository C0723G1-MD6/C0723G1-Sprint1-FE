// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "api-firebase-c0723g1.firebaseapp.com",
    projectId: "api-firebase-c0723g1",
    storageBucket: "api-firebase-c0723g1.appspot.com",
    messagingSenderId: "252679626781",
    appId: "1:252679626781:web:1870a38deef7a4c640a6f4",
    measurementId: "G-NFESHS6TDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
