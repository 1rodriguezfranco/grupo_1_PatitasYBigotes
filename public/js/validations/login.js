window.addEventListener('load', () => {

let form = document.querySelector('form');

form.addEventListener('submit', (event) => {

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let errores = [];

    if(email.value.trim() == ''){
        errores.push('El email es obligatorio');
    } else if (!/\S+@\S+\.\S+/.test(email.value)){
        errores.push('Debe ser un formato de correo válido');
    } else {
        /* (Opcional) → Debe existir en la base. */
    }

    if(password.value.trim() == ''){
        errores.push('La constraseña es obligatoria');
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