// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBECEbFg7w__yhMoFe6vbZRZC6d7Ld-R-E",
    authDomain: "hangsy-42e7b.firebaseapp.com",
    databaseURL: "https://hangsy-42e7b-default-rtdb.firebaseio.com",
    projectId: "hangsy-42e7b",
    storageBucket: "hangsy-42e7b.firebasestorage.app",
    messagingSenderId: "153507905490",
    appId: "1:153507905490:web:29af0c58f588e065e9920b",
    measurementId: "G-LQB1WYQL6V"
  };

  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);
