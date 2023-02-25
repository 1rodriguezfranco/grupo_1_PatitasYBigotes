const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: (req, res) => res.render ("index"),
    carrito: (req, res) => res.render ("carrito"),

    productdetails: (req, res) => {
        const products = getProductList(productsFilePath);
        const id = req.params.id;
		const product = products.find(product => product.id == id);
        res.render ("productDetails", {product});
    },

    productList: (req, res) => {
        const products = getProductList(productsFilePath);
        res.render("productsList", {products: products})
    },

    destroy : (req, res) => {
		eliminarProducto(req.params.id);
		res.redirect('/productList');
	}
     
};

function getProductList(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function eliminarProducto(id){
	let productos = getProductList(productsFilePath);
	let productosFiltrados = productos.filter(product => product.id != id);

	fs.writeFileSync(productsFilePath, JSON.stringify(productosFiltrados, null, 2)); 
}

module.exports = mainController;