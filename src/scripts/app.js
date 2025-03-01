import { onAuthStateChanged, initLogin, initSignUp, initLogout, initBloodRequest } from '../auth/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    // Handle auth state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadPage('dashboard'); // Default page for logged-in users
        } else {
            loadPage('login'); // Default page for logged-out users
        }
    });

    // Navigation event
    document.addEventListener('click', (e) => {
        const page = e.target.getAttribute('data-page');
        if (page) {
            e.preventDefault();
            loadPage(page);
        }
    });

    // Global load Page funcn
    window.loadPage = async function(page) {
        const response = await fetch(`/src/pages/${page}.html`);
        content.innerHTML = await response.text();
        
        // Initialize page - specific logic
        switch (page) {
            case 'login':
                initLogin();
                break;
            case 'signup':
                initSignUp();
                break;
            case 'requests':
                initBloodRequest();
                break;
            case 'logout':
                initLogout();
                break;
            case 'profile_basic':
                initProfileBasic(); 
                break;
            case 'profile_personal':
                initProfilePersonal(); 
                break;
            case 'dashboard':
                const userEmail = auth.currentUser?.email || 'User';
                document.getElementById('user-email').textContent = userEmail;
                break;
        }
    };
});