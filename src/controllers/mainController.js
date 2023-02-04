const mainController = {
    index: (req, res) => res.render ("index"),
    carrito: (req, res) => res.render ("carrito"),
    productdetails: (req, res) => res.render ("productdetails"),  
     
};

module.exports = mainController;