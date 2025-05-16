  const usuarioActivo = localStorage.getItem('usuarioActivo');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  const compras = JSON.parse(localStorage.getItem('compras')) || {};
  const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

  if (!usuarioActivo || !usuarios[usuarioActivo]) {
    document.getElementById('sinSesion').style.display = 'block';
  } else {
    const datos = usuarios[usuarioActivo];
    document.getElementById('contenidoCuenta').style.display = 'block';
    document.getElementById('infoUsuario').textContent = usuarioActivo;
    document.getElementById('infoNombre').textContent = datos.nombre;
    document.getElementById('infoCorreo').textContent = datos.correo;
    document.getElementById('infoNacimiento').textContent = datos.fechaNacimiento;

    const lista = document.getElementById('listaCompras');
    const historial = tickets.filter(ticket => ticket.user_id === usuarioActivo);

    if (historial.length === 0) {
      lista.innerHTML = '<li class="list-group-item">Aún no has realizado compras.</li>';
    } else {
      historial.forEach(ticket => {
        const productos = ticket.product_list.map(p => `${p.cantidad} x ${p.nombre} - $${p.precio}`).join('<br>');
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
          <strong>Fecha:</strong> ${ticket.created_data}<br>
          <strong>Pago:</strong> ${ticket.payment_method_id}<br>
          <strong>Estado:</strong> ${ticket.status_id}<br>
          <strong>Productos:</strong><br>${productos}<br>
          <strong>Total:</strong> $${ticket.total_price}
        `;
        lista.appendChild(li);
      });
    }
  }

  function cerrarSesion() {
    window.location.href = 'energizen.html';
  }