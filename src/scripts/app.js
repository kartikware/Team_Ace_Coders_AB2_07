// /src/scripts/app.js
import { auth } from '../scripts/firebase.js'; // Add this import
import { onAuthStateChanged, initLogin, initSignUp, initLogout, initBloodRequest } from '../auth/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    console.log('App.js loaded, DOM ready');

    // Handle auth state changes
    onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user ? user.email : 'No user');
        if (user) loadPage('dashboard');
        else loadPage('login');
    });

    // Navigation event listener
    document.addEventListener('click', (e) => {
        const page = e.target.getAttribute('data-page');
        if (page) {
            e.preventDefault();
            console.log('Clicked navigation link:', page);
            loadPage(page);
        }
    });

    // Global page loader
    window.loadPage = async function(page) {
        console.log('Attempting to load page:', page);
        try {
            const response = await fetch(`/src/pages/${page}.html`);
            if (!response.ok) throw new Error(`Failed to fetch ${page}.html: ${response.status}`);
            const html = await response.text();
            content.innerHTML = html;
            console.log('Page loaded:', page);
            switch (page) {
                case 'login': initLogin(); break;
                case 'signup': initSignUp(); break;
                case 'requests': initBloodRequest(); break;
                case 'logout': initLogout(); break;
                case 'profile_basic': initProfileBasic(); break;
                case 'profile_personal': initProfilePersonal(); break;
                case 'dashboard':
                    const userEmail = auth.currentUser?.email || 'User';
                    if (document.getElementById('user-email')) {
                        document.getElementById('user-email').textContent = userEmail;
                    }
                    break;
            }
        } catch (error) {
            console.error('Load page error:', error);
            content.innerHTML = `<p>Error loading page: ${error.message}</p>`;
        }
    };
});