function realizarLogin() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const msg = document.getElementById('loginMsg');

  axios.post('http://localhost:5050/user/validate', {
    username: user,
    password: pass
  })
  .then(response => {
    const data = response.data;

    if (response.status == 200) {
      localStorage.setItem('nombreUsuario', data.user_data[0].name);
      localStorage.setItem('usuarioActivo', data.user_data[0]);
      localStorage.setItem('usuarioemail', data.user_data[0].email);
      localStorage.setItem('usuariolastname', data.user_data[0].last_name);
      localStorage.setItem('usuariodob', data.user_data[0].dob);
      localStorage.setItem('isAdmin', data.user_data[0].isAdmin || 'cliente');
      localStorage.setItem('tipoUsuario', data.user_data[0].isAdmin ? 'admin' : 'cliente');

      if (data.user_data[0].isAdmin === true) {
        window.location.href = '../source/admin.html';
      } else {
        if (localStorage.getItem('volverACarrito') === 'true') {
          console.log("Redirigiendo al carrito...");
          localStorage.removeItem('volverACarrito');
          window.location.href = '../source/carrito.html';
        } else {
          window.location.href = '../source/energizen.html'; 
        }
      }
    } else {
      msg.innerText = 'Usuario o contraseña incorrectos.';
    }
  })
  .catch(error => {
    console.error('Error al iniciar sesión:', error);
    msg.innerText = 'Error del servidor. Intenta más tarde.';
  });
}


const mostrarLogin = () => {
  document.getElementById('loginForm').style.display = 'block';
};

const mostrarRegistro = () => {
  document.getElementById('registerForm').style.display = 'block';
};
