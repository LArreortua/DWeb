
var productos = []

function cargarProductos() {
  return axios.post('http://localhost:5050/products/get-list', {})
    .then(response => {
      if (response.status === 200) {
        productos = response.data.product_list;
        localStorage.setItem('productos', JSON.stringify(productos));
        return productos; // <-- retorna los productos
      } else {
        msg.innerText = 'Error al cargar los productos';
        return []; // en caso de error
      }
    })
    .catch(error => {
      console.log('Error del servidor. Intenta más tarde.');
      return []; // también retorna vacío aquí
    });
}


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const ocultarTodo = () => {
  document.getElementById('items').style.display = 'none';
  document.getElementById('somos').style.display = 'none';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
};

const renderProductos = async (filtro) => {
  ocultarTodo();
  const contenedor = document.getElementById('items');
  const loader = document.getElementById('loader');
  loader.style.display = 'flex';

  contenedor.style.display = 'flex';
  contenedor.innerHTML = '';

  loader.style.display = 'block'; // ← muestra el loader

  document.getElementById('somos').style.display = filtro === 'somos' ? 'block' : 'none';
  if (filtro === 'somos') {
    loader.style.display = 'none'; // ← oculta si es sección "somos"
    return;
  }

  productos = await cargarProductos();
  const load_simulation = new Promise(resolve => setTimeout(resolve, 500));
  await Promise.all([productos, load_simulation]);
  loader.style.display = 'none'; // ← oculta el loader después de cargar

  const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.category === filtro);
  filtrados.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card col-sm-4 m-2 shadow'; // ← separación y sombra
    card.style.minWidth = '300px'; // opcional
    card.innerHTML = `
      <div class="card-body text-center">
        <img src="${p.imagen}" class="img-fluid mb-2" alt="${p.name}" onclick="mostrarDescripcion(${p.product_id})">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text">
          <strong>Precio EnergiZen:</strong> $${p.price}<br>
        </p>
        <p><strong>Inventario:</strong> ${p.inventory || 0}</p>
        <button class="btn btn-primary" onclick="agregarAlCarrito(${p.product_id})">Agregar</button>
        <button class="btn btn-secondary ml-2" onclick="toggleComparacionPrecios(${p.product_id})">Comparar Precios</button>
        <div id="comparacion-${p.product_id}" class="comparacion-precios" style="display:none; margin-top: 10px;">
          <p><strong>Comparación de Precios:</strong></p>
          <p><strong>Precio EnergiZen:</strong> $${p.price}</p>
        </div>
      </div>`;
    contenedor.appendChild(card);
  });
};


const toggleComparacionPrecios = (id) => {
  const comparacion = document.getElementById(`comparacion-${id}`);
  comparacion.style.display = comparacion.style.display === 'none' ? 'block' : 'none';
};

const agregarAlCarrito = (id) => {
  carrito.push(id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoIcono();
};

function actualizarCarritoIcono() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const icono = document.getElementById('carritoCantidad');
  if (icono) icono.innerText = carrito.length;
}


const filtrarProductos = (categoria) => {
  renderProductos(categoria);
};

window.onload = function () {
  // Mostrar botón admin si aplica
  const tipo = localStorage.getItem('tipoUsuario');
  if (tipo === 'admin') {
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) adminBtn.classList.remove('d-none');
  }

  // Cargar catálogo
  if (typeof renderProductos === 'function') {
    renderProductos('todos');
  }

  // Guardar productos en localStorage si aún no están
  if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  // Actualizar ícono del carrito
  actualizarCarritoIcono();

  // Activar buscador
  const buscadorInput = document.getElementById('buscador');
  if (buscadorInput) {
    buscadorInput.addEventListener('input', e => {
      const termino = e.target.value.trim();
      if (termino === '') {
        renderProductos('todos');
      } else {
        buscarProductos(termino);
      }
    });
  }
};

function mostrarComparador() {
  const sinDuplicados = [...new Set(productosSeleccionados)];
  const filas = sinDuplicados.map(id => {
    const p = productos.find(prod => prod.id === id);
    return `
      <tr>
        <td><img src="${p.imagen}" alt="${p.nombre}" style="width:80px;"></td>
        <td>${p.nombre}</td>
        <td>
          <strong>EnergiZen:</strong> $${p.precio.toFixed(2)}<br>
          <strong>${p.referencia.tienda}:</strong> $${p.referencia.precio.toFixed(2)}
        </td>
      </tr>`;
  }).join('');
  document.getElementById('comparador-body').innerHTML = filas;
  document.getElementById('comparadorModal').style.display = 'block';
}

function buscarProductos(termino) {
  ocultarTodo();
  const contenedor = document.getElementById('items');
  contenedor.style.display = 'flex';
  contenedor.innerHTML = '';
  const productos = JSON.parse(localStorage.getItem('productos'));

  const resultados = productos.filter(p => {
    return p.name.toLowerCase().includes(termino.toLowerCase());
  });

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="text-center w-100">No se encontraron productos.</p>';
    return;
  }

  resultados.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card col-sm-4';
    card.innerHTML = `
      <div class="card-body text-center">
        <img src="${p.imagen}" class="img-fluid mb-2" alt="${p.name}" onclick="mostrarDescripcion(${p.product_id})">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text">
          <strong>Precio EnergiZen:</strong> $${p.price}<br>
        </p>
        <p><strong>Inventario:</strong> ${p.inventory || 0}</p>
        <button class="btn btn-primary" onclick="agregarAlCarrito(${p.product_id})">Agregar</button>
        <button class="btn btn-secondary ml-2" onclick="toggleComparacionPrecios(${p.product_id})">Comparar Precios</button>
        <div id="comparacion-${p.product_id}" class="comparacion-precios" style="display:none; margin-top: 10px;">
          <p><strong>Comparación de Precios:</strong></p>
          <p><strong>Precio EnergiZen:</strong> $${p.price}</p>
        </div>
      </div>`;
    contenedor.appendChild(card);
  });
}

function mostrarDescripcion(id) {
  const producto = productos.find(p => p.id === id);
  const modalBody = document.getElementById('descripcionContenido');
  const modalTitle = document.getElementById('descripcionModalLabel');

  modalTitle.textContent = producto.nombre;
  modalBody.textContent = producto.descripcion;


  const modal = new bootstrap.Modal(document.getElementById('descripcionModal'));
  modal.show();
}