window.addEventListener('load', () => {

let form = document.querySelector('form');

form.addEventListener('submit', (event) => {

    let name = document.getElementById('name');
    let short_description = document.getElementById('short_description');
    let image = document.getElementById('product_image');
    let price = document.getElementById('price');

    let errores = [];

    if(name.value.trim() == ''){
        errores.push('El nombre es obligatorio');
    } else if (name.value.length < 5 ){
        errores.push('Debe tener al menos 5 caracteres');
    };

    if(short_description.value.trim() == ''){
        errores.push('La descripción breve es obligatoria');
    } else if (short_description.value.length < 20 ){
        errores.push('Debe tener al menos 20 caracteres');
    };

    if(price.value.trim() == ''){
        errores.push('El precio es obligatorio');
    } else if (isNaN(price.value)){
        errores.push('Debe ser un número');
    };

    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];  
    let file = image.files[0];

    if (!file) {
        file = "default.jpg";
    } else {
        let fileExtension = file.name.split('.').pop();
    if (!acceptedExtensions.includes(fileExtension.toLowerCase())) {
        errores.push(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
    }
    };

    if (errores.length > 0) {
        event.preventDefault();

        let ulErrors = document.querySelector('.errores');
        ulErrors.innerHTML = '';
        errores.forEach(error => {
            ulErrors.innerHTML += `<p>${error}</p>`;
        });
    }else{
        form.submit();
    };
})
})