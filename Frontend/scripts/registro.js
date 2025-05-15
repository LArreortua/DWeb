let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

function registrarUsuario() {
  const nombre = document.getElementById('nombre').value.trim();
  const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
  const user = document.getElementById('newUsername').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const pass = document.getElementById('newPassword').value.trim();
  const msg = document.getElementById('registerMsg');

  if (!nombre || !fechaNacimiento || !user || !correo || !pass) {
    msg.innerText = 'Por favor completa todos los campos.';
    return;
  }

  if (usuarios[user]) {
    msg.innerText = 'Ese nombre de usuario ya está registrado.';
    return;
  }

  usuarios[user] = {
    nombre,
    fechaNacimiento,
    correo,
    password: pass,
    tipo: user === 'admin' ? 'admin' : 'cliente'  // esto permite registrar un admin solo si se llama 'admin'
  };
  

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  msg.style.color = 'green';
  msg.innerText = 'Usuario registrado exitosamente. Redirigiendo...';

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
}