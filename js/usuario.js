// const cliente = require("../../backend/models/cliente");

const API_BASE_URL = "https://heliosback.onrender.com";

document.getElementById('crearCliente').addEventListener('submit', async (e) => {
    e.preventDefault();

const nombre = document.getElementById('nombre').value;
const cedula = document.getElementById('cedula').value;
const telefono = document.getElementById('telefono').value;
const direccion = document.getElementById('direccion').value;
const descripcion = document.getElementById('descripcion').value;
const estado = document.getElementById('estado').value;

const cliente = { nombre, cedula, telefono, direccion, descripcion, estado };

console.log(cliente);

try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
    const data = await response.json();
    alert('Cliente creado: ' + JSON.stringify(data));
    cargarUsuarios();
    } catch (err) {
        console.error('Error creando cliente:', err);
    }
    limpiarFormulario()
});

async function cargarUsuarios() {
    try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    const clientes = await response.json();
    const clientesList = document.getElementById('tablaDatos');
    clientesList.innerHTML = clientes.map(usuario => `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.cedula}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.descripcion}</td>
            <td>${cliente.estado}</td>
            <td>
                <button class="update" onclick="editarUsuario('${cliente._id}')">Editar</button>
            </td>
            <td>
                <button class="delete" onclick="eliminarUsuario('${cliente._id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
    } catch (err) {
        console.log('Error cargando usuarios:', err);
    }
}

async function eliminarUsuario(id) {
    try {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: 'DELETE',
        });
        const data = await response.json();
        alert('Cliente eliminado: ' + JSON.stringify(data));
        cargarUsuarios();
    } catch (err) {
        console.error('Error eliminando cliente:', err);
    }
}

async function editarUsuario(id) {
    const nombre = prompt('Nuevo nombre:');
    const cedula = prompt('Nueva cedula:');
    const telefono = prompt('Nuevo telefono:');
    const direccion = prompt('Nueva direccion:');
    const descripcion = prompt('Nueva descripcion:');
    const estado = prompt('Nuevo estado:');

    if (nombre && cedula && telefono && direccion && descripcion && estado) {
        try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, edad, email }),
            });
        const data = await response.json();
        alert('Usuario actualizado: ' + JSON.stringify(data));
        cargarUsuarios();
        } catch (err) {
            console.error('Error actualizando usuario:', err);
        }   
    }
}

function limpiarFormulario() {
    document.getElementById("crearCliente").reset();
} 
  // Cargar usuarios al iniciar
cargarUsuarios();