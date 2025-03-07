// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAWetHmAfjJwO-kRNrETFVaWVXDI3Jr0z4",
  authDomain: "sibalog-81b04.firebaseapp.com",
  databaseURL: "https://sibalog-81b04-default-rtdb.firebaseio.com",
  projectId: "sibalog-81b04",
  storageBucket: "sibalog-81b04.firebasestorage.app",
  messagingSenderId: "487220767823",
  appId: "1:487220767823:web:831008bf5364886971ce3a",
  measurementId: "G-D2FGHR96J0",
  databaseURL: "https://sibalog-81b04-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);