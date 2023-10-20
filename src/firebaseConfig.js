// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaKyz3AWi6c3OqLswR-jTBQnqbePyAxjY",
  authDomain: "mycircles-1df63.firebaseapp.com",
  projectId: "mycircles-1df63",
  storageBucket: "mycircles-1df63.appspot.com",
  messagingSenderId: "134072115372",
  appId: "1:134072115372:web:10af42268c5abebb6cff09",
  measurementId: "G-BMPYNJQ14F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);