const cliente = require("../../backend/models/cliente");

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
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    const data = await response.json();
    alert('Usuario creado: ' + JSON.stringify(data));
    cargarUsuarios();
    } catch (err) {
        console.error('Error creando usuario:', err);
    }
    limpiarFormulario()
});

async function cargarUsuarios() {
    try {
    const response = await fetch(`${API_BASE_URL}/usuarios`);
    const usuarios = await response.json();
    const usuariosList = document.getElementById('tablaDatos');
    usuariosList.innerHTML = usuarios.map(usuario => `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.cedula}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.descripcion}</td>
            <td>${cliente.estado}</td>
            <td>
                <button class="update" onclick="editarUsuario('${usuario._id}')">Editar</button>
            </td>
            <td>
                <button class="delete" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
    } catch (err) {
        console.error('Error cargando usuarios:', err);
    }
}

async function eliminarUsuario(id) {
    try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
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
    const edad = prompt('Nueva edad:');
    const email = prompt('Nuevo email:');
    const tipoDoc = prompt('Nuevo tipo de Documento:');
    const documento = prompt('Nuevo numero de Documento:');
    const direccion = prompt('Nueva direccion:');
    const tel = prompt('Nuevo telefono:');

    if (nombre && edad && tipoDoc && documento && email && direccion && tel && email) {
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
  document.getElementById("form-usuario").reset();
}
  
  // Cargar usuarios al iniciar
  cargarUsuarios();