window.addEventListener('load', () => {

let form = document.querySelector('form');

form.addEventListener('submit', (event) => {

    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let avatar = document.getElementById('avatar');

    let error_last_name = document.getElementById('error_last_name');

    let errores = [];

    if(first_name.value.trim() == ''){
        errores.push('El nombre es obligatorio');
    } else if (first_name.value.length < 2 ){
        errores.push('Debe tener al menos 2 caracteres');
    };

    if(last_name.value.trim() == ''){
    } else if (last_name.value.length < 2 ){
        errores.push('Debe tener al menos 2 caracteres');
    };

    if(email.value.trim() == ''){
        errores.push('El email es obligatorio');
    } else if (!/\S+@\S+\.\S+/.test(email.value.trim())){
        errores.push('Debe ser un formato de correo válido');
    } else {
        /* (Opcional) → No puede repetirse con los e-mails ya registrados. */
    }

    if(password.value.trim() == ''){
        errores.push('La constraseña es obligatoria');
    } else if (password.value.length < 8 ){
        errores.push('Debe tener al menos 8 caracteres');
    };

    if(confirmPassword.value.trim() != password.value.trim()){
        errores.push('Debes confirmar la constraseña');
    };

    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];  
    let file = avatar.files[0];

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
    });
});