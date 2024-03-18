function logout() {
    fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = '../login/login.html';
            }
        });
}