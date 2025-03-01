export function calculateAge() {
    let dob = document.getElementById("dob").value;
    if (dob) {
        let birthDate = new Date(dob);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        document.getElementById("age-text").innerText = "Your age - " + age;
    }
}

export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => console.log("Service Worker Registered!"))
            .catch((err) => console.error("Service Worker Error:", err));
    }
}

window.calculateAge = calculateAge; // Global- onchange