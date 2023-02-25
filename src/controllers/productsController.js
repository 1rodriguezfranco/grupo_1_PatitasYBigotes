const path = require('path');
const { validationResult } = require('express-validator');
const Product = require(path.join(__dirname, '../models/Products.js'));

const controller = {

    create: (req, res) => {
         return res.render("createProduct");
    },

	store: (req, res) => {
		let resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
            return res.render('createProduct', {
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
		return res.redirect("/admin/createproduct");
	},

	edit: (req, res) => {
		const id = req.params.id;
		const product = Product.findByPk(id);
		return res.render("editProduct", { product });
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
            return res.render("editProduct", {
				product:product,
                errors: resultValidation.mapped(),
            })
        }else{
			Product.edit(product)
		}
		return res.redirect("/productList");
	}
};

module.exports = controller;