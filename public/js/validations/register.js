const form = document.getElementById('register-form');
const inputs = {
  first_name: document.getElementById('first_name'),
  last_name: document.getElementById('last_name'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirmPassword'),
  avatar: document.getElementById('avatar')
};
const submitBtn = document.getElementById('submitBtn');

// Función para mostrar u ocultar mensajes de error
function toggleError(input, message) {
  const errorElem = input.parentNode.querySelector('.error-msg');
  errorElem.innerHTML = message;
  errorElem.style.display = message ? 'block' : 'none';

  if (message) {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
  }
}

// Validar formulario en el evento "submit"
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Reiniciar el objeto de errores
  const errors = {};

  // Validar campo "first_name"
  const firstNameValue = inputs.first_name.value.trim();
  if (firstNameValue === '') {
    errors['first_name'] = 'El nombre es obligatorio';
  } else if (firstNameValue.length < 2) {
    errors['first_name'] = 'Debe tener al menos 2 caracteres';
  }
  toggleError(inputs.first_name, errors['first_name']);

  // Validar campo "last_name"
  const lastNameValue = inputs.last_name.value.trim();
  if (lastNameValue === '') {
    errors['last_name'] = 'El apellido es obligatorio';
  } else if (lastNameValue.length < 2) {
    errors['last_name'] = 'Debe tener al menos 2 caracteres';
  }
  toggleError(inputs.last_name, errors['last_name']);

  // Validar campo "email"
  const emailValue = inputs.email.value.trim();
  if (emailValue === '') {
    errors['email'] = 'El correo electrónico es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
    errors['email'] = 'Debe ser un formato de correo válido';
  }
  toggleError(inputs.email, errors['email']);

  // Validar campo "password"
  const passwordValue = inputs.password.value.trim();
  if (passwordValue === '') {
    errors['password'] = 'La contraseña es obligatoria';
  } else if (passwordValue.length < 8) {
    errors['password'] = 'Debe tener al menos 8 caracteres';
  }
  toggleError(inputs.password, errors['password']);

  // Validar campo "confirmPassword"
  const confirmPasswordValue = inputs.confirmPassword.value.trim();
  if (confirmPasswordValue === '') {
    errors['confirmPassword'] = 'Debes confirmar la contraseña';
  } else if (confirmPasswordValue !== passwordValue) {
    errors['confirmPassword'] = 'Las contraseñas no coinciden';
  }
  toggleError(inputs.confirmPassword, errors['confirmPassword']);

  // Validar campo "avatar"
  const file = inputs.avatar.files[0];
  if (file) {
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!acceptedExtensions.includes(fileExtension)) {
      errors['avatar'] = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
    }
  }
  toggleError(inputs.avatar, errors['avatar']);

  // Enviar formulario si no hay errores
  if (Object.keys(errors).length === 0) {
    form.submit();
  }
});