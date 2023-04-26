window.addEventListener('load', function(){

    let burgerMenu = document.querySelector('.burger-menu');
    let burgerInside = document.querySelector('.burger-menu i');
    let burgerDisplayed = document.querySelector('.burger-menu-displayed');

    let burgerPerro = document.querySelector('.burger-menu-displayed .perros p');
    let burgerPerroList = document.querySelectorAll('.burger-menu-displayed .perros li');
    let burgerGato = document.querySelector('.burger-menu-displayed .gatos p');
    let burgerGatoList = document.querySelectorAll('.burger-menu-displayed .gatos li');
    let burgerRoedor = document.querySelector('.burger-menu-displayed .roedores p');
    let burgerRoedorList = document.querySelectorAll('.burger-menu-displayed .roedores li');
    let burgerAve = document.querySelector('.burger-menu-displayed .aves p');
    let burgerAveList = document.querySelectorAll('.burger-menu-displayed .aves li');

    let navBarPerro = document.querySelector('.site-navbar .perros');
    let navBarPerroDisplayed = document.querySelector('.site-navbar-displayed .perros');
    let navBarGato = document.querySelector('.site-navbar .gatos');
    let navBarGatoDisplayed = document.querySelector('.site-navbar-displayed .gatos');
    let navBarRoedor = document.querySelector('.site-navbar .roedores');
    let navBarRoedorDisplayed = document.querySelector('.site-navbar-displayed .roedores');
    let navBarAve = document.querySelector('.site-navbar .aves');
    let navBarAveDisplayed = document.querySelector('.site-navbar-displayed .aves');
    let navBarMarca = document.querySelector('.site-navbar .marcas');
    let navBarMarcaDisplayed = document.querySelector('.site-navbar-displayed .marcas');
    let navBarItems = [navBarPerroDisplayed, navBarGatoDisplayed, navBarRoedorDisplayed, navBarAveDisplayed, navBarMarcaDisplayed];

    burgerMenu.addEventListener('click', function(event){
        burgerInside.classList.toggle("clicked");
        burgerDisplayed.classList.toggle("burger-menu-displayed-block");
        event.preventDefault();
    });
    burgerPerro.addEventListener('click', function(event){
            for(let i = 0; i < burgerPerroList.length; i++){
                burgerPerroList[i].classList.toggle("li-blocked");
            }
            event.preventDefault();        
    });
    burgerGato.addEventListener('click', function(event){
        for(let i = 0; i < burgerGatoList.length; i++){
            burgerGatoList[i].classList.toggle("li-blocked");
        }
        event.preventDefault();        
    });
    burgerRoedor.addEventListener('click', function(event){
        for(let i = 0; i < burgerRoedorList.length; i++){
            burgerRoedorList[i].classList.toggle("li-blocked");
        }
        event.preventDefault();        
    });
    burgerAve.addEventListener('click', function(event){
        for(let i = 0; i < burgerAveList.length; i++){
            burgerAveList[i].classList.toggle("li-blocked");
        }
        event.preventDefault();        
    });

    navBarPerro.addEventListener('click', function(event){
        let newNavBarItems = navBarItems.filter(item => item != navBarPerroDisplayed);
        for(let i = 0; i < newNavBarItems.length; i++){
            newNavBarItems[i].classList.remove('ul-block');
        };
        navBarPerroDisplayed.classList.toggle('ul-block');        
        event.preventDefault();
    });
    navBarGato.addEventListener('click', function(event){
        let newNavBarItems = navBarItems.filter(item => item != navBarGatoDisplayed);
        for(let i = 0; i < newNavBarItems.length; i++){
            newNavBarItems[i].classList.remove('ul-block');
        };
        navBarGatoDisplayed.classList.toggle('ul-block');
        event.preventDefault();
    });
    navBarRoedor.addEventListener('click', function(event){
        let newNavBarItems = navBarItems.filter(item => item != navBarRoedorDisplayed);
        for(let i = 0; i < newNavBarItems.length; i++){
            newNavBarItems[i].classList.remove('ul-block');
        };
        navBarRoedorDisplayed.classList.toggle('ul-block');
        event.preventDefault();
    });
    navBarAve.addEventListener('click', function(event){
        let newNavBarItems = navBarItems.filter(item => item != navBarAveDisplayed);
        for(let i = 0; i < newNavBarItems.length; i++){
            newNavBarItems[i].classList.remove('ul-block');
        };
        navBarAveDisplayed.classList.toggle('ul-block');
        event.preventDefault();
    });
    navBarMarca.addEventListener('click', function(event){
        let newNavBarItems = navBarItems.filter(item => item != navBarMarcaDisplayed);
        for(let i = 0; i < newNavBarItems.length; i++){
            newNavBarItems[i].classList.remove('ul-block');
        };
        navBarMarcaDisplayed.classList.toggle('ul-block');
        event.preventDefault();
    });
})