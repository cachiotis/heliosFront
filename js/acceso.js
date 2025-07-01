// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://heliosback.onrender.com";


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
            localStorage.setItem('token', data.token); // Guardar el token PRIMERO
            console.log('Token guardado en localStorage:', data.token); // DEBUG: Mostrar el token que se guarda
            alert('Login exitoso');
            window.location.href = '/views/usuario.html'; // LUEGO redirigir
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Error al conectar con el servidor: ' + error.message);
    }
});