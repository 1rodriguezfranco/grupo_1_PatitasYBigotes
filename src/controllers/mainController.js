const path = require('path');
const db = require(path.join(__dirname, "../../database/models"));

const mainController = {
    index: (req, res) => res.render ("index"),
    carrito: (req, res) => res.render ("carrito"),
    nosotros: (req, res) => res.render ("nosotros"),
    search: async (req, res) => {
        let search = req.query.keywords;
        let allProducts = await db.Product.findAll();
        let productsSearched = allProducts.filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        return res.render("results", {products: productsSearched});
        
    }
};

module.exports = mainController;