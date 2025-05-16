const productos = [
  { id: 1, nombre: 'Proteína Zen', precio: 380.00, categoria: 'proteinas', imagen: "../recursos/ProteinaZen.png",inventario: 12,  descripcion: "Energía y bienestar en cada porción. Proteína vegetal equilibrada que nutre tu cuerpo y mente, ideal para mantenerte activo sin perder la calma.", referencia: { tienda: "Amazon", precio: 400.00 } },
  { id: 2, nombre: 'Vitaminas B-Plus', precio: 100.00, categoria: 'suplementos', imagen: "../recursos/VitaminaB.png",inventario: 12,  descripcion: "Complejo de vitaminas del grupo B que apoya el metabolismo energético, la función cerebral y la salud del sistema nervioso. Ideal para mantenerte activo y enfocado.", referencia: { tienda: "Farmacias Similares", precio: 120.00 } },
  { id: 3, nombre: 'Omega 3 Pure', precio: 90.00, categoria: 'suplementos', imagen: "../recursos/Omega3.png",inventario: 12,  descripcion: "Concentrado de ácidos grasos esenciales extraído de fuentes puras y sostenibles. Contribuye al buen funcionamiento del corazón, el cerebro y las articulaciones.", referencia: { tienda: "MercadoLibre", precio: 95.00 } },
  { id: 4, nombre: 'CalmaZen', precio: 150.00, categoria: 'ansioliticos', imagen: "../recursos/CalmaZen.png",inventario: 12,  descripcion: "Combinación de extractos naturales que promueven la relajación mental y el equilibrio emocional. Perfecto para quienes buscan serenidad en su rutina diaria.", referencia: { tienda: "Farmacias Similares", precio: 170.00 } },
  { id: 5, nombre: 'Proteína Herbal', precio: 456.00, categoria: 'proteinas', imagen: "../recursos/ProteinaHerbal.png",inventario: 12,  descripcion: "Nutrición vegetal para tu día a día. Fuente de proteína 100% herbal que apoya el desarrollo muscular y la energía diaria.", referencia: { tienda: "Amazon", precio: 470.00 } },
  { id: 6, nombre: 'Tranquilizante Natural', precio: 78.00, categoria: 'ansioliticos', imagen: "../recursos/Tranquilizante.png", inventario: 12, descripcion: "Relájate de forma natural. Este suplemento a base de hierbas te ayuda a reducir el estrés y mejorar el sueño, sin causar dependencia.", referencia: { tienda: "Farmacias Similares", precio: 90.00 } },
  { id: 7, nombre: 'Proteina vegana de chicharo', precio: 305.00, categoria: 'proteinas', imagen: "../recursos/prochicharo.png",inventario: 12,  descripcion: "Proteína Vegana | Chícharo | Sin azúcar | Libre de gluten | Libre de lácteos | Libre de soya | 1Kg.", referencia: { tienda: "MercadoLibre", precio: 320.00 } },
  { id: 8, nombre: 'Omegas veganos', precio: 366.00, categoria: 'suplementos', imagen: "../recursos/omegas.png",inventario: 12,  descripcion: "Omegas Veganos | Vegan - con Omega 3, 6 y 9, Hierro, Vitamina K2 y B12 | Alimentación Vegana y Vegetariana.", referencia: { tienda: "Amazon", precio: 390.00 } },
  { id: 9, nombre: 'Proteína Birdman Fitmingo', precio: 508.00, categoria: 'proteinas', imagen: "../recursos/birdman.png",inventario: 12,  descripcion: "Birdman Fitmingo Proteína Vegana Suplemento Alimenticio a Base de Proteína Vegetal Sabor Moka 510 g.", referencia: { tienda: "Amazon", precio: 520.00 } },
  { id: 10, nombre: 'Fenogreco ', precio: 259.00, categoria: 'suplementos', imagen: "../recursos/feno.png", inventario: 12, descripcion: "Beyond Vitamins | Fenogreco 1000mg reforzado con Calcio y Hierro | Vegano y sin rellenos | 60 cápsulas.", referencia: { tienda: "Farmacias Similares", precio: 265.00 } },
  { id: 11, nombre: 'CHILL', precio: 549.00, categoria: 'ansioliticos', imagen: "../recursos/chill.png", inventario: 12, descripcion: "CHILL - Nootrópico 100% Natural - Ayuda a reducir la ansiedad - GABA, Melisa, Pasiflora, L-Teanina, Vitaminas B1, B3 y B6.", referencia: { tienda: "Amazon", precio: 560.00 } },
  { id: 12, nombre: 'Proteina de Soya', precio: 299.00, categoria: 'proteinas', imagen: "../recursos/prosoy.png",inventario: 12,  descripcion: "Proteína de soya, Calidad Premium 1 kg Sabor Natural.", referencia: { tienda: "MercadoLibre", precio: 310.00 } },
  { id: 13, nombre: 'Agariana', precio: 275.00, categoria: 'ansioliticos', imagen: "../recursos/agariana.png",inventario: 12,  descripcion: "Greenside Agariana Estrés, Nerviosismo, Falta de Sueño - 60 cápsulas.", referencia: { tienda: "Farmacias Similares", precio: 285.00 } },
  { id: 14, nombre: 'OBY NAD +', precio: 419.00, categoria: 'suplementos', imagen: "../recursos/oby.png", inventario: 12, descripcion: "Ácido Alfa Lipoico, Betaina, Quercetina, Piperina, Uva, Arándano | Precursor NAD Infinity 100% Vegano (30 Cápsulas).", referencia: { tienda: "Amazon", precio: 430.00 } },
  { id: 15, nombre: 'CALM DOWN Platinum', precio: 599.00, categoria: 'ansioliticos', imagen: "../recursos/calm.png",inventario: 12,  descripcion: "Calm Down Platinum | Suplemento Avanzado de Soporte Natural | Con GABA, 5HTP, Valeriana, Bacopa, Camomila y más.", referencia: { tienda: "MercadoLibre", precio: 620.00 } }
];


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const ocultarTodo = () => {
  document.getElementById('items').style.display = 'none';
  document.getElementById('somos').style.display = 'none';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
};

const renderProductos = (filtro) => {
  ocultarTodo();
  const contenedor = document.getElementById('items');
  contenedor.style.display = 'flex';
  contenedor.innerHTML = '';
  document.getElementById('somos').style.display = filtro === 'somos' ? 'block' : 'none';
  if (filtro === 'somos') return;

  const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);
  filtrados.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card col-sm-4';
    card.innerHTML = `
      <div class="card-body text-center">
        <img src="${p.imagen}" class="img-fluid mb-2" alt="${p.nombre}" onclick="mostrarDescripcion(${p.id})">

        <h5 class="card-title">${p.nombre}</h5>
        <p class="card-text">
          <strong>Precio EnergiZen:</strong> $${p.precio}<br>
        </p>
        <p><strong>Inventario:</strong> ${p.inventario}</p>
        <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar</button>
        <button class="btn btn-secondary ml-2" onclick="toggleComparacionPrecios(${p.id})">Comparar Precios</button>
        <div id="comparacion-${p.id}" class="comparacion-precios" style="display:none; margin-top: 10px;">
          <p><strong>Comparación de Precios:</strong></p>
          <p><strong>Precio EnergiZen:</strong> $${p.precio}</p>
          <p><strong>${p.referencia.tienda}:</strong> $${p.referencia.precio}</p>
          <p><strong>Diferencia:</strong> $${(p.referencia.precio - p.precio).toFixed(2)}</p>
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

  const resultados = productos.filter(p => 
    p.nombre.toLowerCase().includes(termino.toLowerCase())
  );

  if (resultados.length === 0) {
    contenedor.innerHTML = '<p class="text-center w-100">No se encontraron productos.</p>';
    return;
  }

  resultados.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card col-sm-4';
    card.innerHTML = `
      <div class="card-body text-center">
        <img src="${p.imagen}" class="img-fluid mb-2" alt="${p.nombre}" onclick="mostrarDescripcion(${p.id})">
        <h5 class="card-title">${p.nombre}</h5>
        <p><strong>Inventario:</strong> ${p.inventario}</p>
        <p class="card-text">
          <strong>Precio EnergiZen:</strong> $${p.precio}<br>
        </p>
        <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar</button>
        <button class="btn btn-secondary ml-2" onclick="toggleComparacionPrecios(${p.id})">Comparar Precios</button>
        <div id="comparacion-${p.id}" class="comparacion-precios" style="display:none; margin-top: 10px;">
          <p><strong>Comparación de Precios:</strong></p>
          <p><strong>Precio EnergiZen:</strong> $${p.precio}</p>
          <p><strong>${p.referencia.tienda}:</strong> $${p.referencia.precio}</p>
          <p><strong>Diferencia:</strong> $${(p.referencia.precio - p.precio).toFixed(2)}</p>
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