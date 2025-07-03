const API_BASE_URL = "https://heliosback.onrender.com";
// const API_BASE_URL = "http://localhost:3000";

document.getElementById('crearCliente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const descripcion = document.getElementById('descripcion').value; // Este campo existe en el form
    const estado = document.getElementById('estado').value; 
    const clienteData = { 
        nombre, 
        cedula, 
        telefono, 
        direccion, 
        descripcionCaso: descripcion, // Mapeando descripcion del form a descripcionCaso
        estado, 
    };

    console.log("Datos del cliente a crear:", clienteData);

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Usuario no autenticado. Por favor, inicie sesión.');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/clientes`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // <<< ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ EXACTAMENTE ASÍ
            },
            body: JSON.stringify(clienteData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || `Error ${response.status} creando cliente`);
        }

        const data = await response.json();
        alert('Cliente creado: ' + (data.msg || JSON.stringify(data.cliente)));
        cargarUsuarios(); 
        limpiarFormulario();

    } catch (err) {
        console.error('Error creando cliente:', err);
        // El alert original estaba aquí, puedes decidir si mantenerlo o solo loguear.
        // alert(`Error creando cliente: ${err.message}`); 
    }
});

async function cargarUsuarios() {
    try {
        const token = localStorage.getItem('token');
// Log ADICIONAL para ver el token justo antes de la condición y el fetch
        console.log("Token recuperado para la solicitud en cargarUsuarios:", token);

        if (!token) {
            document.getElementById('tablaDatos').innerHTML = '<tr><td colspan="8">Por favor, inicie sesión para ver los clientes. (No token found)</td></tr>';
            console.warn('Usuario no autenticado intentando cargar clientes: No token found in localStorage.');
            return;
        }

        // Log ADICIONAL para ver las cabeceras que se van a enviar
        const headersParaFetch = { 'Authorization': `Bearer ${token}` };
        console.log("Cabeceras para fetch en cargarUsuarios:", headersParaFetch);

        const response = await fetch(`${API_BASE_URL}/clientes`, {
            headers: headersParaFetch
        });

        console.log("Respuesta del fetch en cargarUsuarios:", response);

        if (!response.ok) {
            const errorData = await response.json(); 
            console.error("Error data del backend en cargarUsuarios:", errorData); // Log del errorData
            throw new Error(errorData.msg || `Error ${response.status} cargando usuarios`);
        }

        const clientes = await response.json(); 
        const clientesList = document.getElementById('tablaDatos');
        
        console.log("Clientes recibidos:", clientes);

        if (Array.isArray(clientes) && clientes.length > 0) {
            clientesList.innerHTML = clientes.map(cliente => `
                <tr>
                    <td>${cliente.nombre || ''}</td>
                    <td>${cliente.cedula || ''}</td>
                    <td>${cliente.telefono || ''}</td>
                    <td>${cliente.direccion || ''}</td>
                    <td>${cliente.descripcionCaso || ''}</td> 
                    <td>${cliente.estado || ''}</td>
                    <td>
                        <button class="update" onclick="editarUsuario('${cliente._id}')">Editar</button>
                    </td>
                    <td>
                        <button class="delete" onclick="eliminarUsuario('${cliente._id}')">Eliminar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            clientesList.innerHTML = '<tr><td colspan="8">No hay clientes para mostrar.</td></tr>';
        }
    } catch (err) {
        console.error('Error cargando usuarios:', err);
        document.getElementById('tablaDatos').innerHTML = `<tr><td colspan="8">Error al cargar clientes: ${err.message}</td></tr>`;
    }
}

async function eliminarUsuario(id) {
    if (!confirm('¿Está seguro de que desea eliminar este cliente?')) {
        return;
    }
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Usuario no autenticado.');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Asegúrate que esta cabecera esté correcta
            }
        });

        if (!response.ok) {
            let errorMsg = `Error ${response.status} eliminando cliente`;
            if (response.headers.get("content-type")?.includes("application/json")) {
                const errorData = await response.json();
                errorMsg = errorData.msg || errorMsg;
            }
            throw new Error(errorMsg);
        }
        
        alert('Cliente eliminado exitosamente.');
        cargarUsuarios(); // Recargar la lista
    } catch (err) {
        console.error('Error eliminando cliente:', err);
        alert(`Error eliminando cliente: ${err.message}`);
    }
}

async function editarUsuario(id) {
    // NOTA: La ruta PUT /clientes/:id no existe en el backend/routes/clientes.js proporcionado.
    // Esta función fallará hasta que se implemente dicha ruta.
    // Los prompts son una mala UX, idealmente usar un modal/formulario.

    const nombre = prompt('Nuevo nombre (dejar en blanco para no cambiar):');
    // const cedula = prompt('Nueva cedula:'); // Cédula usualmente no se edita.
    const telefono = prompt('Nuevo telefono (dejar en blanco para no cambiar):');
    const direccion = prompt('Nueva direccion (dejar en blanco para no cambiar):');
    const descripcionCaso = prompt('Nueva descripcion del caso (dejar en blanco para no cambiar):');
    const estado = prompt('Nuevo estado (dejar en blanco para no cambiar):');

    const clienteActualizado = {};
    if (nombre) clienteActualizado.nombre = nombre;
    if (telefono) clienteActualizado.telefono = telefono;
    if (direccion) clienteActualizado.direccion = direccion;
    if (descripcionCaso) clienteActualizado.descripcionCaso = descripcionCaso;
    if (estado) clienteActualizado.estado = estado;

    if (Object.keys(clienteActualizado).length === 0) {
        alert("Actualización cancelada o no se proporcionaron nuevos datos.");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Usuario no autenticado.');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': token 
            },
            body: JSON.stringify(clienteActualizado),
        });

        if (!response.ok) {
            let errorMsg = `Error ${response.status} actualizando cliente`;
            if (response.headers.get("content-type")?.includes("application/json")) {
                const errorData = await response.json();
                errorMsg = errorData.msg || errorMsg;
            }
            throw new Error(errorMsg);
        }
        
        const data = await response.json(); // Asumiendo que la ruta PUT devuelve el cliente actualizado o un mensaje.
        alert('Cliente actualizado: ' + (data.msg || JSON.stringify(data.cliente)));
        cargarUsuarios();
    } catch (err) {
        console.error('Error actualizando cliente:', err);
        alert(`Error actualizando cliente: ${err.message}`);
    }   
}

function limpiarFormulario() {
    document.getElementById("crearCliente").reset();
} 

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
});