// /src/scripts/firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore, connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

console.log('firebase.js: Starting initialization');

const firebaseConfig = {
    apiKey: "AIzaSyB9R2AZnJiwmyv9t9qm9mx-CLj_5qC9ehA",
    authDomain: "blooddonation-639ce.firebaseapp.com",
    projectId: "blooddonation-639ce",
    storageBucket: "blooddonation-639ce.appspot.com",
    messagingSenderId: "89566068355",
    appId: "1:89566068355:web:ed5d6649cc641c6c71e5b6",
    measurementId: "G-EVWT8CKKDH"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (location.hostname === 'localhost') {
    console.log('Connecting to Firebase emulators on localhost');
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
}

console.log('firebase.js: Auth initialized:', auth);
console.log('firebase.js: Exporting auth and db');

export { auth, db };