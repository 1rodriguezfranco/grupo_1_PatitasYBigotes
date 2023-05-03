const form = document.getElementById('product-edit-form');
const inputs = {
  name: document.getElementById('name'),
  short_description: document.getElementById('short_description'),
  price: document.getElementById('price'),
  discount: document.getElementById('discount'),
  image: document.getElementById('image')
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

  // Validar campo "name"
  const nameValue = inputs.name.value.trim();
  if (nameValue === '') {
    errors['name'] = 'El nombre es obligatorio';
  } else if (nameValue.length < 5) {
    errors['name'] = 'Debe tener al menos 5 caracteres';
  }
  toggleError(inputs.name, errors['name']);

  // Validar campo "short_description"
  const shortDescriptionValue = inputs.short_description.value.trim();
  if (shortDescriptionValue === '') {
    errors['short_description'] = 'La descripción breve es obligatoria';
  } else if (shortDescriptionValue.length < 20) {
    errors['short_description'] = 'Debe tener al menos 20 caracteres';
  }
  toggleError(inputs.short_description, errors['short_description']);

  // Validar campo "price"
  const priceValue = inputs.price.value.trim();
  if (priceValue === '') {
    errors['price'] = 'El precio es obligatorio';
  } else if (isNaN(priceValue)) {
    errors['price'] = 'Debe ser un número';
  }
  toggleError(inputs.price, errors['price']);

  // Validar campo "discount"
  const discountValue = inputs.discount.value.trim();
  if (discountValue === '') {
    errors['discount'] = 'El descuento es obligatorio';
  } else if (isNaN(discountValue)) {
    errors['discount'] = 'Debe ser un número';
  }
  toggleError(inputs.discount, errors['discount']);


  // Validar campo "image"
  const file = inputs.image.files[0];
  if (file) {
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!acceptedExtensions.includes(fileExtension)) {
      errors['image'] = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`;
    }
  }
  toggleError(inputs.image, errors['image']);

  // Enviar formulario si no hay errores
  if (Object.keys(errors).length === 0) {
    form.submit();
  }
});