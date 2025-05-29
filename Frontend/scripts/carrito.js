const productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let descuentoAplicado = 0;

function actualizarCarrito() {
  const lista = document.getElementById('listaCarrito');
  lista.innerHTML = '';
  const conteo = {};
  carrito.forEach(id => conteo[id] = (conteo[id] || 0) + 1);

  let subtotal = 0;

  if (carrito.length === 0) {
    lista.innerHTML = `
      <div class="text-center w-100">
        <p class="text-muted fs-5 mt-4">🛒 No has agregado nada al carrito.</p>
      </div>
    `;
  } else {
    [...new Set(carrito)].forEach(id => {
      const prod = productos.find(p => p.product_id === id);
      const cantidad = conteo[id];
      const totalProd = prod.price * cantidad;
      subtotal += totalProd;

      const item = document.createElement('div');
      item.className = 'card2 mb-3';
      item.innerHTML = `
        <div class="row g-0 align-items-center">
          <div class="col-md-3">
            <img src="${prod.imagen}" class="img-fluid rounded-start" alt="${prod.name}">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${prod.name}</h5>
              <p class="card-text"><small class="text-muted">${prod.category}</small></p>
              <p class="card-text mb-0"><strong>$${prod.price.toFixed(2)}</strong> c/u</p>
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
  }

  const impuestos = subtotal * 0.16;
  let total = subtotal + impuestos;

  if (descuentoAplicado > 0) {
    subtotal -= subtotal * descuentoAplicado;
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
    localStorage.setItem('descuento', String(descuentoAplicado))
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
  const user_name = localStorage.getItem('nombreUsuario')

  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const nombreUsuario = document.getElementById('nombreUsuario');

  if (usuario) {
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'inline-block';
    if (nombreUsuario) nombreUsuario = `Hola, ${user_name} 👋`;
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

// Se agrega esta función para el ticket
function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const confirmar = confirm("¿Deseas confirmar tu compra?");
  if (!confirmar) return;

  const subtotal = parseFloat(document.getElementById("subtotal").textContent);
  const impuestos = parseFloat(document.getElementById("impuestos").textContent);
  const total = parseFloat(document.getElementById("total").textContent);
  const usuario = localStorage.getItem("usuarioActivo");

  const conteo = {};
  carrito.forEach(id => conteo[id] = (conteo[id] || 0) + 1);
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  const listaProductos = Object.keys(conteo).map(id => {
    const prod = productos.find(p => p.product_id === parseInt(id));
    return {
      nombre: prod.name,
      cantidad: conteo[id],
      precio: prod.price
    };
  });

  const ticket = {
    user_id: usuario,
    payment_method_id: 'Efectivo',
    status_id: 'Completado',
    product_list: listaProductos,
    total_price: total,
    created_data: new Date().toLocaleDateString(),
    ticket_id: Date.now()
  };

  // Guardar en historial general
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  // Guardar también en historial de compras por usuario
  const compras = JSON.parse(localStorage.getItem("compras")) || {};
  if (!compras[usuario]) compras[usuario] = [];
  compras[usuario].push(`${ticket.created_data}: $${total.toFixed(2)} - ${listaProductos.length} productos`);
  localStorage.setItem("compras", JSON.stringify(compras));

  // Guardar ticket detallado para vista de ticket
localStorage.setItem("ultimoTicket", JSON.stringify({
  ticket_id: ticket.ticket_id,
  productos: listaProductos,
  subtotal,
  impuestos,
  total,
  fecha: ticket.created_data,
  metodoPago: ticket.payment_method_id
}));


  localStorage.removeItem("carrito");
  alert("¡Compra finalizada exitosamente!");
  window.location.href = "ticket.html";
}
