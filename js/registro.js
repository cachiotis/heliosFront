// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://heliosback.onrender.com";

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUser').value;
    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerUsername').value;

    try {
        const res = await fetch(`${API_BASE_URL}/api/register`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, name })
        });
        const data = await res.json();
        alert(data.message || data.error);
    } catch (error) {
        alert('Error al conectar con el servidor: ' + error.message);
    }
});