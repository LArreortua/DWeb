const usuarioActivo = localStorage.getItem('usuarioActivo');
const usuarioemail = localStorage.getItem('usuarioemail');
const nombreUsuario = localStorage.getItem('nombreUsuario')
const usuariolastname = localStorage.getItem('usuariolastname');
const usuariodob = localStorage.getItem('usuariodob');
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

if (!usuarioActivo) {
  document.getElementById('sinSesion').style.display = 'block';
} else {
  const datos = usuarioActivo;
  document.getElementById('contenidoCuenta').style.display = 'block';
  document.getElementById('infoNombre').textContent = nombreUsuario + ' ' + usuariolastname;
  document.getElementById('infoCorreo').textContent = usuarioemail;
  document.getElementById('infoNacimiento').textContent = usuariodob;

  const lista = document.getElementById('listaCompras');
  const historial = tickets.filter(t => t.user_id === usuarioActivo);

  if (historial.length === 0) {
    lista.innerHTML = '<li class="list-group-item">Aún no has realizado compras.</li>';
  } else {
    historial.forEach((ticket, index) => {
      const collapseId = `collapse-${ticket.ticket_id}`;
      const headingId = `heading-${ticket.ticket_id}`;

      const item = document.createElement('div');
      item.className = 'accordion-item';

      item.innerHTML = `
        <h2 class="accordion-header" id="${headingId}">
          <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse"
            data-bs-target="#${collapseId}" aria-expanded="${index === 0}" aria-controls="${collapseId}">
            🧾 Ticket #${ticket.ticket_id}
          </button>
        </h2>
<div id="${collapseId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="${headingId}">
          <div class="accordion-body">
          <p><strong>Productos: </strong></p>
            <ul>
              ${ticket.product_list.map(p => `<li>${p.cantidad}x ${p.nombre} - $${(p.precio * p.cantidad).toFixed(2)}</li>`).join('')}
            </ul>

            <p><strong>Total:</strong> $${ticket.total_price.toFixed(2)}</p>
            <p><strong>Estado:</strong> ${ticket.status_id}</p>
            <p><strong>Pago:</strong> ${ticket.payment_method_id}</p>
            <p><strong>Fecha:</strong> ${ticket.created_data}</p>
          </div>
        </div>
      `;

      lista.appendChild(item);
    });

    // Asegura que tenga la clase necesaria
    lista.classList.add('accordion');
  }
}

function regresarPrincipal() {
  window.location.href = 'energizen.html';
}
