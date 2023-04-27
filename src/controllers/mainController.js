const mainController = {
    index: (req, res) => res.render ("index"),
    carrito: (req, res) => res.render ("carrito"),
    nosotros: (req, res) => res.render ("nosotros"),

};

module.exports = mainController;