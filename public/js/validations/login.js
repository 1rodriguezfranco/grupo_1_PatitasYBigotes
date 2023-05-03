const form = document.getElementById('form-login');
const inputs = {
  email: document.getElementById('email'),
  password: document.getElementById('password'),
};
const submitBtn = document.getElementById('submitBtn');

// Función para mostrar u ocultar mensajes de error
function toggleError(input, message) {
  const errorElem = input.parentNode.querySelector('.error-msg-login');
  errorElem.innerHTML = message;
  errorElem.style.display = message ? 'block' : 'none';
}

// Validar formulario en el evento "submit"
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Reiniciar el objeto de errores
  const errors = {};

  const emailValue = inputs.email.value.trim();
  if (emailValue === '') {
    errors['email'] = 'El correo electrónico es obligatorio';
  };
  toggleError(inputs.email, errors['email']);

  const passwordValue = inputs.password.value.trim();
  if (passwordValue === '') {
    errors['password'] = 'La contraseña es obligatoria';
  }
  toggleError(inputs.password, errors['password']);

  // Enviar formulario si no hay errores
  if (Object.keys(errors).length === 0) {
    form.submit();
  }
});