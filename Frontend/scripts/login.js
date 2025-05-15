function realizarLogin() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const msg = document.getElementById('loginMsg');

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  const usuario = usuarios[user];

  if (usuario && usuario.password === pass) {
    localStorage.setItem('usuarioActivo', user);
    localStorage.setItem('tipoUsuario', usuario.tipo || 'cliente');

    if (usuario.tipo === 'admin') {
      window.location.href = '../source/admin.html';
    } else {
      if (localStorage.getItem('volverACarrito') === 'true') {
        console.log("Redirigiendo al carrito...");
        localStorage.removeItem('volverACarrito');
        window.location.href = '../source/carrito.html';
      } else {
        window.location.href = '../source/registro.html';
      }
    }

  } else {
    msg.innerText = 'Usuario o contraseña incorrectos.';
  }
}

const mostrarLogin = () => {
  document.getElementById('loginForm').style.display = 'block';
};

const mostrarRegistro = () => {
  document.getElementById('registerForm').style.display = 'block';
};
