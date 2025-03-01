// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9R2AZnJiwmyv9t9qm9mx-CLj_5qC9ehA",
    authDomain: "blooddonation-639ce.firebaseapp.com",
    projectId: "blooddonation-639ce",
    storageBucket: "blooddonation-639ce.appspot.com",
    messagingSenderId: "89566068355",
    appId: "1:89566068355:web:ed5d6649cc641c6c71e5b6",
    measurementId: "G-EVWT8CKKDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances
export { app, auth, db };
