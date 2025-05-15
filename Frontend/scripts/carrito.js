const productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let descuentoAplicado = 0;

function actualizarCarrito() {
  const lista = document.getElementById('listaCarrito');
  lista.innerHTML = '';
  const conteo = {};
  carrito.forEach(id => conteo[id] = (conteo[id] || 0) + 1);

  let subtotal = 0;

  [...new Set(carrito)].forEach(id => {
    const prod = productos.find(p => p.id === id);
    const cantidad = conteo[id];
    const totalProd = prod.precio * cantidad;
    subtotal += totalProd;

    const item = document.createElement('div');
    item.className = 'card mb-3';
    item.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-md-3">
          <img src="${prod.imagen}" class="img-fluid rounded-start" alt="${prod.nombre}">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text"><small class="text-muted">${prod.categoria}</small></p>
            <p class="card-text mb-0"><strong>$${prod.precio.toFixed(2)}</strong> c/u</p>
          </div>
        </div>
        <div class="col-md-3 text-center">
          <div class="d-flex justify-content-center align-items-center gap-2">
            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${id}, -1)">-</button>
            <span class="fw-bold">${cantidad}</span>
            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${id}, 1)">+</button>
          </div>
          <button class="btn btn-sm btn-danger mt-2" onclick="eliminarDelCarrito(${id})">Eliminar</button>
        </div>
      </div>
    `;
    lista.appendChild(item);
  });

  const impuestos = subtotal * 0.16;
  let total = subtotal + impuestos;

  if (descuentoAplicado > 0) {
    total -= total * descuentoAplicado;
  }

  document.getElementById('subtotal').innerText = subtotal.toFixed(2);
  document.getElementById('impuestos').innerText = impuestos.toFixed(2);
  document.getElementById('total').innerText = total.toFixed(2);

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function aplicarCupon() {
  const input = document.getElementById('inputCupon');
  const msg = document.getElementById('msgCupon');
  const cupon = input.value.trim().toLowerCase();

  if (cupon === 'zen10') {
    descuentoAplicado = 0.10;
    msg.innerText = '✅ Cupón aplicado: 10% de descuento';
    msg.style.color = 'green';
  } else {
    descuentoAplicado = 0;
    msg.innerText = '❌ Cupón inválido';
    msg.style.color = 'red';
  }

  actualizarCarrito();
}

function cambiarCantidad(id, cambio) {
  if (cambio > 0) {
    carrito.push(id);
  } else {
    const index = carrito.indexOf(id);
    if (index !== -1) carrito.splice(index, 1);
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p !== id);
  actualizarCarrito();
}

function actualizarCarritoIcono() {
  const icono = document.getElementById('carritoCantidad');
  if (icono) icono.innerText = carrito.length;
}

function mostrarLogin() {
  const usuarioActivo = localStorage.getItem('usuarioActivo');
  if (usuarioActivo) {
    mostrarResumenDeCompra(usuarioActivo);
  } else {
    localStorage.setItem('volverACarrito', 'true');
    window.location.href = '../source/login.html';
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  alert('Sesión cerrada correctamente');
  window.location.href = '../source/energizen.html';
}

window.onload = () => {
  actualizarCarrito();
  actualizarCarritoIcono();

  const usuario = localStorage.getItem('usuarioActivo');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const nombreUsuario = document.getElementById('nombreUsuario');

  if (usuario && usuarios[usuario]) {
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'inline-block';
    if (nombreUsuario) nombreUsuario.innerText = `Hola, ${usuarios[usuario].nombre} 👋`;
  } else {
    if (btnLogin) btnLogin.style.display = 'inline-block';
    if (btnLogout) btnLogout.style.display = 'none';
    if (nombreUsuario) nombreUsuario.innerText = '';
  }

  const btnComprar = document.getElementById('comprarBtn');
  const msgLogin = document.getElementById('msgLoginRequerido');
  if (!usuario && btnComprar) {
    btnComprar.style.display = 'none';
    if (msgLogin) msgLogin.style.display = 'block';
  } else if (btnComprar) {
    btnComprar.style.display = 'inline-block';
    if (msgLogin) msgLogin.style.display = 'none';
  }
};
