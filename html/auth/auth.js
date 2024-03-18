function isAuthenticated() {
    return !!localStorage.getItem('token');
}

if (!isAuthenticated()) {
    window.location.href = '../login/login.html';
}