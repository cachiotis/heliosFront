const API_BASE_URL = "http://localhost:3000";

document.getElementById('ingreso_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_BASE_URL}/api/login`, { // Aquí usamos la URL base
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.token) {
            alert('Login exitoso');
            window.location.href = '/views/paginaUsuario.html';
            localStorage.setItem('token', data.token);
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Error al conectar con el servidor: ' + error.message);
    }
});