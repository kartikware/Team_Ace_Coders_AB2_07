// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// 🔹 Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    const authSection = document.getElementById("auth-section");
    const requestForm = document.getElementById("request-form");
    const userStatus = document.getElementById("user-status");
    const logoutBtn = document.getElementById("logout");

    if (user) {
        userStatus.textContent = `Logged in as: ${user.email}`;
        authSection.style.display = "none";
        requestForm.style.display = "block";
        logoutBtn.style.display = "block";
    } else {
        userStatus.textContent = "Please log in or sign up.";
        authSection.style.display = "block";
        requestForm.style.display = "none";
        logoutBtn.style.display = "none";
    }
});

// 🔹 Sign Up Function
window.signUp = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🔹 Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date()
        });

        console.log("User signed up and stored in Firestore:", user.email);
        alert("Signup successful!");
    } catch (error) {
        console.error("Signup error:", error.message);
        alert(error.message);
    }
};

// 🔹 Login Function
window.login = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCredential.user.email);
    } catch (error) {
        console.error("Login error:", error.message);
        alert(error.message);
    }
};

// 🔹 Logout Function
window.logout = async function () {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Logout error:", error.message);
        alert(error.message);
    }
};

// 🔹 Blood Request Submission
window.submitRequest = async function () {
    const bloodType = document.getElementById("blood-type").value;
    const hospital = document.getElementById("hospital").value;
    const user = auth.currentUser;

    if (!user) {
        alert("Please log in to submit a request");
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
    } catch (error) {
        console.error("Request error:", error.message);
        alert(error.message);
    }
};
