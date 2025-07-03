// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://heliosback.onrender.com";

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUser').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const res = await fetch(`${API_BASE_URL}/api/register`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        alert(data.message || data.error);
        window.location.href = '/views/login.html';
    } catch (error) {
        alert('Error al conectar con el servidor: ' + error.message);
    }
});