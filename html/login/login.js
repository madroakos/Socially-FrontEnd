document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const url = 'http://localhost:8080/api/auth/login';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    });

    fetch(url, { method: 'POST', headers, body })
        .then(response => response.ok ? response.json() : console.log("No user found"))
        .then(data => {
            if (data) {
                localStorage.setItem('token', data.token);
                window.location.href = '../front-page/frontPage.html';
            }
        });
});