/*============================
JSON userData
============================*/

let users = [];

async function loadUsers() {
    const stored = localStorage.getItem('users');

    if (stored) {
        users = JSON.parse(stored);
        return;
    }

    try {
        const response = await fetch('data/usersData.json');
        const data = await response.json();

        users = data.users;
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.log('Error cargando usuarios:', error);
        users = [];
    }
}

/*============================
Login tabs
============================*/

function showTab(event, tabId) {
    event.preventDefault();

    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => form.classList.remove('active'));

    const tabs = document.querySelectorAll('.login-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

/*============================
Login Feedback
============================*/

function showFieldError(errorId, message){
    const error = document.getElementById(errorId);
    error.textContent = message;
    error.classList.add('visible'); 
}

function clearFieldError(errorId){
    const error = document.getElementById(errorId);
    error.textContent = '';
    error.classList.remove('visible'); 
}

function showFeedback(elementId, message, type){
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.classList.remove('success', 'error');
    element.classList.add(type, 'visible');
}

function emailExists(email) {
    return users.some(function (user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

/*============================
Register Validation
============================*/

function validateNameField() {
    const name = document.getElementById('register-name').value.trim();

    if (name === '') {
        showFieldError('errorRegisterName', 'Nombre de usuario obligatorio');
        return false;
    }

    clearFieldError('errorRegisterName');
    return true;
}

function validateRegisterEmailField() {
    const email = document.getElementById('register-email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        showFieldError('errorRegisterEmail', 'Correo electrónico obligatorio');
        return false;
    }

    if (!emailPattern.test(email)) {
        showFieldError('errorRegisterEmail', 'Ingrese un correo electrónico válido');
        return false;
    }

    if (emailExists(email)) {
        showFieldError('errorRegisterEmail', 'Correo ya registrado');
        return false;
    }

    clearFieldError('errorRegisterEmail');
    return true;
}

function validateRegisterPasswordField() {
    const password = document.getElementById('register-password').value;

    if (password === '') {
        showFieldError('errorRegisterPassword', 'La contraseña es obligatoria');
        return false;
    }

    if (password.length < 4) {
        showFieldError('errorRegisterPassword', 'La contraseña debe tener al menos 4 caracteres');
        return false;
    }

    clearFieldError('errorRegisterPassword');
    return true;
}

function validateConfirmPasswordField() {
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;

    if (confirmPassword !== password) {
        showFieldError('errorRegisterConfirm', 'Las contraseñas deben coincidir');
        return false;
    }

    clearFieldError('errorRegisterConfirm');
    return true;
}

/*============================
Login Validation
============================*/

function validateLoginEmailField() {
    const email = document.getElementById('login-email').value.trim();

    if (email === '') {
        showFieldError('errorLoginEmail', 'Correo electrónico obligatorio');
        return false;
    }

    clearFieldError('errorLoginEmail');
    return true;
}

function validateLoginPasswordField() {
    const password = document.getElementById('login-password').value;

    if (password === '') {
        showFieldError('errorLoginPassword', 'La contraseña es obligatoria');
        return false;
    }

    clearFieldError('errorLoginPassword');
    return true;
}

/*============================
Start the session
============================*/

function startSession(user, remember) {
    //Solo usar la información necesaria para iniciar sesión, si se agarra todo
    //se pueden duplicar datos y errores de desincronización 
    const sessionData = JSON.stringify({ id: user.id, name: user.name, email: user.email });

    if (remember) {
        localStorage.setItem('currentUser', sessionData);
        sessionStorage.removeItem('currentUser');
    } else {
        sessionStorage.setItem('currentUser', sessionData);
        localStorage.removeItem('currentUser');
    }
}

/*============================
Register form
============================*/

function registerSubmit(event) {
    event.preventDefault();

    const isNameValid = validateNameField();
    const isEmailValid = validateRegisterEmailField();
    const isPasswordValid = validateRegisterPasswordField();
    const isConfirmValid = validateConfirmPasswordField();

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
        return;
    }

    const newUser = {
        id: crypto.randomUUID(),
        name: document.getElementById('register-name').value.trim(),
        email: document.getElementById('register-email').value.trim(),
        password: document.getElementById('register-password').value,
        category: 'student',
        status: 'active',
        registrationDate: new Date().toISOString(),
        courses: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showFeedback('registerFeedback', 'Cuenta creada exitosamente', 'success');

    setTimeout(() => {
        startSession(newUser, true);
        window.location.href = 'curso.html';
    }, 1200);
}

/*============================
Login form
============================*/

function loginSubmit(event) {
    event.preventDefault();

    const isEmailValid = validateLoginEmailField();
    const isPasswordValid = validateLoginPasswordField();

    if (!isEmailValid || !isPasswordValid) return;

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const remember = document.getElementById('login-remember').checked;

    const user = users.find(function (u) {
        return u.email.toLowerCase() === email.toLowerCase();
    });

    if (!user || user.password !== password) {
        showFeedback('loginFeedback', 'Correo o contraseña incorrectos', 'error');
        return;
    } else if (user.status === 'inactive') {
        showFeedback('loginFeedback', 'Cuenta inactiva, contacte con un administrador', 'error');
        return;
    } else {
        showFeedback('loginFeedback', `Bienvenido/a, ${user.name}`, 'success');
    }

    setTimeout(() => {
        startSession(user, remember);
        window.location.href = 'curso.html';
    }, 1200);
}

function initAuthForms() {
    document.getElementById('loginForm').addEventListener('submit', loginSubmit);
    document.getElementById('registerForm').addEventListener('submit', registerSubmit);

    document.getElementById('login-email').addEventListener('input', validateLoginEmailField);
    document.getElementById('login-password').addEventListener('input', validateLoginPasswordField);

    document.getElementById('register-name').addEventListener('input', validateNameField);
    document.getElementById('register-email').addEventListener('input', validateRegisterEmailField);

    document.getElementById('register-password').addEventListener('input', function () {
        validateRegisterPasswordField();
        if (document.getElementById('register-confirm').value !== '') {
            validateConfirmPasswordField();
        }
    });
    document.getElementById('register-confirm').addEventListener('input', validateConfirmPasswordField);    
}

async function init() {
    await loadUsers();
    initAuthForms();
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});

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

