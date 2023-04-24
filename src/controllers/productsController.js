const path = require('path');
const { validationResult } = require('express-validator');
const db = require(path.join(__dirname, "../../database/models"));

const controller = {
    create: async (req, res) => {
		let pets = await db.Pet.findAll();
		let brands = await db.Brand.findAll();
		let categories = await db.ProductCategory.findAll();
		return res.render("./products/createProduct", {pets, brands, categories});
    },

	store: async (req, res) => {
		let pets = await db.Pet.findAll();
		let brands = await db.Brand.findAll();
		let categories = await db.ProductCategory.findAll();
		let resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
            return res.render('./products/createProduct', {
                errors: resultValidation.mapped(),
                oldData: req.body,
				pets,
				brands,
				categories
        	})
		} else{
			let productImage = "defaultProduct.jpg";
       	 	if(req.file){
            	productImage = req.file.filename;
        	};
			db.Product.create({
				...req.body,
				image: productImage,
				final_price: Number(req.body.price - ((req.body.price * req.body.discount) / 100))
			});
			return res.redirect("/products/create");
		};

	},

	edit: async (req, res) => {
		let product = await db.Product.findByPk(req.params.id);
		let pets = await db.Pet.findAll();
		let brands = await db.Brand.findAll();
		let categories = await db.ProductCategory.findAll();
		return res.render("./products/editProduct", {product, pets, brands, categories});
	},

	update: async (req, res) => {
		let productImage = "defaultProduct.jpg";
       	if(req.file){
            productImage = req.file.filename;
        };
		let product = await db.Product.findByPk(req.params.id);
		let pets = await db.Pet.findAll();
		let brands = await db.Brand.findAll();
		let categories = await db.ProductCategory.findAll();
		let resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0){
			return res.render("./products/editProduct", {
				product,
				pets,
				brands,
				categories,
				productEdited: req.body,
				errors: resultValidation.mapped()
			});
		} else{
			db.Product.update(
				{
					...req.body,
					image: productImage,
					final_price: Number(req.body.price - ((req.body.price * req.body.discount) / 100))
				},
				{
					where: {id: req.params.id}
				}
			)
			.then(()=>{
				return res.redirect("/products/list");
			})
		};
	},

	details: (req, res) => {
		db.Product.findByPk(req.params.id)
			.then((product) => {
				res.render("./products/productdetails", { product});
			})
	},

	destroy: (req, res) =>{
		db.Product.destroy({
			where: {id: req.params.id}
		})
			.then(() =>{
				res.redirect('/products/list');
			})
	},

	list: async (req, res) => {
		let allProducts = await db.Product.findAll();
		res.render("./products/productsList", {products: allProducts});
	},

	listByPet: async (req, res) => {
		let petParam = req.params.pet;
		let allProducts = await db.Product.findAll();
		let allPets = await db.Pet.findAll();
		let validPet = false;
		let productsByPet = [];

		for(let j = 0; j < allPets.length; j++){
			if(allPets[j].name.toLowerCase() == petParam){
				validPet = true;
				let idPet = allPets[j].id;
				for(let i = 0; i < allProducts.length; i++){
					if(idPet == allProducts[i].id_pet){
						productsByPet.push(allProducts[i]);
					};
				};
			};
		};

		if(validPet && productsByPet){
			res.render("./products/productsByPet", {products: productsByPet});
		}
	},

	listByCategoryPerro: async (req, res) => {
		let categoryParam = req.params.category;
		let allProducts = await db.Product.findAll();
		let allCategories = await db.ProductCategory.findAll();
		let validCategory = false;
		let productsByPet = [];
		let productsByCategory = [];

		for(let i = 0; i < allProducts.length; i++){
			if(allProducts[i].id_pet === 1){
				productsByPet.push(allProducts[i]);
				for(let j = 0; j < allCategories.length; j++){
					if(allCategories[j].name.toLowerCase() == categoryParam){
						validCategory = true;
						let idCategory = allCategories[j].id;
						productsByCategory = productsByPet.filter((product) => {
							return product.id_category == idCategory
						});
					};
				};
			};
		};

		if(validCategory && productsByCategory){
			res.render("./products/productsByCategory", {products: productsByCategory});
		};
	},

	listByCategoryGato: async (req, res) => {
		let categoryParam = req.params.category;
		let allProducts = await db.Product.findAll();
		let allCategories = await db.ProductCategory.findAll();
		let validCategory = false;
		let productsByPet = [];
		let productsByCategory = [];

		for(let i = 0; i < allProducts.length; i++){
			if(allProducts[i].id_pet === 2){
				productsByPet.push(allProducts[i]);
				for(let j = 0; j < allCategories.length; j++){
					if(allCategories[j].name.toLowerCase() == categoryParam){
						validCategory = true;
						let idCategory = allCategories[j].id;
						productsByCategory = productsByPet.filter((product) => {
							return product.id_category == idCategory
						});
					};
				};
			};
		};

		if(validCategory && productsByCategory){
			res.render("./products/productsByCategory", {products: productsByCategory});
		};
	},

	listByCategoryRoedor: async (req, res) => {
		let categoryParam = req.params.category;
		let allProducts = await db.Product.findAll();
		let allCategories = await db.ProductCategory.findAll();
		let validCategory = false;
		let productsByPet = [];
		let productsByCategory = [];

		for(let i = 0; i < allProducts.length; i++){
			if(allProducts[i].id_pet === 3){
				productsByPet.push(allProducts[i]);
				for(let j = 0; j < allCategories.length; j++){
					if(allCategories[j].name.toLowerCase() == categoryParam){
						validCategory = true;
						let idCategory = allCategories[j].id;
						productsByCategory = productsByPet.filter((product) => {
							return product.id_category == idCategory
						});
					};
				};
			};
		};

		if(validCategory && productsByCategory){
			res.render("./products/productsByCategory", {products: productsByCategory});
		};
	},

	listByCategoryAve: async (req, res) => {
		let categoryParam = req.params.category;
		let allProducts = await db.Product.findAll();
		let allCategories = await db.ProductCategory.findAll();
		let validCategory = false;
		let productsByPet = [];
		let productsByCategory = [];

		for(let i = 0; i < allProducts.length; i++){
			if(allProducts[i].id_pet === 4){
				productsByPet.push(allProducts[i]);
				for(let j = 0; j < allCategories.length; j++){
					if(allCategories[j].name.toLowerCase() == categoryParam){
						validCategory = true;
						let idCategory = allCategories[j].id;
						productsByCategory = productsByPet.filter((product) => {
							return product.id_category == idCategory
						});
					};
				};
			};
		};

		if(validCategory && productsByCategory){
			res.render("./products/productsByCategory", {products: productsByCategory});
		};
	}

};

module.exports = controller;