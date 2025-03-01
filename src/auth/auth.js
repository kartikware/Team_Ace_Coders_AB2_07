// /src/auth/auth.js
// @ts-nocheck
import { auth, db } from '../scripts/firebase.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

// Exported functions for SPA page initialization
export function initLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in:", auth.currentUser.email);
            loadPage('profile_basic'); // Redirect to profile setup
        } catch (error) {
            console.error("Login error:", error.message);
            alert(error.message);
        }
    });
}

export function initSignUp() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date()
            });

            console.log("User signed up and stored in Firestore:", user.email);
            alert("Signup successful!");
            loadPage('profile_basic');
        } catch (error) {
            console.error("Signup error:", error.message);
            alert(error.message);
        }
    });
}

export function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            console.log("User logged out");
            loadPage('login');
        } catch (error) {
            console.error("Logout error:", error.message);
            alert(error.message);
        }
    });
}

export function initBloodRequest() {
    const form = document.getElementById('request-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bloodType = form.querySelector('#blood-type').value;
        const hospital = form.querySelector('#hospital').value;
        const user = auth.currentUser;

        if (!user) {
            alert("Please log in to submit a request");
            loadPage('login');
            return;
        }

        if (!bloodType || !hospital) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await addDoc(collection(db, "requests"), {
                userId: user.uid,
                email: user.email,
                bloodType: bloodType,
                hospital: hospital,
                timestamp: new Date()
            });

            console.log("Blood request submitted");
            alert("Blood request submitted successfully!");
            loadPage('dashboard'); // Redirect after submission
        } catch (error) {
            console.error("Request error:", error.message);
            alert(error.message);
        }
    });
}

// Export auth state listener for app.js to handle navigation
export { onAuthStateChanged };