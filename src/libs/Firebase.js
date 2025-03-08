// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiPCNw2OOBRddDHbxTNLOqQivoefqSP4g",
  authDomain: "sibalog-f028d.firebaseapp.com",
  projectId: "sibalog-f028d",
  storageBucket: "sibalog-f028d.firebasestorage.app",
  messagingSenderId: "233378201046",
  appId: "1:233378201046:web:fe99fadafb28f87fd9f877",
  measurementId: "G-BPNHDY7V8R",
  databaseURL: "https://sibalog-f028d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);