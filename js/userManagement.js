/*============================
Get current User
============================*/

function getCurrentUserSession() {
    const fromLocal = localStorage.getItem('currentUser');
    const fromSession = sessionStorage.getItem('currentUser');

    const current = fromLocal || fromSession;
    if (!current) return null;
    return JSON.parse(current);
}

function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

const btnLogout = document.getElementById('btn-logout');

if (btnLogout) {
    btnLogout.addEventListener('click', logout);
}