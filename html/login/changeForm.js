const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const changeFormButton = document.getElementById('changeFormButton');
const submitButton = document.getElementById('submitButton');

const emailInput = document.createElement('input');
const emailLabel = document.createElement('label');
const passwordAgainInput = document.createElement('input');
const passwordAgainLabel = document.createElement('label');
emailInput.id = 'email';
emailLabel.textContent = 'Email';
emailInput.setAttribute('for', 'email');
emailInput.setAttribute('type', 'email');
emailInput.setAttribute('name', 'email');
emailInput.required = true;

passwordAgainInput.id = 'passwordAgain';
passwordAgainLabel.textContent = 'Password Again';
passwordAgainInput.setAttribute('for', 'passwordAgain');
passwordAgainInput.setAttribute('type', 'password');
passwordAgainInput.setAttribute('name', 'passwordAgain');
passwordAgainInput.required = true;

submitButton.addEventListener('click', () => {
    if (submitButton.value === 'Login') {
        login();
    } else {
        register();
    }
});

function changeFormToRegister() {
    usernameInput.insertAdjacentElement('afterend', emailInput);
    usernameInput.insertAdjacentElement('afterend', emailLabel);
    passwordInput.insertAdjacentElement('afterend', passwordAgainInput);
    passwordInput.insertAdjacentElement('afterend', passwordAgainLabel);
    changeFormButton.value = 'Login';
    changeFormButton.setAttribute('onclick', 'changeFormToLogin()');
    submitButton.value = 'Sign Up';
}

function changeFormToLogin() {
    emailInput.remove();
    emailLabel.remove();
    passwordAgainInput.remove();
    passwordAgainLabel.remove();
    changeFormButton.value = 'Sign Up';
    changeFormButton.setAttribute('onclick', 'changeFormToRegister()');
    submitButton.value = 'Login';
}


function login() {
    if (!usernameInput.value || !passwordInput.value) {
        return;
    }

    const url = 'http://localhost:8080/api/auth/login';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
    });
    fetch(url, {method: 'POST', headers, body})
        .then(response => response.ok ? response.json() : console.log("No user found"))
        .then(data => {
            if (data) {
                localStorage.setItem('token', data.token);
                window.location.href = '../front-page/frontPage.html';
            }
        });
}

function register() {
    const url = 'http://localhost:8080/api/auth/register';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    });

    if (!usernameInput || !passwordInput || !emailInput || !passwordAgainInput) {
        return;
    }

    fetch(url, { method: 'POST', headers, body })
        .then(response => response.ok ? response.json() : console.log("Could not register user"))
        .then(data => {
            if (data) {
                console.log(data.token);
                localStorage.setItem('token', data.token);
                window.location.href = '../front-page/frontPage.html';
            }
        });
}