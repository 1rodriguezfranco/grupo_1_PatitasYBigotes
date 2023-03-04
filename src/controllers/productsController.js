const path = require('path');
const { validationResult } = require('express-validator');
const Product = require(path.join(__dirname, '../models/Products.js'));

const controller = {

    create: (req, res) => {
         return res.render("./products/createProduct");
    },

	store: (req, res) => {
		let resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
            return res.render('./products/createProduct', {
                errors: resultValidation.mapped(),
                oldData: req.body
        	})
		} else{
			let productImage = "defaultProduct.jpg";
            if(req.file){
                productImage = req.file.filename;
            }
            let productToCreate = {
                ...req.body,
                product_image: productImage,
				finalPrice: Number(req.body.price - ((req.body.price * req.body.discount) / 100))
            }
			Product.create(productToCreate)
		};
		return res.redirect("/products/create");
	},

	edit: (req, res) => {
		const id = req.params.id;
		const product = Product.findByPk(id);
		return res.render("./products/editProduct", { product });
	},

	update: (req, res) => {
		const id = req.params.id;
		const product = {
			id,
			...req.body,
			product_image: req.file?.filename ? req.file.filename : "defaultProduct.jpg",
			finalPrice: Number(req.body.price - ((req.body.price * req.body.discount) / 100))
		}
		let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            return res.render("./products/editProduct", {
				product:product,
                errors: resultValidation.mapped(),
            })
        }else{
			Product.edit(product)
		}
		return res.redirect("/productList");
	},

	details: (req, res) => {
		const id = req.params.id;
		const product = Product.findByPk(id);
		return res.render("./products/productdetails", { product });
	},

	destroy: (req, res) =>{
		let id = req.params.id;
		Product.delete(id);
		res.redirect('/products/list');
	},

	list: (req, res) => {
		let allProducts = Product.findAll();
		res.render("./products/productsList", {products: allProducts})
	}

};

module.exports = controller;