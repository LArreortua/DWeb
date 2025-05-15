const usuarioActivo = localStorage.getItem('usuarioActivo');
const tipoUsuario = localStorage.getItem('tipoUsuario');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

if (!usuarioActivo || tipoUsuario !== 'admin') {
    window.location.href = 'login.html';
  } else {
    document.getElementById('saludoAdmin').innerText = `Hola, ${usuarios[usuarioActivo].nombre}`;
    mostrarUsuariosFiltrados();
    mostrarEstadisticasDeProductos(); // ✅ ahora sí se ejecuta
  }
  

function mostrarUsuariosFiltrados() {
  const filtro = document.getElementById('filtroRol').value;
  const tbody = document.getElementById('tablaUsuarios');
  tbody.innerHTML = '';

  for (const usuario in usuarios) {
    const info = usuarios[usuario];
    const esAdmin = usuario === 'admin';
    const rol = esAdmin ? 'admin' : 'cliente';

    if (filtro !== 'todos' && filtro !== rol) continue;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario}</td>
      <td>${info.nombre}</td>
      <td>${info.fechaNacimiento}</td>
      <td>${info.correo}</td>
      <td>${rol.charAt(0).toUpperCase() + rol.slice(1)}</td>
      <td>
        ${usuario !== 'admin' ? `<button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario}')">Eliminar</button>` : 'No disponible'}
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function mostrarEstadisticasDeProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const conteo = {};
  
    carrito.forEach(id => {
      conteo[id] = (conteo[id] || 0) + 1;
    });
  
    const filtro = document.getElementById('filtroCategoria')?.value || 'todos';
    const tabla = document.getElementById('tablaProductos');
    const resumen = document.getElementById('productoMasAgregado');
    tabla.innerHTML = '';
  
    // Añadir campo 'veces' a cada producto
    const productosConConteo = productos.map(p => ({
      ...p,
      veces: conteo[p.id] || 0
    }));
  
    // Filtrado
    let productosFiltrados = productosConConteo;
  
    if (filtro === 'proteinas' || filtro === 'suplementos' || filtro === 'ansioliticos') {
      productosFiltrados = productosConConteo.filter(p => p.categoria === filtro);
    } else if (filtro === 'masAgregados') {
      productosFiltrados = [...productosConConteo].sort((a, b) => b.veces - a.veces);
    }
  
    // Mostrar en tabla
    let productoTop = null;
    let maxVeces = -1;
  
    productosFiltrados.forEach(prod => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${prod.nombre}</td>
        <td>${prod.categoria}</td>
        <td>$${prod.precio.toFixed(2)}</td>
        <td>${prod.veces}</td>
      `;
      tabla.appendChild(tr);
  
      if (prod.veces > maxVeces) {
        maxVeces = prod.veces;
        productoTop = prod.nombre;
      }
    });


  
    if (productoTop && maxVeces > 0) {
      resumen.innerText = ` Producto más agregado al carrito: "${productoTop}" (${maxVeces} veces)`;
    } else {
      resumen.innerText = `No hay productos agregados al carrito.`;
    }
  }
  


function eliminarUsuario(usuario) {
  if (!confirm(`¿Estás seguro de eliminar al usuario "${usuario}"?`)) return;

  delete usuarios[usuario];
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  mostrarUsuariosFiltrados();
}

function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  localStorage.removeItem('tipoUsuario');
  window.location.href = '../source/energizen.html';
}

function cambiarAVistaCliente() {
  localStorage.setItem('modoVista', 'cliente'); // cambia la vista
  window.location.href = '../source/energizen.html'; // redirige al catálogo
}
