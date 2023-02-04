const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//const adminRoutes = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //Cambiar el const si es necesario de la linea de arriba.

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    // CREAR PRODUCTO 
    create: (req, res) => {
         return res.render("createProduct");
    },

	// CREAR PRODUCTO / STORE
	store: (req, res) => {
		const products = getProductList(productsFilePath);
		const product = {
			id: products.length > 0 ? products[products.length -1].id + 1 : 1,
			name: req.body.name,
			description: req.body.description,
			image: req.file?.filename ? req.file.filename : "default-image.png",
            category: req.body.category,
            price: Number(req.body.price),
            discount: Number(req.body.discount),	
		}
		products.push(product);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		return res.redirect("/");
	},
	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id == id);
		return res.render("editProduct", { product });
	},
	// Update - Method to update
	update: (req, res) => {
		const id = req.params.id;
		
		const product = {
			id,
			...req.body,
			image: req.file?.filename ? req.file.filename : "default-image.png"
		}
		guardarProducto(product)

		return res.redirect("/");
	}

};


//FUNCIONES

function getProductList(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function guardarProducto(productToStore) {

	const products = getProductList(productsFilePath);

	const productList = products.map(prod => {
		if(prod.id == productToStore.id) {
			return productToStore
		}
		return prod;
	});

	fs.writeFileSync(productsFilePath, JSON.stringify(productList, null, 2)); 
}
//-------------------------------
module.exports = controller;